import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

export const displays = {
  block: 'Block',
  inline: 'Inline',
  'inline-block': 'Inline Block',
  flex: 'Flex',
  'inline-flex': 'Inline Flex',
  grid: 'Grid',
  'inline-grid': 'Inline Grid',
  none: 'None',
}

const DisplayType = ({ display }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  if (!selectedElementId) return null

  return (
    <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
      <p className="text-gray-400">Type</p>
      <Select
        defaultValue={display || Object.keys(displays)[0]}
        onValueChange={(value) => {
          updateElementAttribute(
            selectedElementId,
            'style',
            'display',
            value,
            selectedMediaQuery
          )
        }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(displays).map((pos) => (
            <SelectItem key={pos} value={pos}>
              {displays[pos]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default DisplayType
