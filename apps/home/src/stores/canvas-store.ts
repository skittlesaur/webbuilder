import type { CSSProperties } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Breakpoint {
  id: string
  width: number
  position: {
    x: number
    y: number
  }
  isDefault?: boolean
}

export type ElementType = 'div' | 'section' | 'ul' | 'li' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'sup' | 'sub' | 'a'

export interface Element {
  id: string
  type: ElementType
  children: (Element | string)[]
  style: CSSProperties
  mediaQueries?: Record<string, CSSProperties>
  attributes?: Record<string, unknown>
}

export interface DraggedElement {
  relativeId: string
  relativePosition: 'before' | 'after' | 'child'
  type: ElementType
}

interface CanvasStore {
  zoom: number
  setZoom: (zoom: number) => void
  pan: {
    x: number
    y: number
  },
  setPan: ({ x, y }: { x: number, y: number }) => void
  breakpoints: Breakpoint[]
  updateBreakpoint: (id: string, breakpoint: Partial<Breakpoint>) => void
  selectedIds: string[]
  setSelectedIds: (ids: string[]) => void
  addSelectedId: (id: string) => void
  removeSelectedId: (id: string) => void
  elements: Element[]
  setElements: (elements: Element[]) => void
  addElement: (element: Element, relativeId?: string, relativePosition?: 'before' | 'after' | 'child') => void
  removeElement: (elementId: string) => void
  updateElement: (element: Element) => void
  updateElementAttribute: (elementId: string, target: string, attribute: string, value: unknown, mediaQuery: number | null) => void
  draggedElement: DraggedElement | undefined
  setDraggedElement: (draggedElement: DraggedElement | undefined) => void
}

export const useCanvasStore = create<CanvasStore>()(
  persist(
    (set, get) => ({
      zoom: 1,
      setZoom: (zoom) => {
        set({ zoom })
      },
      pan: { x: 0, y: 0 },
      setPan: ({ x, y }) => {
        set({ pan: { x, y } })
      },
      breakpoints: [
        {
          id: 'desktop',
          width: 1440,
          position: {
            x: 0,
            y: 0
          },
        },
        {
          id: 'tablet',
          width: 768,
          position: {
            x: 1150,
            y: 0
          }
        },
        {
          id: 'mobile',
          width: 375,
          position: {
            x: 1770,
            y: 0
          },
          isDefault: true
        }
      ],
      updateBreakpoint: (id, breakpoint) => {
        set({
          breakpoints: get().breakpoints.map((bp) => {
            if (bp.id === id) {
              return {
                ...bp,
                ...breakpoint,
              }
            }
            return bp
          }),
        })
      },
      selectedIds: [],
      setSelectedIds: (ids) => {
        set({ selectedIds: ids })
      },
      addSelectedId: (id) => {
        set({ selectedIds: [...get().selectedIds, id] })
      },
      removeSelectedId: (id) => {
        set({ selectedIds: get().selectedIds.filter((selectedId) => selectedId !== id) })
      },
      elements: [],
      setElements: (elements) => {
        set({ elements })
      },
      addElement: (element, relativeId, relativePosition) => {
        if (!relativeId || relativeId === 'root') {
          set({ elements: [...get().elements, element] })
          return
        }

        // relativeId is the nearest sibling element to the new element
        // relativePosition is the position of the new element relative to the relativeId

        const updateElement = (el: Element): Element | Element[] | string => {
          if (typeof el === 'string') return el

          if (el.id === relativeId) {
            if (relativePosition === 'before') {
              return [element, el]
            }
            if (relativePosition === 'after') {
              return [el, element]
            }
            if (relativePosition === 'child') {
              return {
                ...el,
                children: [...el.children, element]
              }
            }
          }

          const updatedChildren = el.children.map((child) => updateElement(child as Element))

          return {
            ...el,
            children: updatedChildren.flat(),
          }
        }

        const newElements = get().elements.map((el) => updateElement(el)).flat() as Element[]

        set({ elements: newElements })
      },
      removeElement: (elementId) => {
        const elements = get().elements

        const deepRemoveElement = (el: Element): Element | string | null => {
          if (typeof el === 'string') return el

          if (el.id === elementId) {
            return null
          }

          const updatedChildren = el.children.map((child) => deepRemoveElement(child as Element))

          const filteredChildren = updatedChildren.filter((child) => child !== null)

          return {
            ...el,
            children: filteredChildren.flat(),
          } as Element
        }

        const newElements = elements
          .map((el) => deepRemoveElement(el))
          .filter((el) => el !== null) as Element[]

        set({ elements: newElements })
      },
      updateElement: (element) => {
        const elements = get().elements

        const updateElement = (el: Element): Element | Element[] | string => {
          if (typeof el === 'string') return el

          if (el.id === element.id) {
            return element
          }

          const updatedChildren = el.children.map((child) => updateElement(child as Element))

          return {
            ...el,
            children: updatedChildren.flat(),
          }
        }

        const newElements = elements.map((el) => updateElement(el)) as Element[]
        set({ elements: newElements })
      },
      updateElementAttribute: (elementId, target, attribute, value, mediaQuery) => {
        const elements = get().elements

        const updateElement = (el: Element): Element | Element[] | string => {
          if (typeof el === 'string') return el

          if (el.id === elementId) {
            if (target === 'style' && mediaQuery) {
              const mq = el.mediaQueries ? el.mediaQueries[mediaQuery] : undefined

              if (mq && el[target][attribute] === value) {
                const update = {
                  ...el,
                }
                delete update.mediaQueries?.[mediaQuery][attribute]
                if (Object.keys(update.mediaQueries?.[mediaQuery] || {}).length === 0) {
                  delete update.mediaQueries?.[mediaQuery]
                }

                return update
              }

              return {
                ...el,
                mediaQueries: {
                  ...el.mediaQueries,
                  [mediaQuery]: {
                    ...mq,
                    [attribute]: value,
                  }
                }
              }
            }

            const data = el[target]
            return {
              ...el,
              [target]: {
                ...data,
                [attribute]: value,
              },
            }
          }

          const updatedChildren = el.children.map((child) => updateElement(child as Element))

          return {
            ...el,
            children: updatedChildren.flat(),
          }
        }

        const newElements = elements.map((el) => updateElement(el)) as Element[]

        set({ elements: newElements })
      },
      draggedElement: undefined,
      setDraggedElement: (draggedElement) => {
        set({ draggedElement })
      },
    }),
    {
      name: 'canvas-store',
    }
  )
)