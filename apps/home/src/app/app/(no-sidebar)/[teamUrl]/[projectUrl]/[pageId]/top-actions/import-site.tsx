'use client'
import { createId } from '@paralleldrive/cuid2'
import type { CSSProperties } from 'react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'ui'
import type { Asset, CustomFont, Element } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import ImportIcon from '@/icons/cloud-upload-outline.svg'
import uploadImage from '@/lib/upload-image'

const isValidUrl = (url: string) => {
  try {
    const _urlObj = new URL(url)
    return true
  } catch (e) {
    return false
  }
}

const ImportSite = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [open, setOpen] = useState(false)
  const setElements = useCanvasStore((s) => s.setElements)
  const setBodyStyles = useCanvasStore((s) => s.setBodyStyles)
  const setCustomFonts = useCanvasStore((s) => s.setCustomFonts)
  const setAssets = useCanvasStore((s) => s.setAssets)

  const importData = async (url: string) => {
    const siteBaseUrl = `https://${url.replace('https://', '').split('/')[0]}`

    const res = await fetch(url)
    const html = await res.text()

    const elements: Element[] = []
    const assets: Asset[] = []
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const head = doc.head
    const stylesheetsHref = Array.from(
      head.querySelectorAll('link[rel=stylesheet]')
    ).map((el: HTMLLinkElement) =>
      // replace is to the root url of the site
      el.href.replace(process.env.NEXT_PUBLIC_SITE_URL || '', siteBaseUrl)
    )

    const stylesheets = await Promise.all(
      stylesheetsHref.map(async (href) => {
        const resCss = await fetch(href)
        const text = await resCss.text()
        return text
      })
    ).then((v) => v.join('\n'))

    const parsedStylesheets = new DOMParser().parseFromString(
      `<style>${stylesheets}</style>`,
      'text/html'
    )

    const styleElement = parsedStylesheets.querySelector('style')

    const styleSheet = styleElement?.sheet

    // class -> css properties
    const cssProperties: Record<string, CSSProperties> = {}
    const fontFamilies = new Set<CustomFont>()
    const rules = Array.from(styleSheet?.cssRules || [])

    for (const rule of rules) {
      if (rule.type === CSSRule.FONT_FACE_RULE) {
        const fontFaceRule = rule as CSSFontFaceRule
        const fontFamily = fontFaceRule.style.getPropertyValue('font-family')
        const fontWeights = fontFaceRule.style
          .getPropertyValue('font-weight')
          .split(/,| /g)
          .map((w) => Number(w.trim()))

        const fontStyles = fontFaceRule.style
          .getPropertyValue('font-style')
          .split(',')
          .map((s) => s.trim())

        const fontDisplay = fontFaceRule.style.getPropertyValue('font-display')

        const src = fontFaceRule.style
          .getPropertyValue('src')
          .split(',')
          .map((s) => {
            const fontUrl = /url\((?<temp1>.*?)\)/.exec(s)?.[1]
            const format = /format\((?<temp1>.*?)\)/
              .exec(s)?.[1]
              .replace(/"|'/g, '')

            if (!fontUrl) return null

            const formattedUrl = `${siteBaseUrl}${fontUrl
              ?.replace(process.env.NEXT_PUBLIC_SITE_URL || '', '')
              .replace(/"|'/g, '')}`

            return `"${formattedUrl}" "${format}"`
          })
          .filter((s) => s !== null)
          .join(',')

        const unicodeRange =
          fontFaceRule.style.getPropertyValue('unicode-range')

        if (!src) continue

        const customFont: CustomFont = {
          fontFamily,
          fontWeights,
          fontStyles,
          fontDisplay,
          src,
          unicodeRange,
        }

        fontFamilies.add(customFont)
        continue
      }

      if (rule.type !== CSSRule.STYLE_RULE) continue

      const styleRule = rule as CSSStyleRule
      const selectors = styleRule.selectorText
        .replace('.', '')
        .split(',')
        .map((s) => s.trim())
      const properties = styleRule.style

      selectors.forEach((selector) => {
        cssProperties[selector] = {}
      })

      // eslint-disable-next-line @typescript-eslint/prefer-for-of -- for loop is faster
      for (let i = 0; i < properties.length; i++) {
        const property = properties[i]
        const value = properties.getPropertyValue(property)

        const formattedProperty = property.startsWith('--')
          ? property
          : property.replace(/-(?<temp1>[a-z])/g, (g) => g[1].toUpperCase())

        selectors.forEach((selector) => {
          cssProperties[selector][formattedProperty] = value as CSSProperties
        })
      }
    }

    const body = doc.body
    const children = Array.from(body.children)

    const traverse = async (el: HTMLElement) => {
      const type = el.tagName.toLowerCase()
      if (['script', 'style'].includes(type)) return

      const style = Array.from(el.classList)
        .map((className) => cssProperties[className])
        .reduce((acc, curr) => ({ ...acc, ...curr }), {})

      const attributesArray = Array.from(el.attributes)
      const attributes = {}

      for (const attr of attributesArray) {
        if (attr.name === 'class') continue
        if (attr.name === 'style') continue

        if (attr.name === 'href') {
          const href = attr.value
          const isAbsolute = href.startsWith('http')
          if (isAbsolute) continue

          const isRelative = href.startsWith('/')
          if (isRelative) {
            attributes[attr.name] = `${siteBaseUrl}${href}`
            continue
          }
        }

        if (attr.name === 'src') {
          const src = attr.value
          const imageName =
            el.getAttribute('alt') || el.getAttribute('title') || src
          const isAbsolute = src.startsWith('http')
          if (isAbsolute) {
            // eslint-disable-next-line no-await-in-loop -- we need to wait for each image to upload
            const imageUrl = await uploadImage(src)

            assets.push({
              id: createId(),
              name: imageName,
              type: 'image',
              url: imageUrl,
            })

            attributes[attr.name] = imageUrl
            continue
          }

          const isRelative = attr.value.startsWith('/')
          if (isRelative) {
            // eslint-disable-next-line no-await-in-loop -- we need to wait for each image to upload
            const imageUrl = await uploadImage(`${siteBaseUrl}${attr.value}`)

            assets.push({
              id: createId(),
              name: imageName,
              type: 'image',
              url: imageUrl,
            })

            attributes[attr.name] = imageUrl
            continue
          }
        }

        attributes[attr.name] = attr.value
      }

      const element: Element = {
        id: createId(),
        type: el.tagName.toLowerCase() as Element['type'],
        children: [],
        style,
        attributes,
      }

      const childNodes = Array.from(el.childNodes)

      for (const child of childNodes) {
        if (child instanceof Text) {
          if (child.textContent) element.children.push(child.textContent)
        } else {
          const isComment = child instanceof Comment
          if (isComment) continue

          // eslint-disable-next-line no-await-in-loop -- we need to wait for each image to upload
          const childElement = await traverse(child as HTMLElement)
          if (childElement) element.children.push(childElement)
        }
      }

      return element
    }

    for (const child of children) {
      // eslint-disable-next-line no-await-in-loop -- we need to wait for each image to upload
      const element = await traverse(child as HTMLElement)
      if (element) elements.push(element)
    }

    const bodyStyles = Array.from(body.classList)
      .map((className) => cssProperties[className])
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})

    if (bodyStyles.width || bodyStyles.maxWidth) {
      const wrapperForWidth: Element = {
        id: createId(),
        type: 'div',
        children: elements,
        style: bodyStyles,
      }

      setElements([wrapperForWidth])
    } else {
      setElements(elements)
    }

    setBodyStyles(bodyStyles)
    setCustomFonts(Array.from(fontFamilies))

    // load the fonts
    const fonts = Array.from(fontFamilies).map((font) => {
      const fontFace = new FontFace(
        font.fontFamily as string,
        `url(${font.src.split(/,| /g)[0].replace(/"|'/g, '')})`
      )
      return fontFace
        .load()
        .then((loadedFont) => {
          document.fonts.add(loadedFont)
        })
        .catch(() => {
          toast.error(`Failed to load font ${font.fontFamily}`)
        })
    })

    setAssets(assets)
    await Promise.all(fonts)
  }

  const handleSiteImportClick = () => {
    const input = inputRef.current?.value?.trim() || ''
    if (input.startsWith('http://'))
      return toast.error('Only HTTPS sites are supported')

    const url = input.startsWith('https') ? input : `https://${input}`
    if (!url) return toast.error('Please enter a URL')

    const isValid = isValidUrl(url)
    if (!isValid) return toast.error('Please enter a valid URL')

    setIsImporting(true)
    toast.promise(importData(url), {
      loading: 'Importing...',
      success: () => {
        setIsImporting(false)
        setOpen(false)
        return 'Imported successfully'
      },
      error: (err) => {
        setIsImporting(false)
        return err.message
      },
    })
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <TooltipProvider disableHoverableContent delayDuration={300}>
          <Tooltip>
            <TooltipTrigger
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary"
              onClick={() => setOpen(true)}>
              <ImportIcon className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent
              className="h-8"
              data-canvas-function="true"
              side="bottom"
              sideOffset={8}>
              Import a site
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Import a site</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <div className="flex flex-col gap-4">
            <p>
              You can import a site by pasting the URL of the site you want to
              import.
            </p>
            <Input
              disabled={isImporting}
              placeholder="https://example.com"
              ref={inputRef}
            />
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="disabled:opacity-50"
            disabled={isImporting}
            onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="disabled:opacity-50"
            disabled={isImporting}
            onClick={handleSiteImportClick}>
            Import
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ImportSite
