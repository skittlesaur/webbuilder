'use client'

import type { CSSProperties } from 'react'
import type { Element } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { toast } from 'sonner'

const ExportButton = () => {
  const { elements } = useCanvasStore()

  const getElementCss = (style: CSSProperties) => {
    return Object.entries(style)
      .filter(([, value]) => value)
      .map(([property, value]) => `\t${property}: ${value}`)
      .join('; \n')
  }

  const handleExport = () => {
    const html = document.createElement('html')
    const head = document.createElement('head')
    const body = document.createElement('body')

    let css = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
    
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

`

    const deepGenerateElement = (element: Element | string) => {
      if (typeof element === 'string') {
        return document.createTextNode(element)
      }

      const { children, style, id } = element

      const el = document.createElement(element.type)

      const elementClassName = `baraa-${id}`
      const elementCss = getElementCss(style as CSSProperties)

      if (elementCss) {
        css += `.${elementClassName} { \n${elementCss}; \n}\n\n`
      }

      el.className = elementClassName

      if (children.length) {
        children.forEach((child) => {
          el.appendChild(deepGenerateElement(child))
        })
      }

      return el
    }

    elements.forEach((element) => {
      body.appendChild(deepGenerateElement(element))
    })

    head.innerHTML = `<link rel="stylesheet" href="./styles.css" />`
    html.appendChild(head)

    html.appendChild(body)

    const htmlFile = new Blob([html.outerHTML], { type: 'text/html' })
    const cssFile = new Blob([css], { type: 'text/css' })

    const htmlFileUrl = URL.createObjectURL(htmlFile)
    const cssFileUrl = URL.createObjectURL(cssFile)

    const link = document.createElement('a')
    link.href = htmlFileUrl
    link.download = 'index.html'
    link.click()

    const cssLink = document.createElement('a')
    cssLink.href = cssFileUrl
    cssLink.download = 'styles.css'
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
