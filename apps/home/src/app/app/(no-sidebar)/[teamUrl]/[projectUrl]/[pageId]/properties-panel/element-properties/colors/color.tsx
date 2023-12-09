import { useState } from 'react'
import type { Fill } from './fill'
import { ColorFill } from './item'
import FillColorStyles from './color-styles'
import type { Variable } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import rgbToHex from '@/lib/rgb-to-hex'
import RemoveIcon from '@/icons/remove.svg'

const TypographyColor = ({ color }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)
  const variables = useCanvasStore((s) => s.variables)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)

  const getComputedColor = () => {
    const element = document.getElementById(selectedElementId || '')
    const computedStyle = window.getComputedStyle(element as Element)
    const c = computedStyle.color

    const isVariable = c.startsWith('var(--')
    if (isVariable) {
      const variableName = c.replace('var(--', '').replace(')', '')
      const variable = variables.find(
        (v) => v.name.toLowerCase().replace(/ /g, '-') === variableName
      )
      if (variable) {
        return variable
      }
    }

    const colorValues = c
      .replace(/.*\((?<temp1>.*)\)/, '$1')
      .split(', ')
      .map(Number)

    const hex = rgbToHex(colorValues[0], colorValues[1], colorValues[2])

    const opacity = colorValues[3] || 1
    const opacityPercentage = Math.round(opacity * 100)

    return {
      type: 'color' as const,
      value: hex,
      opacity: opacityPercentage,
    }
  }

  const [selectedColor, setSelectedColor] = useState<
    (Fill & { type: 'color' }) | Variable | undefined
  >(() => {
    if (!color) {
      return getComputedColor()
    }

    const isVariable = color.startsWith('var(--')
    if (isVariable) {
      const variableName = color.replace('var(--', '').replace(')', '')
      const variable = variables.find(
        (v) => v.name.toLowerCase().replace(/ /g, '-') === variableName
      )
      if (variable) {
        return variable
      }
    }

    const isColor = color?.startsWith('#')

    if (isColor) {
      const value = color.slice(0, 7)
      const opacity = color.slice(7, 9)
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
    <div className="relative flex flex-col gap-3 px-4 -mx-4">
      <div className="flex items-center justify-between">
        <p>Text</p>
        <FillColorStyles
          setFills={(fills) => {
            setSelectedColor(fills[0])
            if (selectedElementId === null) return

            updateElementAttribute(
              selectedElementId,
              'style',
              'color',
              `var(--${fills[0].name.toLowerCase().replace(/ /g, '-')})`,
              selectedMediaQuery
            )
          }}
        />
      </div>
      {selectedColor && !('name' in selectedColor) ? (
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
          fill={selectedColor}
          onConfirm={(data: Fill & { type: 'color' }) => {
            setSelectedColor(data)
            if (selectedElementId === null) return

            const { value, opacity } = data
            const opacityHex = Math.round((opacity / 100) * 255).toString(16)
            const opacityHexFormatted =
              opacityHex.length === 1 ? `0${opacityHex}` : opacityHex
            const opacityValue = opacity === 100 ? '' : opacityHexFormatted
            const c = `${value}${opacityValue}`

            updateElementAttribute(
              selectedElementId,
              'style',
              'color',
              c,
              selectedMediaQuery
            )
          }}
        />
      ) : null}
      {selectedColor && 'name' in selectedColor ? (
        <div
          className="flex items-center justify-between gap-2"
          key={selectedColor.name}>
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 border rounded-sm border-border"
              style={{
                backgroundColor: `var(--${selectedColor.name
                  .toLowerCase()
                  .replace(/ /g, '-')})`,
              }}
            />
            <p className="text-xs truncate">{selectedColor.name}</p>
          </div>
          <button
            className="p-1 translate-x-1 border border-transparent rounded hover:bg-accent hover:border-border"
            type="button"
            onClick={() => {
              setSelectedColor(getComputedColor())
            }}>
            <RemoveIcon className="w-4 h-4" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default TypographyColor
