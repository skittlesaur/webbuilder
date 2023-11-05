import type { Element } from '@/stores/canvas-store'

const isTypographyElement = (element: Partial<Element> & { type: string }): boolean => {
  return [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
  ].includes(element.type as string)
}

export default isTypographyElement