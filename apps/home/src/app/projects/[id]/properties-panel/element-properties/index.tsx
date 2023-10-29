import { Fragment, useMemo } from 'react'
import type { Position } from './position'
import ElementPropertiesPosition from './position'
import ElementPropertiesSize from './size'
import ElementPropertiesFill from './fill'
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
    <Fragment key={selectedElementId}>
      <ElementPropertiesPosition
        bottom={activeElement.style.bottom as string | undefined}
        left={activeElement.style.left as string | undefined}
        position={activeElement.style.position as Position | undefined}
        right={activeElement.style.right as string | undefined}
        top={activeElement.style.top as string | undefined}
      />
      <ElementPropertiesSize
        height={activeElement.style.height as string | undefined}
        maxHeight={activeElement.style.maxHeight as string | undefined}
        maxWidth={activeElement.style.maxWidth as string | undefined}
        minHeight={activeElement.style.minHeight as string | undefined}
        minWidth={activeElement.style.minWidth as string | undefined}
        width={activeElement.style.width as string | undefined}
      />
      <ElementPropertiesFill
        background={activeElement.style.background as string | undefined}
      />
    </Fragment>
  )
}

export default ElementProperties
