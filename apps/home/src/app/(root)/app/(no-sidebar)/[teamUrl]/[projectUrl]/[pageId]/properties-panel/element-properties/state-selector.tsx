import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import { useInteractionsStore } from '@/stores/interactions-store'
import type { ElementStyle } from '@/stores/canvas-store'

const states: { value: keyof ElementStyle; label: string }[] = [
  {
    value: 'default',
    label: 'Default',
  },
  {
    value: 'hover',
    label: 'On Mouse Hover',
  },
  {
    value: 'focus',
    label: 'When Focused',
  },
  {
    value: 'active',
    label: 'When Active',
  },
  {
    value: 'disabled',
    label: 'Disabled',
  },
]

const StateSelector = () => {
  const selectedState = useInteractionsStore((s) => s.selectedState)
  const setSelectedState = useInteractionsStore((s) => s.setSelectedState)

  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border">
      <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
        <p className="text-gray-400">State</p>
        <Select
          defaultValue={selectedState}
          onValueChange={(value) => {
            setSelectedState(value as keyof ElementStyle)
          }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default StateSelector
