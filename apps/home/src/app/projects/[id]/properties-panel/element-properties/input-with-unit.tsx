import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
} from 'ui'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useInteractionsStore } from '@/stores/interactions-store'
import { useCanvasStore } from '@/stores/canvas-store'

const units = ['px', '%', 'rem', 'em', 'auto'] as const
type Unit = (typeof units)[number]

interface InputWithUnitProps {
  initial: string | undefined
  type: string
  showMeasure?: boolean
  autoValue?: string
}

const InputWithUnit = ({
  initial,
  type,
  showMeasure = false,
  autoValue = 'auto',
}: InputWithUnitProps) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  const [unit, setUnit] = useState<Unit>(() => {
    if (!selectedElementId) return 'px'
    const u = initial?.replace(/[^a-z%]/g, '')
    if (!u || u === autoValue) {
      return 'auto'
    }
    return u as Unit
  })

  const [value, setValue] = useState<number | null>(() => {
    if (!selectedElementId) return null
    if (!initial || initial === autoValue) return null
    const num = Number(initial?.replace(/[^0-9.]/g, '').replace(/^0+/, ''))
    if (Number.isNaN(num)) return null
    return num
  })

  useEffect(() => {
    if (!selectedElementId) return
    if (unit === 'auto')
      return updateElementAttribute(
        selectedElementId,
        'style',
        type,
        autoValue,
        selectedMediaQuery
      )

    updateElementAttribute(
      selectedElementId,
      'style',
      type,
      `${value ?? ''}${unit}`,
      selectedMediaQuery
    )
  }, [
    unit,
    value,
    selectedElementId,
    updateElementAttribute,
    type,
    autoValue,
    selectedMediaQuery,
  ])

  if (!selectedElementId) return null

  return (
    <div className="flex relative">
      <Input
        className={cn({
          '!w-16 col-span-3 mx-auto !text-xs !pr-5': !showMeasure,
          '!rounded-r-none': showMeasure,
        })}
        placeholder="Auto"
        value={value ?? ''}
        onChange={(e) => {
          const inputValue = e.target.value

          const valFormatted = inputValue.replace(/^0+/, '')

          if (inputValue === '0') {
            setValue(0)
            setUnit('px')
            return
          }

          if (!inputValue || !valFormatted) {
            setValue(null)
            setUnit('auto')
            return
          }

          // if it ends with a unit, change the unit
          const lastChar = inputValue[inputValue.length - 1]
          if (lastChar === '%') setUnit('%')
          else if (lastChar === 'p') setUnit('px')
          else if (lastChar === 'e') setUnit('em')
          else if (lastChar === 'r') setUnit('rem')

          const num = Number(valFormatted)
          if (Number.isNaN(num)) return

          if (unit === 'auto') setUnit('px')

          setValue(num)
        }}
      />
      <Select
        value={unit}
        onValueChange={(val: Unit) => {
          setUnit(val)
          if (val === 'auto') {
            setValue(null)
            return
          }

          if (value === null) {
            setValue(0)
          }
        }}>
        <SelectTrigger
          className={cn({
            'absolute right-2 !border-none focus:!ring-0 !w-auto !p-0 !rounded-l-none !text-xs !-ml-px':
              !showMeasure,
            '!rounded-l-none -ml-px !w-[4.5rem] !min-w-[4.5rem] !max-w-[4.5rem]':
              showMeasure,
          })}>
          {showMeasure ? <SelectValue placeholder={unit} /> : null}
        </SelectTrigger>
        <SelectContent>
          {units.map((unitVal) => (
            <SelectItem key={unitVal} value={unitVal}>
              {unitVal}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default InputWithUnit
