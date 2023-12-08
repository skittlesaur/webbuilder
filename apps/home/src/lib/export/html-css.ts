import type { CSSProperties } from 'react'
import { toast } from 'sonner'
import { createId } from '@paralleldrive/cuid2'
import {
  useCanvasStore,
  type Breakpoint,
  type Element,
} from '@/stores/canvas-store'
import FontsData from '@/lib/fonts-data.json'

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

const formatProperty = (property: string) => {
  return property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

const getElementCss = (style: CSSProperties) => {
  return Object.entries(style)
    .filter(([, value]) => value)
    .map(([property, value]) => `\t${formatProperty(property)}: ${value}`)
    .join('; \n')
}

const exportHtmlCss = () => {
  const { elements, breakpoints, bodyStyles, variables } =
    useCanvasStore.getState()

  const html = document.createElement('html')
  const head = document.createElement('head')
  const body = document.createElement('body')

  let css = defaultCss

  if (variables?.length > 0)
    css += `:root {
    ${variables
      .map(
        (variable) =>
          `--${variable.name.replace(/ /g, '-').toLowerCase()}: ${
            variable.value
          };`
      )
      .join('\n')}
}\n\n`

  const bodyCss = getElementCss(bodyStyles as CSSProperties)

  if (bodyCss) css += `body { \n${bodyCss}; \n}\n\n`

  const fontFamilies = new Set<string>()

  // viewport -> {className: CSSProperties}
  const mediaQueries = {}

  const defaultMediaQuery = breakpoints.find((bp) => bp.isDefault) as Breakpoint
  const smallestMediaQuery = breakpoints.reduce((acc, bp) => {
    if (bp.width < acc.width) return bp
    return acc
  })
  const isDefaultSmallest = smallestMediaQuery.id === defaultMediaQuery.id

  const deepGenerateElement = (element: Element | string) => {
    if (typeof element === 'string') {
      return document.createTextNode(element)
    }

    const { children, style, id, attributes } = element

    const el = document.createElement(element.type)

    const elementClassName = `baraa-${id}`

    const propertiesInBreakpoints: string[] = []

    Object.keys((attributes || {}) as Record<string, unknown>).forEach(
      (attribute) => {
        el.setAttribute(attribute, String(attributes?.[attribute]))
      }
    )

    Object.keys(
      (element.mediaQueries || {}) as Record<string, CSSProperties>
    ).forEach((mediaQuery) => {
      if (!mediaQueries[mediaQuery]) {
        mediaQueries[mediaQuery] = {}
      }

      propertiesInBreakpoints.push(
        ...Object.keys(
          (element.mediaQueries?.[mediaQuery] || {}) as Record<string, unknown>
        )
      )

      mediaQueries[mediaQuery] = {
        ...mediaQueries[mediaQuery],
        [elementClassName]: element.mediaQueries?.[mediaQuery],
      }
    })

    if (!isDefaultSmallest) {
      mediaQueries[defaultMediaQuery.width] = {
        ...mediaQueries[defaultMediaQuery.width],
        [elementClassName]: propertiesInBreakpoints.reduce((acc, property) => {
          if (element.mediaQueries?.[defaultMediaQuery.width]?.[property]) {
            return {
              ...acc,
              [property]:
                element.mediaQueries?.[defaultMediaQuery.width]?.[property],
            }
          }

          if (element.style?.[property]) {
            return {
              ...acc,
              [property]: element.style?.[property],
            }
          }

          return acc
        }, {}),
      }
    }

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

  const propertiesInBreakpoints: string[] = []

  Object.entries(mediaQueries).forEach(([mediaQuery, styles]) => {
    const styleString = Object.entries(styles as Record<string, CSSProperties>)
      .map(([className, style]) => {
        const properties = Object.keys(style as CSSProperties)
        propertiesInBreakpoints.push(...properties)

        return `.${className} { \n${getElementCss(style as CSSProperties)}; \n}`
      })
      .join('\n\n')

    css += `@media (min-width: ${mediaQuery}px) { \n${styleString} \n}\n\n`
  })

  const fileName = `baraa-${createId()}`

  head.innerHTML = `<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="./${fileName}.css" />
`
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

export default exportHtmlCss
