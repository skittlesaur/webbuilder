import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useInteractionsStore } from '@/stores/interactions-store'
import { useCanvasStore } from '@/stores/canvas-store'

const GradientEditor = ({ breakpointId, mediaQuery }) => {
  const gradientEditor = useInteractionsStore((s) => s.gradientEditor)
  const selectedGradientStep = useInteractionsStore(
    (s) => s.selectedGradientStep
  )
  const setSelectedGradientStep = useInteractionsStore(
    (s) => s.setSelectedGradientStep
  )
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const zoom = useCanvasStore((s) => s.zoom)
  const [style, setStyle] = useState<CSSProperties>({})
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)

  const { degree, value } = gradientEditor || {}

  useEffect(() => {
    const handler = () => {
      if (degree === undefined || !value?.length) return

      const breakpoint = document.querySelector(`#${breakpointId}`)

      if (!breakpoint) return

      const element = breakpoint.querySelector(`#${selectedElementId}`)

      if (!element) return

      const breakpointRect = breakpoint.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()

      const elementSize = {
        width: elementRect.width / (zoom * 0.2),
        height: elementRect.height / (zoom * 0.2),
      }

      const relativePosition = {
        x: (elementRect.x - breakpointRect.x) / (zoom * 0.2),
        y: (elementRect.y - breakpointRect.y) / (zoom * 0.2),
      }

      setStyle({
        width: elementSize.width,
        height: elementSize.height,
        top: relativePosition.y,
        left: relativePosition.x,
      })
    }

    handler()
  }, [breakpointId, degree, selectedElementId, value, zoom])

  if (!gradientEditor || !selectedElementId || !value?.length) return null
  if (selectedMediaQuery !== mediaQuery)
    return null

  const sortedValues = [...value].sort((a, b) => a.position - b.position)

  return (
    <div className="absolute z-50" style={style}>
      <div
        className="relative w-full h-full -translate-y-2"
        style={{
          rotate: `${degree}deg`,
        }}>
        <div
          className="absolute w-0.5 -translate-x-1/2 bg-white drop-shadow-md left-1/2"
          style={{
            top: `${sortedValues[0].position}%`,
            height: `${
              sortedValues[sortedValues.length - 1].position -
              sortedValues[0].position
            }%`,
          }}
        />
        {sortedValues.map((fill, i) => (
          <button
            className={cn(
              'absolute w-4 h-4 -translate-x-1/2 rounded-full left-1/2 drop-shadow-md',
              {
                'border border-white': i !== selectedGradientStep,
                'border-2 border-primary': i === selectedGradientStep,
              }
            )}
            key={i}
            style={{
              backgroundColor: fill.color,
              top: `${100 - fill.position}%`,
              opacity: fill.opacity,
            }}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedGradientStep(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default GradientEditor
