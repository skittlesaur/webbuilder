import { memo, useEffect, useState } from 'react'
import FillItem from '../item'
import FillColorStyles from '../color-styles'
import AddFill from './add'
import { useInteractionsStore } from '@/stores/interactions-store'
import type { Variable } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import RemoveIcon from '@/icons/remove.svg'

export const DEFAULT_COLOR: Fill = {
  type: 'color',
  value: '#FFFFFF',
  opacity: 100,
}

export const DEFAULT_GRADIENT: Fill = {
  type: 'gradient',
  value: [
    {
      color: '#FFFFFF',
      position: 0,
      opacity: 100,
    },
    {
      color: '#000000',
      position: 100,
      opacity: 100,
    },
  ],
  degree: 0,
}

export const gradientToBackground = (
  gradient: GradientValue[],
  degree: number
) => {
  return `linear-gradient(${degree}deg, ${gradient
    .map((i) => `${i.color}${opacityToHex(i.opacity / 100)} ${i.position}%`)
    .join(', ')})`
}

interface GradientValue {
  color: string
  position: number
  opacity: number
}

export type Fill =
  | {
      type: 'color'
      value: string
      opacity: number
    }
  | {
      type: 'gradient'
      value: GradientValue[]
      degree: number
    }

interface FillProps {
  background?: string
  isBody?: boolean
}

export const opacityToHex = (opacity: number) => {
  const hex = Math.round(opacity * 255).toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}

const ElementPropertiesFill = ({ background, isBody }: FillProps) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const gradientEditor = useInteractionsStore((s) => s.gradientEditor)
  const setGradientEditor = useInteractionsStore((s) => s.setGradientEditor)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)
  const variables = useCanvasStore((s) => s.variables)
  const updateBodyStyle = useCanvasStore((s) => s.updateBodyStyle)
  const selectedState = useInteractionsStore((s) => s.selectedState)

  const [fills, setFills] = useState<(Fill | Variable)[]>(() => {
    if (!background)
      return !isBody
        ? []
        : [
            {
              type: 'color',
              value: '#FFFFFF',
              opacity: 100,
            },
          ]

    const isVariable = background?.startsWith('var(--')

    if (isVariable) {
      const variableName = background.replace('var(--', '').replace(')', '')
      const variable = variables.find(
        (v) => v.name.toLowerCase().replace(/ /g, '-') === variableName
      )
      if (variable) {
        return [variable]
      }
    }

    const isColor = background?.startsWith('#')
    if (isColor) {
      const value = background.slice(0, 7)
      const opacity = background.slice(7, 9)
      const opacityPercentage = Math.round((parseInt(opacity, 16) / 255) * 100)
      return [
        {
          type: 'color',
          value,
          opacity: opacityPercentage,
        },
      ]
    }

    const isGradient = background?.startsWith('linear-gradient')

    if (!isGradient) return []

    // linear-gradient(0deg, rgba(255, 0, 0, 0.32) 9.84456%, rgb(166, 33, 33) 84.456%), linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(255, 255, 255) 67.3575%)
    // split into array of gradients
    const gradients = background.split('), linear-gradient(').map((i) => {
      const isLast = i.endsWith(')')
      let val = i
      if (isLast) val = val.slice(0, -1)
      val = val.replace('linear-gradient(', '')

      const gradientDegree = val.replace(
        /(?<degree>.*)deg, (?<colors>.*)/,
        '$1'
      )
      const gradientColors = val.replace(
        /(?<degree>.*)deg, (?<colors>.*)/,
        '$2'
      )
      const gradientColorsArr = gradientColors.split(', ')

      const colorsWithPositions = gradientColorsArr.map((color) => {
        const colorValue = color.slice(0, 7)
        const opacity = color.slice(7, 9)
        const opacityPercentage = Math.round(
          (parseInt(opacity, 16) / 255) * 100
        )
        const position = color.slice(10, 13)
        return {
          color: colorValue,
          opacity: opacityPercentage,
          position: parseInt(position),
        }
      })

      return {
        type: 'gradient',
        value: colorsWithPositions,
        degree: parseInt(gradientDegree),
      }
    })

    return gradients as Fill[]
  })
  const [colorPicker, setColorPicker] = useState<number | null>(null)

  const onAddClick = () => {
    if (fills.length === 0) {
      return setFills([DEFAULT_COLOR])
    }

    setFills((prev: Fill[]) => {
      const prevWithoutColors = prev.filter((fill) => fill.type !== 'color')

      return [...prevWithoutColors, DEFAULT_GRADIENT]
    })
  }

  const onConfirm = (data: Fill, index: number) => {
    if (data.type === 'gradient') {
      setGradientEditor(data)
    }
    setFills((prev: Fill[]) => {
      const newFills = [...prev]
      newFills[index] = data
      return newFills
    })
  }

  useEffect(() => {
    if (colorPicker === null) return setGradientEditor(null)

    if (fills[colorPicker].type === 'gradient')
      setGradientEditor(fills[colorPicker] as Fill & { type: 'gradient' })
  }, [colorPicker, setGradientEditor])

  useEffect(() => {
    if (isBody) {
      if (!fills.length)
        return updateBodyStyle('background', undefined, selectedMediaQuery)
      if (fills.length === 1 && 'name' in fills[0])
        return updateBodyStyle(
          'background',
          `var(--${fills[0].name.toLowerCase().replace(/ /g, '-')})`,
          selectedMediaQuery
        )

      return updateBodyStyle(
        'background',
        fills
          .filter((fill) => {
            const isVariable = 'name' in fill
            if (isVariable) return true

            // filter invalid values
            if (fill.type === 'color') {
              return fill.value.length >= 4
            }

            return true
          })
          .map((fill) => {
            const isVariable = 'name' in fill
            if (isVariable) {
              return `var(--${fill.name.toLowerCase().replace(/ /g, '-')})`
            }

            if (fill.type === 'color') {
              return `${fill.value}${opacityToHex(fill.opacity / 100)}`
            }
            return gradientToBackground(fill.value, fill.degree)
          })
          .join(', '),
        selectedMediaQuery
      )
    }

    if (!selectedElementId) return

    if (!fills.length) {
      updateElementAttribute(
        selectedElementId,
        'style',
        'background',
        undefined,
        selectedMediaQuery,
        selectedState
      )

      return
    }

    updateElementAttribute(
      selectedElementId,
      'style',
      'background',
      fills
        .filter((fill) => {
          const isVariable = 'name' in fill
          if (isVariable) return true

          // filter invalid values
          if (fill.type === 'color') {
            return fill.value.length >= 4
          }

          return true
        })
        .map((fill) => {
          const isVariable = 'name' in fill
          if (isVariable) {
            return `var(--${fill.name.toLowerCase().replace(/ /g, '-')})`
          }

          if (fill.type === 'color') {
            return `${fill.value}${opacityToHex(fill.opacity / 100)}`
          }
          return gradientToBackground(fill.value, fill.degree)
        })
        .join(', '),
      selectedMediaQuery,
      selectedState
    )
  }, [
    fills,
    isBody,
    selectedElementId,
    selectedMediaQuery,
    selectedState,
    updateBodyStyle,
    updateElementAttribute,
  ])

  useEffect(() => {
    if (colorPicker === null || !gradientEditor) return
    if (typeof fills[colorPicker].value === 'string') return

    const { value } = gradientEditor

    setFills((prev: Fill[]) => {
      const newFills = [...prev]
      newFills[colorPicker] = {
        type: 'gradient',
        value,
        degree: gradientEditor.degree,
      }

      return newFills
    })
  }, [gradientEditor])

  const variableFills = fills.filter((fill) => 'name' in fill) as Variable[]
  const colorFills = fills.filter((fill) => !('name' in fill)) as Fill[]

  return (
    <>
      <div className="flex items-center justify-between">
        <p>Fill</p>
        <div className="flex flex-row-reverse items-center gap-1">
          <AddFill
            shouldAlert={
              fills.length >= 1 && fills.some((i) => i.type === 'color')
            }
            onAddClick={onAddClick}
          />
          <FillColorStyles setFills={setFills} />
        </div>
      </div>
      {colorFills.length >= 1 && (
        <div className="relative flex flex-col gap-3">
          {colorFills.map((fill, index) => (
            <FillItem
              closeColorPicker={() => setColorPicker(null)}
              colorPickerClick={() => {
                setColorPicker((prev) => {
                  if (prev === index) return null
                  return index
                })
              }}
              colorPickerOpen={colorPicker === index}
              fill={fill}
              key={index}
              onConfirm={(data: Fill) => onConfirm(data, index)}
            />
          ))}
        </div>
      )}
      {variableFills.length >= 1 && (
        <div className="relative flex flex-col gap-3">
          {variableFills.map((fill) => (
            <div
              className="flex items-center justify-between gap-2"
              key={fill.name}>
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 border rounded-sm border-border"
                  style={{
                    backgroundColor: `var(--${fill.name
                      .toLowerCase()
                      .replace(/ /g, '-')})`,
                  }}
                />
                <p className="text-xs truncate">{fill.name}</p>
              </div>
              <button
                className="p-1 translate-x-1 border border-transparent rounded hover:bg-accent hover:border-border"
                type="button"
                onClick={() => {
                  setFills((prev) => {
                    const newFills = prev.filter((i) => i !== fill)
                    if (isBody && newFills.length === 0)
                      return [
                        {
                          type: 'color',
                          value: '#FFFFFF',
                          opacity: 100,
                        },
                      ]

                    return newFills
                  })
                }}>
                <RemoveIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default memo(ElementPropertiesFill, (prev, next) => {
  return prev.isBody === next.isBody
})
