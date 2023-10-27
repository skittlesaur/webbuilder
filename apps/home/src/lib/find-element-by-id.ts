import type { Element } from '@/stores/canvas-store'

export const findElementById = (element: Element, idToFind: string): Element | null => {
  if (element.id === idToFind) {
    return element
  }

  for (const child of element.children) {
    if (typeof child === "object") {
      const foundElement = findElementById(child, idToFind)
      if (foundElement) {
        return foundElement
      }
    }
  }

  return null
}

export const findElementByIdArr = (elements: Element[], idToFind: string): Element | null => {
  for (const element of elements) {
    const foundElement = findElementById(element, idToFind)
    if (foundElement) {
      return foundElement
    }
  }

  return null
}