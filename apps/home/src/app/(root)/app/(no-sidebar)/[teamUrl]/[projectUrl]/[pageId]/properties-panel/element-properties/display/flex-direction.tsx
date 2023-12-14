import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const flexDirections = {
  row: 'Row',
  'row-reverse': 'Row Reverse',
  column: 'Column',
  'column-reverse': 'Column Reverse',
}

const FlexDirection = ({ isBody, display, flexDirection }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)
  const updateBodyStyle = useCanvasStore((s) => s.updateBodyStyle)
  const selectedState = useInteractionsStore((s) => s.selectedState)

  if (
    (!isBody && !selectedElementId) ||
    !['flex', 'inline-flex'].includes(display)
  )
    return null

  return (
    <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
      <p className="text-gray-400">Direction</p>
      <Select
        defaultValue={flexDirection || Object.keys(flexDirections)[0]}
        onValueChange={(value) => {
          if (isBody) {
            updateBodyStyle('flexDirection', value, selectedMediaQuery)
          } else {
            updateElementAttribute(
              selectedElementId,
              'style',
              'flexDirection',
              value,
              selectedMediaQuery,
              selectedState
            )
          }
        }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(flexDirections).map((pos) => (
            <SelectItem key={pos} value={pos}>
              {flexDirections[pos]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FlexDirection
