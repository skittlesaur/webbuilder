import cn from 'classnames'
import { useEffect, useState } from 'react'
import DraggableIndicator from '../draggable-indicator'
import type { Element as ElementType } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import GradientEditor from './gradient-editor'

const Element = ({ element }: { element: ElementType | string }) => {
  const { draggedElement } = useCanvasStore()
  const [isHovering, setIsHovering] = useState(false)
  const {
    selectedElementId,
    hoveredElementId,
    setHoveredElementId,
    setSelectedElementId,
    gradientEditor,
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

  if (typeof element === 'string') return element

  const Type = element.type

  return (
    <Type
      className={cn({
        'ring-2 !ring-primary': selectedElementId === element.id,
        'ring-2 ring-primary/70': isHovering || hoveredElementId === element.id,
        relative: draggedElement?.relativeId === element.id,
      })}
      data-droppable="true"
      id={element.id}
      style={element.style}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElementId(element.id)
      }}>
      {draggedElement?.relativeId === element.id && (
        <DraggableIndicator position={draggedElement.relativePosition} />
      )}
      {gradientEditor !== null && selectedElementId === element.id && (
        <GradientEditor />
      )}
      {element.children.map((child) => (
        <Element
          element={child}
          key={typeof child === 'string' ? child : child.id}
        />
      ))}
    </Type>
  )
}

export default Element
