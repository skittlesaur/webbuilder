'use client'

import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const DevTools = () => {
  const { pan, zoom, draggedElement } = useCanvasStore()
  const { selectedElementId } = useInteractionsStore()

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
      title: 'Dragged Element',
      value: draggedElement ? `${draggedElement?.relativeId} - ${draggedElement?.relativePosition}` : 'None',
    }
  ]

  return (
    <div className="z-[100] fixed bottom-4 right-4 bg-white text-black min-w-[7rem] px-2 py-1 rounded flex flex-col gap-1">
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
