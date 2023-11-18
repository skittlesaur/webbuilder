import type { Element } from '@/stores/canvas-store'

const getElementParentById = (idToFind: string, elements: Element[]): Element | false => {
  const traverse = (element: Element) => {
    for (const child of element.children) {
      if (typeof child === 'string') continue

      if (child.id === idToFind) {
        return element
      }

      const result = traverse(child)

      if (result) {
        return result
      }
    }

    return false
  }

  for (const element of elements) {
    if (element.id === idToFind) {
      return false
    }

    const result = traverse(element)

    if (result) {
      return result
    }
  }

  return false
}

export default getElementParentById