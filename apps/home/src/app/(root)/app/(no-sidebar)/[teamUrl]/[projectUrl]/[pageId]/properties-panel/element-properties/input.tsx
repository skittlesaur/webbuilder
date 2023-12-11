import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from 'ui'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const INPUT_TYPES = [
  {
    value: 'text',
    label: 'Text',
  },
  {
    value: 'url',
    label: 'URL',
  },
  {
    value: 'email',
    label: 'Email',
  },
  {
    value: 'tel',
    label: 'Telephone',
  },
  {
    value: 'file',
    label: 'File',
  },
  {
    value: 'search',
    label: 'Search',
  },
  {
    value: 'password',
    label: 'Password',
  },
  {
    value: 'number',
    label: 'Number',
  },
  {
    value: 'date',
    label: 'Date',
  },
  {
    value: 'time',
    label: 'Time',
  },
  {
    value: 'week',
    label: 'Week',
  },
  {
    value: 'month',
    label: 'Month',
  },
  {
    value: 'datetime-local',
    label: 'Datetime',
  },
]

const InputAttributes = ({ disabled, placeholder, type, isInput }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  if (!isInput) return null

  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border">
      <p className="font-medium">Input</p>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
          <p className="text-gray-400">Type</p>
          <Select
            defaultValue={type || 'text'}
            onValueChange={(value) => {
              if (selectedElementId === null) return
              updateElementAttribute(
                selectedElementId,
                'attributes',
                'type',
                value || null,
                null
              )
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Open in" />
            </SelectTrigger>
            <SelectContent>
              {INPUT_TYPES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
          <p className="text-gray-400 truncate">Placeholder</p>
          <Input
            defaultValue={placeholder}
            placeholder="Placeholder"
            onChange={(e) => {
              const value = e.target.value
              if (selectedElementId === null) return
              updateElementAttribute(
                selectedElementId,
                'attributes',
                'placeholder',
                value || null,
                null
              )
            }}
          />
        </div>
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
          <p className="text-gray-400">Disabled</p>
          <Switch
            checked={disabled}
            onCheckedChange={(val) => {
              if (selectedElementId === null) return
              updateElementAttribute(
                selectedElementId,
                'style',
                'disabled',
                val,
                null
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default InputAttributes
