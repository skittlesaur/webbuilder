'use client'

import { useEffect, useState } from 'react'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import { findElementByIdArr } from '@/lib/find-element-by-id'

const DevTools = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pan = useCanvasStore((s) => s.pan)
  const zoom = useCanvasStore((s) => s.zoom)
  const draggedElement = useCanvasStore((s) => s.draggedElement)
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const elements = useCanvasStore((s) => s.elements)
  const element = findElementByIdArr(elements, selectedElementId || '')

  const DATA = [
    {
      title: 'Zoom',
      value: zoom,
    },
    {
      title: 'Pan',
      value: `x: ${pan.x} - y: ${pan.y}`,
    },
    {
      title: 'Selected Element',
      value: selectedElementId || 'None',
    },
    {
      title: 'Selected Component Id',
      value: element?.componentId || 'None',
    },
    {
      title: 'Selected Media Query',
      value: selectedMediaQuery || 'None',
    },
    {
      title: 'Dragged Element',
      value: draggedElement
        ? `${draggedElement?.relativeId} - ${draggedElement?.relativePosition}`
        : 'None',
    },
  ]

  useEffect(() => {
    // open dev tools when cmd + shift + d is pressed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' && e.shiftKey && e.metaKey) {
        e.preventDefault()
        e.stopPropagation()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isOpen) return null

  return (
    <div className="z-[100] fixed bottom-4 left-1/2 -translate-x-1/2 bg-white text-black border border-border/10 shadow-lg min-w-[7rem] px-2 py-1 rounded grid grid-cols-3 gap-2 select-none">
      {DATA.map((item) => (
        <div className="flex flex-col" key={item.title}>
          <p className="text-xs font-medium">{item.title}</p>
          <p className="text-xs">{item.value}</p>
        </div>
      ))}
    </div>
  )
}

export default DevTools
