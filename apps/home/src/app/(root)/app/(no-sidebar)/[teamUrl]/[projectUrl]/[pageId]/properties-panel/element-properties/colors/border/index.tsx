import { useState } from 'react'
import FillColorStyles from '../color-styles'
import type { Fill } from '../fill'
import { ColorFill } from '../item'
import InputWithUnit from '../../input-with-unit'
import AddIcon from '@/icons/add.svg'
import RemoveIcon from '@/icons/remove.svg'
import { useCanvasStore, type Variable } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const DEFAULT_BORDER = {
  type: 'color' as const,
  value: '#000000',
  opacity: 100,
}

const ElementPropertiesBorder = ({ borderColor, borderWidth }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)
  const variables = useCanvasStore((s) => s.variables)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const selectedState = useInteractionsStore((s) => s.selectedState)

  const [border, setBorder] = useState<
    (Fill & { type: 'color' }) | Variable | undefined
  >(() => {
    if (!borderColor) return undefined

    const isVariable = borderColor.startsWith('var(--')
    if (isVariable) {
      const variableName = borderColor.replace('var(--', '').replace(')', '')
      const variable = variables.find(
        (v) => v.name.toLowerCase().replace(/ /g, '-') === variableName
      )
      if (variable) {
        return variable
      }
    }

    const isColor = borderColor?.startsWith('#')

    if (isColor) {
      const value = borderColor.slice(0, 7)
      const opacity = borderColor.slice(7, 9)
      const opacityPercentage = Math.round(
        (parseInt(opacity || 'ff', 16) / 255) * 100
      )
      return {
        type: 'color',
        value,
        opacity: opacityPercentage,
      }
    }

    return undefined
  })
  const [colorPicker, setColorPicker] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <p>Border</p>
        <div className="flex flex-row-reverse items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setBorder((prev) => {
                if (prev) return undefined
                return DEFAULT_BORDER
              })
            }}>
            {border ? (
              <RemoveIcon className="w-4 h-4" />
            ) : (
              <AddIcon className="w-4 h-4" />
            )}
          </button>
          <FillColorStyles
            setFills={(fills) => {
              setBorder(fills[0])
            }}
          />
        </div>
      </div>
      {border ? (
        <>
          <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
            <p className="text-gray-400">Width</p>
            <InputWithUnit
              showMeasure
              autoValue="0px"
              initial={borderWidth || '1px'}
              type="borderWidth"
            />
          </div>
          <p className="text-gray-400">Color</p>
        </>
      ) : null}
      {border && !('name' in border) ? (
        <ColorFill
          hideGradient
          closeColorPicker={() => {
            setColorPicker(false)
          }}
          colorPickerClick={() => {
            setColorPicker((prev) => {
              return !prev
            })
          }}
          colorPickerOpen={colorPicker}
          fill={border}
          onConfirm={(data: Fill & { type: 'color' }) => {
            setBorder(data)
            if (selectedElementId === null) return

            const { value, opacity } = data
            const opacityHex = Math.round((opacity / 100) * 255).toString(16)
            const opacityHexFormatted =
              opacityHex.length === 1 ? `0${opacityHex}` : opacityHex
            const opacityValue = opacity === 100 ? '' : opacityHexFormatted
            const color = `${value}${opacityValue}`

            updateElementAttribute(
              selectedElementId,
              'style',
              'borderColor',
              color,
              selectedMediaQuery,
              selectedState
            )
          }}
        />
      ) : null}
      {border && 'name' in border ? (
        <div
          className="flex items-center justify-between gap-2"
          key={border.name}>
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 border rounded-sm border-border"
              style={{
                backgroundColor: `var(--${border.name
                  .toLowerCase()
                  .replace(/ /g, '-')})`,
              }}
            />
            <p className="text-xs truncate">{border.name}</p>
          </div>
          <button
            className="p-1 translate-x-1 border border-transparent rounded hover:bg-accent hover:border-border"
            type="button"
            onClick={() => {
              setBorder(undefined)
            }}>
            <RemoveIcon className="w-4 h-4" />
          </button>
        </div>
      ) : null}
    </>
  )
}

export default ElementPropertiesBorder
