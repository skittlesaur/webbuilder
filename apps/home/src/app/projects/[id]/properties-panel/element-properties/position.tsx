import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import InputWithUnit from './input-with-unit'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const positions = {
  absolute: 'Absolute',
  relative: 'Relative',
  sticky: 'Sticky',
  fixed: 'Fixed',
}

export type Position = keyof typeof positions

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
    <div className="p-4 border-b border-border flex flex-col gap-4">
      <p className="font-medium">Position</p>
      <div className="flex flex-col gap-3">
        {['absolute', 'fixed'].includes(position) && (
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-3 flex items-center justify-center">
              <InputWithUnit initial={top} type="top" />
            </div>
            <InputWithUnit initial={left} type="left" />
            <div />
            <InputWithUnit initial={right} type="right" />
            <div className="col-span-3 flex items-center justify-center">
              <InputWithUnit initial={bottom} type="bottom" />
            </div>
          </div>
        )}
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
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
          <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
            <p className="text-gray-400">Top</p>
            <InputWithUnit showMeasure initial={top} type="top" />
          </div>
        )}
      </div>
    </div>
  )
}

export default ElementPropertiesPosition
