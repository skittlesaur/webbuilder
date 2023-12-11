import type { CSSProperties } from 'react'
import FontsData from './fonts-data.json'

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

const getHtmlCss = ({ elements, breakpoints, bodyStyles }) => {
  const bodyCss = getElementCss(bodyStyles as CSSProperties)

  let css = defaultCss

  if (bodyCss)
    css += `body { \n${bodyCss}; \n}\n\n`

  let body = ''

  const fontFamilies = new Set<string>()

  // viewport -> {className: CSSProperties}
  const mediaQueries = {}

  const defaultMediaQuery = breakpoints.find(
    (bp) => bp.isDefault
  )
  const smallestMediaQuery = breakpoints.reduce((acc, bp) => {
    if (bp.width < acc.width) return bp
    return acc
  })
  const isDefaultSmallest = smallestMediaQuery.id === defaultMediaQuery.id

  const deepGenerateElement = (element) => {
    if (typeof element === 'string') {
      return element
    }

    const { children, style, id, attributes } = element

    const elementClassName = `baraa-${id}`

    let el = `<${element.type} id="${id}" class="${elementClassName}" `

    const propertiesInBreakpoints: string[] = []

    Object.keys((attributes || {}) as Record<string, unknown>).forEach(
      (attribute) => {
        el += `${attribute}="${attributes[attribute]}" `
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
          (element.mediaQueries?.[mediaQuery] || {}) as Record<
            string,
            unknown
          >
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
        [elementClassName]: propertiesInBreakpoints.reduce(
          (acc, property) => {
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
          },
          {}
        ),
      }
    }

    const elementCss = getElementCss(style as CSSProperties)

    if (elementCss) {
      css += `.${elementClassName} { \n${elementCss}; \n}\n\n`
    }

    if (style.fontFamily) {
      fontFamilies.add(String(style.fontFamily).split(',')[0])
    }

    Object.entries(
      (element.attributes as Record<string, unknown>) || {}
    ).forEach(([key, value]: [string, unknown]) => {
      if (key === 'class') return

      el += `${key}="${String(value)}" `
    })

    el += '>'

    if (children.length) {
      children.forEach((child: Element | string) => {
        el += deepGenerateElement(child)
      })
    }

    el += `</${element.type}>`

    return el
  }

  elements.forEach((element) => {
    body += deepGenerateElement(element)
  })

  const propertiesInBreakpoints: string[] = []

  Object.entries(mediaQueries).forEach(([mediaQuery, styles]) => {
    const styleString = Object.entries(
      styles as Record<string, CSSProperties>
    )
      .map(([className, style]) => {
        const properties = Object.keys(style as CSSProperties)
        propertiesInBreakpoints.push(...properties)

        return `.${className} { \n${getElementCss(
          style as CSSProperties
        )}; \n}`
      })
      .join('\n\n')

    css += `@media (min-width: ${mediaQuery}px) { \n${styleString} \n}\n\n`
  })

  const fontImports = FontsData.filter((font) =>
    Array.from(fontFamilies).includes(font.family as string)
  )
    .map((font) => `@import url('${font.url}');`)
    .join('\n')

  const cssWithImports = `${fontImports}${css}`

  return { body, css: cssWithImports }
}

export default getHtmlCss