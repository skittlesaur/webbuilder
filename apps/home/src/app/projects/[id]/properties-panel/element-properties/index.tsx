import { useMemo } from 'react'
import type { Position } from './position'
import ElementPropertiesPosition from './position'
import { findElementByIdArr } from '@/lib/find-element-by-id'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const ElementProperties = () => {
  const { selectedElementId } = useInteractionsStore()
  const { elements } = useCanvasStore()

  const activeElement = useMemo(() => {
    if (!selectedElementId) return null
    return findElementByIdArr(elements, selectedElementId)
  }, [elements, selectedElementId])

  if (!activeElement) return null

  return (
    <div>
      <ElementPropertiesPosition
        bottom={activeElement.style.bottom as string | undefined}
        key={activeElement.id}
        left={activeElement.style.left as string | undefined}
        position={activeElement.style.position as Position | undefined}
        right={activeElement.style.right as string | undefined}
        top={activeElement.style.top as string | undefined}
      />
    </div>
  )
}

export default ElementProperties
