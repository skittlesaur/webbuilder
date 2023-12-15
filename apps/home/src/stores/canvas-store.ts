import type { CSSProperties } from 'react'
import { toast } from 'sonner'
import { create } from 'zustand'

export interface Breakpoint {
  id: string
  width: number
  minHeight: number
  position: {
    x: number
    y: number
  }
  isDefault?: boolean
}

export type ElementType =
  | 'div'
  | 'section'
  | 'ul'
  | 'li'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'p'
  | 'span'
  | 'sup'
  | 'sub'
  | 'a'
  | 'img'
  | 'button'
  | 'video'
  | 'form'
  | 'input'
  | 'label'
  | 'textarea'
  | 'select'
  | 'option'

export type ElementEvent =
  | 'click'
  | 'dblclick'
  | 'mousedown'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
  | 'keydown'
  | 'keypress'
  | 'keyup'
  | 'scroll'
  | 'wheel'
  | 'copy'
  | 'cut'
  | 'paste'
  | 'drag'
  | 'dragend'
  | 'dragenter'
  | 'dragleave'
  | 'dragover'
  | 'dragstart'
  | 'drop'
  | 'focus'
  | 'blur'
  | 'focusin'
  | 'focusout'
  | 'resize'
  | 'select'
  | 'submit'
  | 'search'
  | 'reset'
  | 'invalid'
  | 'input'
  | 'change'

export interface ElementStyle {
  default?: CSSProperties
  hover?: CSSProperties
  focus?: CSSProperties
  active?: CSSProperties
  visited?: CSSProperties
  disabled?: CSSProperties
}

export interface Element {
  id: string
  type: ElementType
  children: (Element | string)[]
  style: ElementStyle
  mediaQueries?: Record<string, ElementStyle> // key is the breakpoint width
  attributes?: Record<string, unknown> // special attributes like href, src, alt, etc.
  componentId?: string
  events?: Record<ElementEvent, string> // type -> handler
}

export interface DraggedElement {
  relativeId: string
  relativePosition: 'before' | 'after' | 'child'
  type: ElementType | 'grouped'
  element?: Element
}

export interface CustomFont {
  fontFamily: string
  fontWeights: number[]
  fontStyles: string[]
  fontDisplay?: string
  src: string
  unicodeRange?: string
}

export interface Asset {
  id: string
  name: string
  type: 'image' | 'video'
  url: string
}

export interface DefinedComponent {
  id: string
  name: string
  element: Element
  screenshot?: string
}

export interface Project {
  name: string
  url: string
  pages: {
    id: string
    path: string
  }[]
}

export interface Variable {
  name: string
  type: 'color' | 'string' | 'number'
  value: string | number
}

export interface BodyStyles extends CSSProperties {
  mediaQueries?: Record<string, CSSProperties>
}

interface CanvasStore {
  zoom: number
  setZoom: (zoom: number) => void
  pan: {
    x: number
    y: number
  }
  setPan: ({ x, y }: { x: number; y: number }) => void
  breakpoints: Breakpoint[]
  setBreakpoints: (breakpoints: Breakpoint[]) => void
  updateBreakpoint: (id: string, breakpoint: Partial<Breakpoint>) => void
  selectedIds: string[]
  setSelectedIds: (ids: string[]) => void
  addSelectedId: (id: string) => void
  removeSelectedId: (id: string) => void
  elements: Element[]
  setElements: (elements: Element[]) => void
  addElement: (
    element: Element,
    relativeId?: string,
    relativePosition?: 'before' | 'after' | 'child'
  ) => void
  removeElement: (elementId: string) => void
  updateElement: (elementId: string, updates: Partial<Element>) => void
  updateElementAttribute: (
    elementId: string,
    target: string,
    attribute: string,
    value: unknown,
    mediaQuery: number | null,
    state?: keyof ElementStyle
  ) => void
  draggedElement: DraggedElement | undefined
  setDraggedElement: (draggedElement: DraggedElement | undefined) => void
  bodyStyles: BodyStyles
  setBodyStyles: (styles: BodyStyles) => void
  updateBodyStyle: (
    attribute: string,
    value: unknown,
    mediaQuery: number | null
  ) => void
  customFonts: CustomFont[]
  setCustomFonts: (fonts: CustomFont[]) => void
  addCustomFont: (font: CustomFont) => void
  removeCustomFont: (fontFamily: string) => void
  assets: Asset[]
  setAssets: (assets: Asset[]) => void
  addAsset: (asset: Asset | Asset[]) => void
  deleteAsset: (assetId: string) => void
  components: DefinedComponent[]
  setComponents: (components: DefinedComponent[]) => void
  addComponent: (component: DefinedComponent) => void
  updateComponent: (component: DefinedComponent) => void
  removeComponent: (componentId: string) => void
  variables: Variable[]
  setVariables: (variables: Variable[]) => void
  addVariable: (variable: Variable) => void
  removeVariable: (variableName: string) => void
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  zoom: 1.7,
  setZoom: (zoom) => {
    set({ zoom })
  },
  pan: { x: 450, y: 130 },
  setPan: ({ x, y }) => {
    set({ pan: { x, y } })
  },
  breakpoints: [
    {
      id: 'desktop',
      width: 1440,
      minHeight: 1085,
      position: {
        x: 0,
        y: 0,
      },
      isDefault: true,
    },
    {
      id: 'tablet',
      width: 768,
      minHeight: 1024,
      position: {
        x: 1150,
        y: 0,
      },
    },
    {
      id: 'mobile',
      width: 375,
      minHeight: 844,
      position: {
        x: 1770,
        y: 0,
      },
    },
  ],
  setBreakpoints: (breakpoints) => {
    set({ breakpoints })
  },
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
    set({
      selectedIds: get().selectedIds.filter((selectedId) => selectedId !== id),
    })
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
            children: [...el.children, element],
          }
        }
      }

      const updatedChildren = el.children.map((child) =>
        updateElement(child as Element)
      )

      return {
        ...el,
        children: updatedChildren.flat(),
      }
    }

    const newElements = get()
      .elements.map((el) => updateElement(el))
      .flat() as Element[]

    set({ elements: newElements })
  },
  removeElement: (elementId) => {
    const elements = get().elements

    const deepRemoveElement = (el: Element): Element | string | null => {
      if (typeof el === 'string') return el

      if (el.id === elementId) {
        return null
      }

      const updatedChildren = el.children.map((child) =>
        deepRemoveElement(child as Element)
      )

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
  updateElement: (elementId, updates) => {
    const elements = get().elements

    const updateElement = (el: Element): Element | Element[] | string => {
      if (typeof el === 'string') return el

      if (el.id === elementId) {
        return {
          ...el,
          ...updates,
        }
      }

      const updatedChildren = el.children.map((child) =>
        updateElement(child as Element)
      )

      return {
        ...el,
        children: updatedChildren.flat(),
      }
    }

    const newElements = elements.map((el) => updateElement(el)) as Element[]
    set({ elements: newElements })
  },
  updateElementAttribute: (
    elementId,
    target,
    attribute,
    value,
    mediaQuery,
    state
  ) => {
    const elements = get().elements

    const updateElement = (el: Element): Element | Element[] | string => {
      if (typeof el === 'string') return el

      if (el.id === elementId) {
        if (target === 'style' && mediaQuery) {
          return {
            ...el,
            mediaQueries: {
              ...(el.mediaQueries || {}),
              [mediaQuery]: {
                ...(el.mediaQueries?.[mediaQuery] || {}),
                [state || 'default']: {
                  ...(el.mediaQueries?.[mediaQuery]?.[state || 'default'] ||
                    {}),
                  [attribute]: value,
                },
              },
            },
          }
        }

        if (state) {
          const data = el[target]?.[state]
          return {
            ...el,
            [target]: {
              ...(el[target] || {}),
              [state]: {
                ...(data || {}),
                [attribute]: value,
              },
            },
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

      const updatedChildren = el.children.map((child) =>
        updateElement(child as Element)
      )

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
  bodyStyles: {},
  setBodyStyles: (variables) => {
    set({ bodyStyles: variables })
  },
  updateBodyStyle: (attribute, value, mediaQuery) => {
    const styles = get().bodyStyles
    if (mediaQuery !== null) {
      const mq = styles.mediaQueries?.[mediaQuery] || {}
      mq[attribute] = value
      set({
        bodyStyles: {
          ...styles,
          mediaQueries: {
            ...styles.mediaQueries,
            [mediaQuery]: mq,
          },
        },
      })
    } else {
      set({
        bodyStyles: {
          ...styles,
          [attribute]: value,
        },
      })
    }
  },
  customFonts: [],
  setCustomFonts: (fonts) => {
    set({ customFonts: fonts })
  },
  addCustomFont: (font) => {
    set({ customFonts: [...get().customFonts, font] })
  },
  removeCustomFont: (fontFamily) => {
    set({
      customFonts: get().customFonts.filter(
        (font) => font.fontFamily !== fontFamily
      ),
    })
  },
  assets: [],
  setAssets: (assets) => {
    set({ assets })
  },
  addAsset: (asset) => {
    set({ assets: [asset, ...get().assets].flat() })
  },
  deleteAsset: (assetId) => {
    const asset = get().assets.find((a) => a.id === assetId)

    set({ assets: get().assets.filter((a) => a.id !== assetId) })

    // delete elements that use this asset
    const elements = get().elements
    const newElements = elements.map((el) => {
      const updateElement = (e: Element): Element | Element[] | string => {
        if (typeof e === 'string') return e

        if (e.attributes?.src === asset?.url) {
          return {
            ...e,
            attributes: {
              ...e.attributes,
              src: '',
            },
          }
        }

        const updatedChildren = e.children.map((child) =>
          updateElement(child as Element)
        )

        const filteredChildren = updatedChildren.filter(
          (child) => child !== null
        )

        return {
          ...e,
          children: filteredChildren.flat(),
        } as Element
      }

      return updateElement(el)
    })

    set({ elements: newElements as Element[] })
  },
  components: [],
  setComponents: (components) => {
    set({ components })
  },
  addComponent: (component) => {
    set({ components: [component, ...get().components] })
  },
  updateComponent: (component) => {
    set({
      components: get().components.map((c) => {
        if (c.id === component.id) {
          return component
        }
        return c
      }),
    })
  },
  removeComponent: (componentId) => {
    set({
      components: get().components.filter(
        (component) => component.id !== componentId
      ),
    })

    const deepRemoveComponent = (el: Element): Element | string => {
      if (typeof el === 'string') return el

      if (el.componentId === componentId) {
        return {
          ...el,
          componentId: undefined,
        }
      }

      const updatedChildren = el.children.map((child) =>
        deepRemoveComponent(child as Element)
      )

      const filteredChildren = updatedChildren.filter((child) => child !== null)

      return {
        ...el,
        children: filteredChildren.flat(),
      } as Element
    }

    const newElements = get()
      .elements.map((el) => deepRemoveComponent(el))
      .flat() as Element[]

    set({ elements: newElements })
  },
  variables: [],
  setVariables: (variables) => {
    set({ variables })
  },
  addVariable: (variable) => {
    const existingVariable = get().variables.find(
      (v) => v.name === variable.name
    )
    if (existingVariable) return toast.error('Variable already exists')
    set({ variables: [...get().variables, variable] })
  },
  removeVariable: (variableName) => {
    set({
      variables: get().variables.filter(
        (variable) => variable.name !== variableName
      ),
    })
  },
}))
