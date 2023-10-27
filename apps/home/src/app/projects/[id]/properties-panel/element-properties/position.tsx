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
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const positions = {
  absolute: 'Absolute',
  relative: 'Relative',
  sticky: 'Sticky',
  fixed: 'Fixed',
}

export type Position = keyof typeof positions

const units = ['px', '%', 'rem', 'em', 'auto'] as const
type Unit = (typeof units)[number]

interface InputWithUnitProps {
  initial: string
  placeholder: string
  type: 'top' | 'left' | 'bottom' | 'right'
  showMeasure?: boolean
}

const InputWithUnit = ({
  initial,
  placeholder,
  type,
  showMeasure = false,
}: InputWithUnitProps) => {
  const { selectedElementId } = useInteractionsStore()
  const { updateElementAttribute } = useCanvasStore()

  const [unit, setUnit] = useState<Unit>(() => {
    if (!selectedElementId) return 'px'
    const u = initial.replace(/[^a-z%]/g, '')
    if (!u) return 'auto'
    return u as Unit
  })

  const [value, setValue] = useState<number | null>(() => {
    if (!selectedElementId) return null
    if (initial === 'auto') return null
    const num = Number(initial.replace(/[^0-9.]/g, '').replace(/^0+/, ''))
    if (Number.isNaN(num)) return null
    return num
  })

  useEffect(() => {
    if (!selectedElementId) return
    if (unit === 'auto')
      return updateElementAttribute(selectedElementId, 'style', type, 'auto')

    updateElementAttribute(
      selectedElementId,
      'style',
      type,
      `${value ?? ''}${unit}`
    )
  }, [selectedElementId, type, unit, updateElementAttribute, value])

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
          const valFormatted = e.target.value.replace(/^0+/, '')

          if (!valFormatted) {
            setValue(null)
            setUnit('auto')
            return
          }

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
            '!rounded-l-none -ml-px !w-20': showMeasure,
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

const ElementPropertiesPosition = ({
  position = 'relative',
  top = '0px',
  left = '0px',
  bottom = '0px',
  right = '0px',
}: {
  position?: Position
  top?: string
  left?: string
  bottom?: string
  right?: string
}) => {
  const { updateElementAttribute } = useCanvasStore()
  const { selectedElementId } = useInteractionsStore()

  if (!selectedElementId) return null

  return (
    <div className="p-4 border-b border-border flex flex-col gap-2">
      <p className="font-medium">Position</p>
      <div className="flex flex-col gap-4">
        {['absolute', 'fixed'].includes(position) && (
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-3 flex items-center justify-center">
              <InputWithUnit initial={top} placeholder="Top" type="top" />
            </div>
            <InputWithUnit initial={left} placeholder="Left" type="left" />
            <div />
            <InputWithUnit initial={right} placeholder="Right" type="right" />
            <div className="col-span-3 flex items-center justify-center">
              <InputWithUnit
                initial={bottom}
                placeholder="Bottom"
                type="bottom"
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-[0.5fr_1fr] items-center">
          <p className="text-gray-400">Type</p>
          <Select
            defaultValue={position}
            onValueChange={(value) => {
              updateElementAttribute(
                selectedElementId,
                'style',
                'position',
                value
              )

              // Reset position values
              ;['top', 'left', 'bottom', 'right'].forEach((type) => {
                updateElementAttribute(selectedElementId, 'style', type, 'auto')
              })
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(positions).map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {positions[pos]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {position === 'sticky' && (
          <div className="grid grid-cols-[0.5fr_1fr] items-center">
            <p className="text-gray-400">Top</p>
            <InputWithUnit
              showMeasure
              initial={top}
              placeholder="Top"
              type="top"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ElementPropertiesPosition
