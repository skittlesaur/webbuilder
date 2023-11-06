'use client'

import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const DevTools = () => {
  const { pan, zoom, draggedElement } = useCanvasStore()
  const { selectedElementId, selectedMediaQuery } = useInteractionsStore()

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

  return (
    <div className="z-[100] fixed bottom-4 right-1/2 translate-x-1/2 bg-white text-black min-w-[7rem] px-2 py-1 rounded grid grid-cols-3 gap-2 hover:opacity-50 transition-opacity duration-200 select-none">
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
