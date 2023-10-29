import { useState } from 'react'
import { Input } from 'ui'
import { ChromePicker } from 'react-color'
import { opacityToHex, type Fill } from '.'
import RemoveIcon from '@/icons/remove.svg'

const ColorFill = ({
  fill,
  onConfirm,
  colorPickerClick,
  colorPickerOpen,
}: {
  fill: Fill & { type: 'color' }
  onConfirm: (data: Fill) => void
  colorPickerClick: () => void
  colorPickerOpen: boolean
}) => {
  const [color, setColor] = useState<string>(fill.value)
  const [opacity, setOpacity] = useState<number>(fill.opacity)

  return (
    <>
      <div className="relative flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <button
            className="w-5 h-5 rounded-sm border border-border"
            style={{
              background: `${fill.value}${opacityToHex(fill.opacity / 100)}`,
            }}
            type="button"
            onClick={colorPickerClick}
          />
          <div className="flex">
            <Input
              className="uppercase !p-1 !text-xs !h-6 !w-24 !rounded-r-none"
              value={color}
              onBlur={() => {
                const colorValue = color.startsWith('#')
                  ? color.substring(0, 7)
                  : `#${color.substring(0, 6)}`

                const isValidColor = /^#(?<check>[0-9A-F]{3}){1,2}$/i.test(
                  colorValue
                )

                if (!isValidColor) return setColor(fill.value)

                onConfirm({
                  ...fill,
                  value: colorValue,
                })
              }}
              onChange={(e) => {
                setColor(e.target.value)
              }}
              onKeyDown={(e) => {
                const isEnter = e.key === 'Enter'
                if (!isEnter) return

                const target = e.target as HTMLInputElement
                target.blur()
              }}
            />
            <div className="relative -ml-px">
              <Input
                className="!p-1 !text-xs !h-6 pr-2 !w-12 !rounded-l-none"
                value={opacity}
                onBlur={() => {
                  onConfirm({
                    ...fill,
                    opacity,
                  })
                }}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (isNaN(value)) return

                  setOpacity(value)
                }}
                onKeyDown={(e) => {
                  const isEnter = e.key === 'Enter'
                  if (!isEnter) return

                  const target = e.target as HTMLInputElement
                  target.blur()
                }}
              />
              <p className="select-none pointer-events-none absolute right-2 leading-[0] top-1/2 -translate-y-1/2 text-xs text-gray-400">
                %
              </p>
            </div>
          </div>
        </div>
        <button
          className="select-none rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          type="button"
          onClick={() => {
            //
          }}>
          <RemoveIcon className="w-4 h-4" />
        </button>
      </div>
      {colorPickerOpen ? (
        <div className="select-none absolute right-full top-0 -translate-x-4 -translate-y-1/2">
          <ChromePicker
            color={`${fill.value}${opacityToHex(fill.opacity / 100)}`}
            onChange={(c: { hex: string; rgb: { a: number } }) => {
              const hex = c.hex
              const alpha = c.rgb.a * 100

              setColor(hex)
              setOpacity(alpha)

              onConfirm({
                ...fill,
                value: hex,
                opacity: alpha,
              })
            }}
          />
        </div>
      ) : null}
    </>
  )
}

const FillItem = ({
  fill,
  onConfirm,
  colorPickerClick,
  colorPickerOpen,
}: {
  fill: Fill
  onConfirm: (data: Fill) => void
  colorPickerClick: () => void
  colorPickerOpen: boolean
}) => {
  if (fill.type === 'color')
    return (
      <ColorFill
        colorPickerClick={colorPickerClick}
        colorPickerOpen={colorPickerOpen}
        fill={fill}
        onConfirm={onConfirm}
      />
    )

  return null
}

export default FillItem
