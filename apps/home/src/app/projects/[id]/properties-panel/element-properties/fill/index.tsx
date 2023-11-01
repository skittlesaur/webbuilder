import { memo, useEffect, useState } from 'react'
import AddFill from './add'
import FillItem from './item'
import { useInteractionsStore } from '@/stores/interactions-store'
import { useCanvasStore } from '@/stores/canvas-store'
import {} from 'sonner'

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
}

export const opacityToHex = (opacity: number) => {
  const hex = Math.round(opacity * 255).toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}

const ElementPropertiesFill = ({ background }: FillProps) => {
  const { selectedElementId, gradientEditor, setGradientEditor } =
    useInteractionsStore()
  const { updateElementAttribute } = useCanvasStore()

  const [fills, setFills] = useState<Fill[]>(() => {
    if (!background) return []

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
    } else {
      setFills((prev: Fill[]) => {
        const newFills = [...prev]
        newFills[index] = data
        return newFills
      })
    }
  }

  useEffect(() => {
    if (colorPicker === null) return setGradientEditor(null)

    if (fills[colorPicker].type === 'gradient')
      setGradientEditor(fills[colorPicker] as Fill & { type: 'gradient' })
  }, [colorPicker, setGradientEditor])

  useEffect(() => {
    if (!selectedElementId) return

    updateElementAttribute(
      selectedElementId,
      'style',
      'background',
      fills
        .filter((fill) => {
          // filter invalid values
          if (fill.type === 'color') {
            return fill.value.length >= 4
          }

          return true
        })
        .map((fill) => {
          if (fill.type === 'color') {
            return `${fill.value}${opacityToHex(fill.opacity / 100)}`
          }
          return gradientToBackground(fill.value, fill.degree)
        })
        .join(', ')
    )
  }, [fills, selectedElementId, updateElementAttribute])

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

  return (
    <div className="p-4 border-b border-border flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-medium">Fill</p>
        <AddFill
          shouldAlert={
            fills.length >= 1 && fills.some((i) => i.type === 'color')
          }
          onAddClick={onAddClick}
        />
      </div>
      {fills.length >= 1 && (
        <div className="relative flex flex-col gap-3">
          {fills.map((fill, index) => (
            <FillItem
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
    </div>
  )
}

export default memo(ElementPropertiesFill, () => true)
