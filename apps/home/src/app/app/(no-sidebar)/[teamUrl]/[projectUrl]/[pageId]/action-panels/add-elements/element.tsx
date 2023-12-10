import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createId } from '@paralleldrive/cuid2'
import type { PanelElement } from '.'
import type {
  DraggedElement,
  Element as ElementType,
} from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import isTypographyElement from '@/lib/is-typography-element'

const Element = ({
  Icon,
  title,
  element,
  style,
  children,
  attributes,
  mediaQueries,
  componentId,
  elementId,
}: PanelElement) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0, snap: false })

  const zoom = useCanvasStore((s) => s.zoom)
  const draggedElement = useCanvasStore((s) => s.draggedElement)
  const setDraggedElement = useCanvasStore((s) => s.setDraggedElement)
  const addElement = useCanvasStore((s) => s.addElement)
  const setIsDraggingElement = useInteractionsStore(
    (s) => s.setIsDraggingElement
  )
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      setDragPosition({
        x: clientX - 70,
        y: clientY - 90,
        snap: false,
      })

      const intersectingElements = document
        .elementsFromPoint(clientX, clientY)
        .filter((el: HTMLElement) => el.dataset.droppable === 'true')

      if (!intersectingElements.length) {
        setDraggedElement(undefined)
        return
      }

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

      // if the closest element is a typography element, we want to
      // snap to the typography element's parent instead (no child)
      // so an offset of 0.5 is used while the default is 0.2
      const offset =
        isTypographyElement({
          type: closestElementToCursor.tagName.toLowerCase() as ElementType['type'],
        }) && element !== 'a'
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
        type: element as DraggedElement['type'],
      })
    }

    const handleMouseUp = () => {
      const newElement: ElementType = {
        id: elementId || createId(),
        type: element as ElementType['type'],
        children: children ?? [],
        style: style ?? {},
        attributes: attributes ?? {},
        mediaQueries,
        componentId,
      }

      const { relativeId, relativePosition } = draggedElement || {}

      if (relativeId && relativePosition) {
        addElement(newElement, relativeId, relativePosition)
        setSelectedElementId(newElement.id)
      }

      setIsDragging(false)
      setIsDraggingElement(false)
      setDraggedElement(undefined)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    addElement,
    attributes,
    children,
    componentId,
    draggedElement,
    element,
    elementId,
    isDragging,
    mediaQueries,
    setDraggedElement,
    setIsDraggingElement,
    setSelectedElementId,
    style,
  ])

  return (
    <>
      <button
        className="w-full h-full flex flex-col items-center gap-1.5 hover:brightness-110"
        draggable={false}
        type="button"
        onMouseDown={(e) => {
          const isLeftClick = e.button === 0
          if (!isLeftClick) return
          setIsDragging(true)
          setIsDraggingElement(true)
          setDragPosition({
            x: e.clientX - 70,
            y: e.clientY - 90,
            snap: false,
          })
        }}>
        <div className="w-full aspect-square bg-secondary rounded flex items-center justify-center p-1.5 icon-wrapper">
          {Icon}
        </div>
        <p className="text-xs">{title}</p>
      </button>
      <AnimatePresence mode="wait">
        {isDragging ? (
          <motion.div
            animate={{
              scale: dragPosition.snap ? zoom : 1,
              opacity: 0.6,
            }}
            className="absolute w-24 h-24"
            exit={{
              scale: 0.5,
              opacity: 0,
            }}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            key={element}
            style={{
              top: dragPosition.y,
              left: dragPosition.x,
            }}
            transition={{
              duration: 0.15,
            }}>
            {Icon}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Element
