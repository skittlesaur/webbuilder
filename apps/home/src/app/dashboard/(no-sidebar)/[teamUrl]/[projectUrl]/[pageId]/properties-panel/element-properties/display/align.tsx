import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const alignValues = {
  start: 'Start',
  center: 'Center',
  end: 'End',
  stretch: 'Stretch'
}

const AlignItems = ({ display, alignItems }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  if (!selectedElementId || !['flex', 'inline-flex'].includes(display))
    return null

  return (
    <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
      <p className="text-gray-400">Align</p>
      <Select
        defaultValue={alignItems || Object.keys(alignValues)[0]}
        onValueChange={(value) => {
          updateElementAttribute(
            selectedElementId,
            'style',
            'alignItems',
            value,
            selectedMediaQuery
          )
        }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(alignValues).map((pos) => (
            <SelectItem key={pos} value={pos}>
              {alignValues[pos]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default AlignItems
