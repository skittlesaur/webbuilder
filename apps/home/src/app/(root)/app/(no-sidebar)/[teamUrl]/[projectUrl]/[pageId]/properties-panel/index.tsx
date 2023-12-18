'use client'

import cn from 'classnames'
import { stateMapping } from '../state-indicator'
import DefaultProperties from './default-properties'
import ElementProperties from './element-properties'
import { useInteractionsStore } from '@/stores/interactions-store'

const PropertiesPanel = () => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedState = useInteractionsStore((s) => s.selectedState)

  return (
    <div
      className={cn(
        'min-w-[16rem] max-w-[16rem] absolute z-40 right-0 top-0 bottom-0 border-l flex flex-col bg-background text-sm',
        {
          'border-border': selectedState === 'default',
        }
      )}
      id="properties-panel"
      style={{
        borderColor:
          selectedState === 'default'
            ? undefined
            : stateMapping[selectedState].color,
      }}
      onMouseMove={(e) => e.stopPropagation()}>
      {selectedElementId !== 'body' ? (
        <ElementProperties key={selectedElementId} />
      ) : (
        <DefaultProperties />
      )}
    </div>
  )
}

export default PropertiesPanel
