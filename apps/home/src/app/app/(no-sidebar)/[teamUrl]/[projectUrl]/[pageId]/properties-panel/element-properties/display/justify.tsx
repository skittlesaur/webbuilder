import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const justifyValues = {
  start: 'Start',
  center: 'Center',
  'space-between': 'Space Between',
  'space-around': 'Space Around',
  'space-evenly': 'Space Evenly',
}

const JustifyContent = ({ display, justifyContent }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  if (!selectedElementId || !['flex', 'inline-flex'].includes(display))
    return null

  return (
    <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
      <p className="text-gray-400">Justify</p>
      <Select
        defaultValue={justifyContent || Object.keys(justifyValues)[0]}
        onValueChange={(value) => {
          updateElementAttribute(
            selectedElementId,
            'style',
            'justifyContent',
            value,
            selectedMediaQuery
          )
        }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(justifyValues).map((pos) => (
            <SelectItem key={pos} value={pos}>
              {justifyValues[pos]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default JustifyContent