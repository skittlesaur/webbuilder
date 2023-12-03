import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const flexWraps = {
  'no-wrap': 'No Wrap',
  wrap: 'Wrap',
  'wrap-reverse': 'Wrap Reverse',
}

const FlexWrap = ({ display, flexWrap }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  if (!selectedElementId || !['flex', 'inline-flex'].includes(display))
    return null

  return (
    <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
      <p className="text-gray-400">Wrap</p>
      <Select
        defaultValue={flexWrap || Object.keys(flexWraps)[0]}
        onValueChange={(value) => {
          updateElementAttribute(
            selectedElementId,
            'style',
            'flexWrap',
            value,
            selectedMediaQuery
          )
        }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(flexWraps).map((pos) => (
            <SelectItem key={pos} value={pos}>
              {flexWraps[pos]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FlexWrap
