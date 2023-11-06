'use client'

import type { CSSProperties } from 'react'
import { toast } from 'sonner'
import { createId } from '@paralleldrive/cuid2'
import FontsData from '../fonts-data.json'
import { useCanvasStore } from '@/stores/canvas-store'
import type { Element } from '@/stores/canvas-store'

const defaultCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
    
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}

*,
::before,
::after {
  border-width: 0;
  border-style: solid;
  border-color: transparent;
}

`

const ExportButton = () => {
  const { elements } = useCanvasStore()

  const formatProperty = (property: string) => {
    return property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
  }

  const getElementCss = (style: CSSProperties) => {
    return Object.entries(style)
      .filter(([, value]) => value)
      .map(([property, value]) => `\t${formatProperty(property)}: ${value}`)
      .join('; \n')
  }

  const handleExport = () => {
    const html = document.createElement('html')
    const head = document.createElement('head')
    const body = document.createElement('body')

    let css = defaultCss
    const fontFamilies = new Set<string>()

    // viewport -> {className: CSSProperties}
    const mediaQueries = {}

    const deepGenerateElement = (element: Element | string) => {
      if (typeof element === 'string') {
        return document.createTextNode(element)
      }

      const { children, style, id } = element

      const el = document.createElement(element.type)

      const elementClassName = `baraa-${id}`

      Object.keys(
        (element.mediaQueries || {}) as Record<string, CSSProperties>
      ).forEach((mediaQuery) => {
        if (!mediaQueries[mediaQuery]) {
          mediaQueries[mediaQuery] = {}
        }

        mediaQueries[mediaQuery] = {
          ...mediaQueries[mediaQuery],
          [elementClassName]: element.mediaQueries?.[mediaQuery],
        }
      })

      const elementCss = getElementCss(style as CSSProperties)

      if (elementCss) {
        css += `.${elementClassName} { \n${elementCss}; \n}\n\n`
      }

      if (style.fontFamily) {
        fontFamilies.add(String(style.fontFamily).split(',')[0])
      }

      el.className = elementClassName

      Object.entries(
        (element.attributes as Record<string, unknown>) || {}
      ).forEach(([key, value]: [string, unknown]) => {
        el.setAttribute(key, String(value))
      })

      if (children.length) {
        children.forEach((child: Element | string) => {
          el.appendChild(deepGenerateElement(child))
        })
      }

      return el
    }

    elements.forEach((element) => {
      body.appendChild(deepGenerateElement(element))
    })

    Object.entries(mediaQueries).forEach(([mediaQuery, styles]) => {
      const styleString = Object.entries(styles as Record<string, CSSProperties>)
        .map(([className, style]) => {
          return `.${className} { \n${getElementCss(
            style as CSSProperties
          )}; \n}`
        })
        .join('\n\n')

      css += `@media (min-width: ${mediaQuery}px) { \n${styleString} \n}\n\n`
    })

    const fileName = `baraa-${createId()}`

    head.innerHTML = `<meta charset="UTF-8" />`
    head.innerHTML = `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
    head.innerHTML = `<link rel="stylesheet" href="./${fileName}.css" />`
    html.appendChild(head)

    html.appendChild(body)

    const htmlFile = new Blob([html.outerHTML], { type: 'text/html' })

    const fontImports = FontsData.filter((font) =>
      Array.from(fontFamilies).includes(font.family as string)
    )
      .map((font) => `@import url('${font.url}');`)
      .join('\n')

    const cssWithImports = `${fontImports}${css}`

    const cssFile = new Blob([cssWithImports], { type: 'text/css' })

    const htmlFileUrl = URL.createObjectURL(htmlFile)
    const cssFileUrl = URL.createObjectURL(cssFile)

    const link = document.createElement('a')
    link.href = htmlFileUrl
    link.download = `${fileName}.html`
    link.click()

    const cssLink = document.createElement('a')
    cssLink.href = cssFileUrl
    cssLink.download = `${fileName}.css`
    cssLink.click()

    URL.revokeObjectURL(htmlFileUrl)
    URL.revokeObjectURL(cssFileUrl)

    link.remove()
    cssLink.remove()

    html.remove()
    toast.success('Exported successfully')
  }

  return (
    <button
      className="px-2.5 py-1.5 text-medium !bg-primary text-text rounded text-xs hover:!bg-primary-800 transition-colors ease-in-out duration-150"
      type="button"
      onClick={handleExport}>
      Export
    </button>
  )
}

export default ExportButton
