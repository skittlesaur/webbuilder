import { Switch } from 'ui'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const Visible = ({ visibility = 'visible' }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  if (!selectedElementId) return null

  return (
    <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
      <p className="text-gray-400">Visible</p>
      <div className="flex items-center gap-2">
        <Switch
          checked={visibility === 'visible'}
          onCheckedChange={(val) => {
            updateElementAttribute(
              selectedElementId,
              'style',
              'visibility',
              val ? 'visible' : 'hidden',
              selectedMediaQuery
            )
          }}
        />
        <p>{visibility === 'visible' ? 'Visible' : 'Hidden'}</p>
      </div>
    </div>
  )
}

export default Visible
