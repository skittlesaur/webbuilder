import cn from 'classnames'
import { useEffect, useState } from 'react'
import DraggableIndicator from '../draggable-indicator'
import GradientEditor from './gradient-editor'
import TypographyElement from './typography-element'
import UnstyledDisplay from './unstyled-display'
import type { Element as ElementType } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import isTypographyElement from '@/lib/is-typography-element'

const Element = ({
  element,
  mediaQuery,
}: {
  element: ElementType | string
  mediaQuery: number | null
}) => {
  const { draggedElement } = useCanvasStore()
  const [isHovering, setIsHovering] = useState(false)
  const [isUnstyled, setIsUnstyled] = useState(false)

  const {
    selectedElementId,
    hoveredElementId,
    setHoveredElementId,
    setSelectedElementId,
    gradientEditor,
    isDraggingElement,
    setSelectedMediaQuery,
  } = useInteractionsStore()

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
      setIsUnstyled(false)
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

  if (typeof element === 'string') return element

  const Type = element.type

  const queries = Object.keys(element.mediaQueries || {})
    .filter((mq) => Number(mq) <= (mediaQuery || 0))
    .sort((a, b) => Number(a) - Number(b))

  const queryStyles = queries.reduce((acc, mq) => {
    return {
      ...acc,
      ...element.mediaQueries?.[mq],
    }
  }, {})

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
        ...element.style,
        ...queryStyles,
        padding: isDraggingElement ? `1rem 0` : element.style?.padding,
        outline: isDraggingElement
          ? '2px solid #923FDE'
          : element.style?.outline,
        position: isDraggingElement ? 'relative' : element.style?.position,
      }}
      onClick={(e) => {
        if (element.id === 'root') return
        e.stopPropagation()
        e.preventDefault()
        setSelectedElementId(element.id)
        setSelectedMediaQuery(mediaQuery)
      }}>
      {draggedElement && draggedElement?.relativeId === element.id ? (
        <DraggableIndicator position={draggedElement.relativePosition} />
      ) : null}
      {gradientEditor !== null && selectedElementId === element.id && (
        <GradientEditor />
      )}
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

export default Element
