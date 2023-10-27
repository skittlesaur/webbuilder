import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type {
  DraggedElement,
  Element as ElementType
} from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { createId } from '@paralleldrive/cuid2'

interface ElementProps {
  Icon: React.ReactNode
  title: string
  element: string
}

const Element = ({ Icon, title, element }: ElementProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0, snap: false })
  const { zoom, draggedElement, setDraggedElement, addElement } = useCanvasStore()

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

      const offset = 0.4
      const elementRect = closestElementToCursor.getBoundingClientRect()

      const relativePosition: DraggedElement['relativePosition'] =
        clientY < elementRect.top + elementRect.height * offset
          ? 'before'
          : 'after'

      setDraggedElement({
        relativeId: closestElementToCursor.id,
        relativePosition,
        type: element as DraggedElement['type'],
      })
    }

    const handleMouseUp = () => {
      const newElement: ElementType = {
        id: createId(),
        type: element as ElementType['type'],
        children: [],
      }

      const { relativeId, relativePosition } = draggedElement || {}

      if (relativeId && relativePosition) {
        addElement(newElement, relativeId, relativePosition)
      }

      setIsDragging(false)
      setDraggedElement(undefined)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [addElement, draggedElement, element, isDragging, setDraggedElement])

  return (
    <>
      <button
        className="flex flex-col items-center gap-1.5 hover:brightness-110"
        type="button"
        onMouseDown={(e) => {
          setIsDragging(true)
          setDragPosition({
            x: e.clientX - 70,
            y: e.clientY - 90,
            snap: false,
          })
        }}>
        <div className="w-full aspect-square bg-secondary rounded flex items-center justify-center">
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
            className="w-24 h-24 absolute"
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
