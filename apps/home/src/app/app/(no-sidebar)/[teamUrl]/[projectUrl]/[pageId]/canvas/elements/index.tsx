import cn from 'classnames'
import { memo, useEffect, useState } from 'react'
import DraggableIndicator from '../draggable-indicator'
import TypographyElement from './typography-element'
import UnstyledDisplay from './unstyled-display'
import type {
  DraggedElement,
  Element as ElementType,
} from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import isTypographyElement from '@/lib/is-typography-element'
import {} from 'sonner'
import { createId } from '@paralleldrive/cuid2'

const VOID_ELEMENTS = [
  'img',
  'input',
  'br',
  'hr',
  'link',
  'meta',
  'input',
  'textarea',
]

const Element = ({
  element,
  mediaQuery,
}: {
  element: ElementType | string
  mediaQuery: number | null
}) => {
  const draggedElement = useCanvasStore((s) => s.draggedElement)
  const setDraggedElement = useCanvasStore((s) => s.setDraggedElement)
  const setIsDraggingElement = useInteractionsStore(
    (s) => s.setIsDraggingElement
  )
  const addElement = useCanvasStore((s) => s.addElement)

  const removeElement = useCanvasStore((s) => s.removeElement)

  const [isHovering, setIsHovering] = useState(false)
  const [isUnstyled, setIsUnstyled] = useState(false)
  const [drag, setDrag] = useState({
    x: 0,
    y: 0,
    active: false,
    mouseDown: false,
  })

  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const hoveredElementId = useInteractionsStore((s) => s.hoveredElementId)
  const setHoveredElementId = useInteractionsStore((s) => s.setHoveredElementId)
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )
  const isDraggingElement = useInteractionsStore((s) => s.isDraggingElement)
  const setSelectedMediaQuery = useInteractionsStore(
    (s) => s.setSelectedMediaQuery
  )

  useEffect(() => {
    if (typeof element === 'string') return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      const intersectingElements = document
        .elementsFromPoint(clientX, clientY)
        .filter(
          (el: HTMLElement) =>
            el.dataset.droppable === 'true' &&
            el.id &&
            el.id !== draggedElement?.relativeId
        )

      if (!intersectingElements.length) {
        setIsHovering(false)
        return
      }

      let closestElementToCursor = intersectingElements[0]
      let closestDistance = Infinity

      intersectingElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const distance = Math.sqrt(
          (rect.x - clientX) ** 2 + (rect.y - clientY) ** 2
        )

        if (distance < closestDistance) {
          closestDistance = distance
          closestElementToCursor = el
        }
      })

      if (closestElementToCursor.id === element.id) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [draggedElement?.relativeId, element])

  useEffect(() => {
    if (typeof element === 'string') return

    if (isHovering && hoveredElementId !== element.id) {
      setHoveredElementId(element.id)
    } else if (!isHovering && hoveredElementId === element.id) {
      setHoveredElementId(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need to update when other props change since it will cause unexpected behavior
  }, [isHovering])

  useEffect(() => {
    if (typeof element === 'string') {
      // setIsUnstyled(false)
      return
    }

    const hasHeight =
      (element.style?.height &&
        !['auto', 'unset'].includes(element.style?.height as string)) ||
      (element.style?.minHeight &&
        ['auto', 'unset'].includes(element.style?.minHeight as string))

    const hasWidth =
      (element.style?.width &&
        !['auto', 'unset'].includes(element.style?.width as string)) ||
      (element.style?.minWidth &&
        ['auto', 'unset'].includes(element.style?.minWidth as string))

    const hasChildren = element.children.length > 0

    if (!hasHeight && !hasWidth && !hasChildren) {
      setIsUnstyled(true)
    } else {
      setIsUnstyled(false)
    }
  }, [element])

  useEffect(() => {
    const mouseMoveListener = (e: MouseEvent) => {
      if (!drag.active || typeof element === 'string') {
        setDrag({
          x: 0,
          y: 0,
          active: false,
          mouseDown: false,
        })
        setDraggedElement(undefined)
        setIsDraggingElement(false)
        return
      }

      const { clientX, clientY } = e

      setDrag({
        x: clientX,
        y: clientY,
        active: true,
        mouseDown: true,
      })

      const getChildrenIds = (el: ElementType): string[] => {
        if (typeof el === 'string') return []

        return el.children.reduce<string[]>((acc, child) => {
          if (typeof child === 'string') return acc

          return [...acc, child.id, ...getChildrenIds(child)]
        }, [])
      }

      const childrenIds = getChildrenIds(element)

      const intersectingElements = document
        .elementsFromPoint(clientX, clientY)
        .filter(
          (el: HTMLElement) =>
            el.dataset.droppable === 'true' &&
            ![element.id, ...childrenIds].includes(el.id)
        )

      let closestElementToCursor = intersectingElements[0] as HTMLElement
      let closestDistance = Infinity

      intersectingElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const distance = Math.sqrt(
          (rect.x - clientX) ** 2 + (rect.y - clientY) ** 2
        )

        if (distance < closestDistance) {
          closestDistance = distance
          closestElementToCursor = el as HTMLElement
        }
      })

      if (!closestElementToCursor) return setDraggedElement(undefined)

      // if the closest element is a typography element, we want to
      // snap to the typography element's parent instead (no child)
      // so an offset of 0.5 is used while the default is 0.2
      const offset =
        isTypographyElement({
          type: closestElementToCursor.tagName.toLowerCase() as ElementType['type'],
        }) && element.type !== 'a'
          ? 0.5
          : 0.2
      const elementRect = closestElementToCursor.getBoundingClientRect()

      let relativePosition: DraggedElement['relativePosition']

      if (clientY < elementRect.y + elementRect.height * offset) {
        relativePosition = 'before'
      } else if (clientY > elementRect.y + elementRect.height * (1 - offset)) {
        relativePosition = 'after'
      } else {
        relativePosition = 'child'
      }

      setDraggedElement({
        relativeId: closestElementToCursor.id,
        relativePosition,
        type: 'grouped',
        element,
      })
    }

    const mouseUpListener = () => {
      if (!drag.active) return

      const {
        relativeId,
        relativePosition,
        element: droppedElement,
      } = draggedElement || {}

      if (!droppedElement) {
        setDrag({
          x: 0,
          y: 0,
          active: false,
          mouseDown: false,
        })

        setDraggedElement(undefined)
        setIsDraggingElement(false)
        return
      }

      addElement(
        {
          ...droppedElement,
          id: createId(),
        },
        relativeId,
        relativePosition
      )

      setDrag({
        x: 0,
        y: 0,
        active: false,
        mouseDown: false,
      })

      setDraggedElement(undefined)
      setIsDraggingElement(false)
      removeElement(droppedElement.id)
    }

    if (drag.active) {
      window.addEventListener('mousemove', mouseMoveListener)
      window.addEventListener('mouseup', mouseUpListener)
    } else {
      window.removeEventListener('mousemove', mouseMoveListener)
      window.removeEventListener('mouseup', mouseUpListener)
    }

    return () => {
      window.removeEventListener('mousemove', mouseMoveListener)
      window.removeEventListener('mouseup', mouseUpListener)
    }
  }, [
    addElement,
    drag.active,
    draggedElement,
    element,
    removeElement,
    setDraggedElement,
    setIsDraggingElement,
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!drag.mouseDown) return

      setDrag((prev) => ({
        ...prev,
        active: true,
      }))
      setIsDraggingElement(true)
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [drag.mouseDown, setIsDraggingElement])

  if (typeof element === 'string') return element

  const Type = element.type

  const queries = Object.keys(
    (element.mediaQueries || {}) as Record<string, unknown>
  )
    .filter((mq) => Number(mq) <= (mediaQuery || Infinity))
    .sort((a, b) => Number(a) - Number(b))

  const queryStyles = queries.reduce((acc, mq) => {
    const query = element.mediaQueries?.[mq]
    if (!query) return acc

    const formattedQuery = Object.keys(query).reduce((a, key) => {
      const value = query[key]

      if (value === undefined || value === null) return acc

      if (String(value).endsWith('vh')) {
        const num = Number(value.replace('vh', ''))
        return {
          ...a,
          [key]: `calc(var(--vh) * ${num / 100})`,
        }
      }

      if (String(value).endsWith('vw')) {
        const num = Number(value.replace('vw', ''))
        return {
          ...a,
          [key]: `calc(var(--vw) * ${num / 100})`,
        }
      }

      return {
        ...a,
        [key]: value,
      }
    }, {})

    return {
      ...acc,
      ...formattedQuery,
    }
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/no-explicit-any -- no need to specify type
  }, {} as any)

  const formattedStyle = Object.keys(element.style || {}).reduce((acc, key) => {
    const value = element.style?.[key]

    if (value === undefined || value === null) return acc

    if (String(value).endsWith('vh')) {
      const num = Number(value.replace('vh', ''))
      return {
        ...acc,
        [key]: `calc(var(--vh) * ${num / 100})`,
      }
    }

    if (String(value).endsWith('vw')) {
      const num = Number(value.replace('vw', ''))
      return {
        ...acc,
        [key]: `calc(var(--vw) * ${num / 100})`,
      }
    }

    return {
      ...acc,
      [key]: value,
    }
  }, {})

  if (VOID_ELEMENTS.includes(element.type as string))
    return (
      <Type
        {...element.attributes}
        className={cn({
          'ring-2 !ring-primary': selectedElementId === element.id,
          'ring-2 ring-primary/70':
            isHovering || hoveredElementId === element.id,
        })}
        data-droppable="true"
        id={element.id}
        style={{
          ...(mediaQuery === null
            ? { ...queryStyles, ...formattedStyle }
            : { ...formattedStyle, ...queryStyles }),
          paddingLeft: isDraggingElement
            ? `0.5rem`
            : queryStyles?.paddingLeft ?? element.style?.paddingLeft,
          paddingRight: isDraggingElement
            ? `0.5rem`
            : queryStyles?.paddingRight ?? element.style?.paddingRight,
          paddingTop: isDraggingElement
            ? `0.5rem`
            : queryStyles?.paddingTop ?? element.style?.paddingTop,
          paddingBottom: isDraggingElement
            ? `0.5rem`
            : queryStyles?.paddingBottom ?? element.style?.paddingBottom,
          outline: isDraggingElement
            ? '2px solid #923FDE'
            : queryStyles?.outline ?? element.style?.outline,
          // eslint-disable-next-line no-nested-ternary -- no need to simplify
          position: drag.active
            ? 'absolute'
            : isDraggingElement
            ? 'relative'
            : queryStyles?.position ?? element.style?.position,
          top: drag.active
            ? `${drag.y}px`
            : queryStyles?.top ?? element.style?.top,
          left: drag.active
            ? `${drag.x}px`
            : queryStyles?.left ?? element.style?.left,
          zIndex: drag.active
            ? 1000
            : queryStyles?.zIndex ?? element.style?.zIndex,
          scale: drag.active ? 0.5 : queryStyles?.scale ?? element.style?.scale,
          opacity: drag.active
            ? 0.5
            : queryStyles?.opacity ?? element.style?.opacity,
        }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setSelectedElementId(element.id === 'root' ? null : element.id)
          setSelectedMediaQuery(mediaQuery)
        }}
        onFocus={(e) => {
          // disables editing of text when clicking on element
          e.target.blur()
        }}
        onMouseDown={(e) => {
          if (e.button === 0) {
            e.stopPropagation()
            setDrag({
              x: e.clientX,
              y: e.clientY,
              active: false,
              mouseDown: true,
            })
          }
        }}
        onMouseUp={(e) => {
          if (e.button === 0) {
            setDrag((prev) => ({
              ...prev,
              mouseDown: false,
              active: false,
            }))
          }
        }}
      />
    )

  return (
    <Type
      {...element.attributes}
      className={cn({
        'ring-2 !ring-primary': selectedElementId === element.id,
        'ring-2 ring-primary/70': isHovering || hoveredElementId === element.id,
      })}
      data-droppable="true"
      id={element.id}
      style={{
        ...(mediaQuery === null
          ? { ...queryStyles, ...formattedStyle }
          : { ...formattedStyle, ...queryStyles }),
        paddingLeft: isDraggingElement
          ? `0.5rem`
          : queryStyles?.paddingLeft ?? element.style?.paddingLeft,
        paddingRight: isDraggingElement
          ? `0.5rem`
          : queryStyles?.paddingRight ?? element.style?.paddingRight,
        paddingTop: isDraggingElement
          ? `0.5rem`
          : queryStyles?.paddingTop ?? element.style?.paddingTop,
        paddingBottom: isDraggingElement
          ? `0.5rem`
          : queryStyles?.paddingBottom ?? element.style?.paddingBottom,
        outline: isDraggingElement
          ? '2px solid #923FDE'
          : queryStyles?.outline ?? element.style?.outline,
        // eslint-disable-next-line no-nested-ternary -- no need to simplify
        position: drag.active
          ? 'absolute'
          : isDraggingElement
          ? 'relative'
          : queryStyles?.position ?? element.style?.position,
        top: drag.active
          ? `${drag.y}px`
          : queryStyles?.top ?? element.style?.top,
        left: drag.active
          ? `${drag.x}px`
          : queryStyles?.left ?? element.style?.left,
        zIndex: drag.active
          ? 1000
          : queryStyles?.zIndex ?? element.style?.zIndex,
        scale: drag.active ? 0.5 : queryStyles?.scale ?? element.style?.scale,
        opacity: drag.active
          ? 0.5
          : queryStyles?.opacity ?? element.style?.opacity,
      }}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setSelectedElementId(element.id === 'root' ? null : element.id)
        setSelectedMediaQuery(mediaQuery)
      }}
      onMouseDown={(e) => {
        if (e.button === 0) {
          e.stopPropagation()
          setDrag({
            x: e.clientX,
            y: e.clientY,
            active: false,
            mouseDown: true,
          })
        }
      }}
      onMouseUp={(e) => {
        if (e.button === 0) {
          setDrag((prev) => ({
            ...prev,
            mouseDown: false,
            active: false,
          }))
        }
      }}>
      {draggedElement && draggedElement?.relativeId === element.id ? (
        <DraggableIndicator position={draggedElement.relativePosition} />
      ) : null}
      {isUnstyled ? <UnstyledDisplay /> : null}
      {isTypographyElement(element) ? (
        <TypographyElement element={element} />
      ) : (
        element.children.map((child) => (
          <Element
            element={child}
            key={typeof child === 'string' ? child : child.id}
            mediaQuery={mediaQuery}
          />
        ))
      )}
    </Type>
  )
}

export default memo(Element, (prev, next) => {
  if (typeof prev.element === 'string' || typeof next.element === 'string')
    return prev.element === next.element

  if (prev.mediaQuery !== next.mediaQuery) return false

  if (JSON.stringify(prev.element) !== JSON.stringify(next.element))
    return false

  return true
})
