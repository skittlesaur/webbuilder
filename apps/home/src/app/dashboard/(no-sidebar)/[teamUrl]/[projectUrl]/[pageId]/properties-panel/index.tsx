'use client'

import DefaultProperties from './default-properties'
import ElementProperties from './element-properties'
import { useInteractionsStore } from '@/stores/interactions-store'

const PropertiesPanel = () => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)

  return (
    <div
      className="min-w-[16rem] max-w-[16rem] absolute z-40 right-0 top-0 bottom-0 border-l border-border flex flex-col bg-background text-sm"
      onMouseMove={(e) => e.stopPropagation()}>
      {selectedElementId !== null ? (
        <ElementProperties key={selectedElementId} />
      ) : (
        <DefaultProperties />
      )}
    </div>
  )
}

export default PropertiesPanel
