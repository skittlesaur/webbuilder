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
}

export type ElementType = 'section' | 'div' | 'p'

export interface Element {
  id: string
  type: ElementType
  children: (Element | string)[]
  style: CSSProperties
}

export interface DraggedElement {
  relativeId: string
  relativePosition: 'before' | 'after'
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
  removeElement: (element: Element) => void
  updateElement: (element: Element) => void
  updateElementAttribute: (elementId: string, target: string, attribute: string, value: unknown) => void
  draggedElement: DraggedElement | undefined
  setDraggedElement: (draggedElement: DraggedElement | undefined) => void
}

const TEST_ELEMENTS: Element[] = [
  {
    id: '1',
    type: 'section',
    style: {},
    children: [
      {
        id: '11',
        type: 'div',
        style: {},
        children: [
          {
            id: '111',
            type: 'p',
            children: ['Hello World'],
            style: {},
          },
          {
            id: '112',
            type: 'p',
            children: ['Second p'],
            style: {},
          },
        ],
      },
      {
        id: '12',
        type: 'p',
        children: ['p p'],
        style: {},
      },
    ],
  },
]

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
      breakpoints: [{
        id: 'desktop',
        width: 1920,
        position: {
          x: 0,
          y: 0
        }
      }],
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
      elements: TEST_ELEMENTS,
      setElements: (elements) => {
        set({ elements })
      },
      addElement: (element, relativeId, relativePosition) => {
        if (!relativeId) {
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
          }

          const updatedChildren = el.children.map((child) => updateElement(child as Element))

          return {
            ...el,
            children: updatedChildren.flat(),
          }
        }

        const newElements = get().elements.map((el) => updateElement(el)) as Element[]

        set({ elements: newElements })
      },
      removeElement: (element) => {
        set({ elements: get().elements.filter((arrElement) => arrElement.id !== element.id) })
      },
      updateElement: (element) => {
        set({
          elements: get().elements.map((arrElement) => {
            if (arrElement.id === element.id) {
              return element
            }
            return arrElement
          }
          )
        })
      },
      updateElementAttribute: (elementId, target, attribute, value) => {
        const elements = get().elements

        const updateElement = (el: Element): Element | Element[] | string => {
          if (typeof el === 'string') return el

          if (el.id === elementId) {
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