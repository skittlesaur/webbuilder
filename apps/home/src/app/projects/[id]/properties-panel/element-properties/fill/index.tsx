import { useEffect, useState } from 'react'
import AddFill from './add'
import FillItem from './item'
import { useInteractionsStore } from '@/stores/interactions-store'
import { useCanvasStore } from '@/stores/canvas-store'

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
      opacity: number
    }

interface FillProps {
  background?: string
}

export const opacityToHex = (opacity: number) => {
  const hex = Math.round(opacity * 255).toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}

const ElementPropertiesFill = ({ background }: FillProps) => {
  const { selectedElementId } = useInteractionsStore()
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

    return []
  })
  const [colorPicker, setColorPicker] = useState<number | null>(null)

  const onAddClick = () => {
    if (fills.length === 0) {
      return setFills([
        {
          type: 'color',
          value: '#FFFFFF',
          opacity: 100,
        },
      ])
    }

    setFills((prev: Fill[]) => {
      const newFill: Fill = {
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
        opacity: 100,
      }

      const prevWithoutColors = prev.filter((fill) => fill.type !== 'color')

      return [...prevWithoutColors, newFill]
    })
  }

  const onConfirm = (data: Fill, index: number) => {
    setFills((prev: Fill[]) => {
      const newFills = [...prev]
      newFills[index] = data
      return newFills
    })
  }

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
          return fill.value
        })
        .join(', ')
    )
  }, [fills, selectedElementId, updateElementAttribute])

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

export default ElementPropertiesFill
