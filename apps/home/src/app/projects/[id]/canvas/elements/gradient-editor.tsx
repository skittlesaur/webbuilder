import { memo, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import { toast } from 'sonner'

const GradientEditor = () => {
  const {
    gradientEditor,
    setGradientEditor,
    selectedElementId,
    selectedGradientStep,
    setSelectedGradientStep,
  } = useInteractionsStore()
  const { zoom } = useCanvasStore()
  const [wrapperSize, setWrapperSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const [draggingPointOffset, setDraggingPointOffset] = useState<number | null>(
    null
  )

  const wrapperRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!selectedElementId) return

    const element = document.getElementById(selectedElementId as string)
    if (!element) return

    const { width, height } = element.getBoundingClientRect()
    // this width and height is multiplied by (scale: zoom * 0.2,) in breakpoint.tsx. we need to divide it by that number to get the actual width and height
    setWrapperSize({
      width: width / (zoom * 0.2),
      height: height / (zoom * 0.2),
    })
  }, [selectedElementId, zoom])

  const handlePointOffset = useCallback(
    (e: MouseEvent) => {
      if (draggingPointOffset === null || !gradientEditor) return

      e.preventDefault()
      e.stopPropagation()

      const line = lineRef.current
      if (!line) return

      const { clientX, clientY } = e
      const { left, top, width, height } = line.getBoundingClientRect()

      // calculate the nearest point on the line to the mouse position

      // line x1, y1 (top left)
      const x1 = left
      const y1 = top

      // line x2, y2 (bottom right)
      const x2 = left + width
      const y2 = top + height

      // delta x, y
      const dx = x2 - x1
      const dy = y2 - y1

      // magnitude of delta
      const mag = Math.sqrt(dx * dx + dy * dy)

      // unit vector of delta
      const ux = dx / mag
      const uy = dy / mag

      // dot product of delta and mouse position
      const dot = (clientX - x1) * ux + (clientY - y1) * uy

      // nearest point on the line
      const nx = x1 + dot * ux
      const ny = y1 + dot * uy

      // distance from the top left of the line to the nearest point
      const distance = Math.sqrt((nx - x1) ** 2 + (ny - y1) ** 2)

      // distance as a percentage of the line's length
      const percentage = Math.round((distance / mag) * 100)
      const percentageFixed = 100 - Math.min(Math.max(0, percentage), 100)

      // set the position of the point
      const newGradient = [...gradientEditor.value]
      newGradient[draggingPointOffset].position = percentageFixed

      setGradientEditor({
        ...gradientEditor,
        value: newGradient,
      })
    },
    [draggingPointOffset]
  )

  const handleAddPoint = useCallback((e: React.MouseEvent) => {
    const line = lineRef.current
    if (!line) return

    toast('@todo: Add new point')
  }, [])

  useEffect(() => {
    if (draggingPointOffset === null || !gradientEditor) {
      window.removeEventListener('mousemove', handlePointOffset)
      window.removeEventListener('mouseup', () => setDraggingPointOffset(null))
      return
    }

    window.addEventListener('mousemove', handlePointOffset)
    window.addEventListener('mouseup', () => setDraggingPointOffset(null))

    return () => {
      window.removeEventListener('mousemove', handlePointOffset)
      window.removeEventListener('mouseup', () => setDraggingPointOffset(null))
    }
  }, [draggingPointOffset, handlePointOffset])

  if (!gradientEditor) return null
  if (!wrapperSize) return null

  const { value, degree } = gradientEditor

  return (
    <div
      className="absolute -translate-x-1 -translate-y-1.5 z-50"
      ref={wrapperRef}
      style={{
        width: wrapperSize.width + 3,
        height: wrapperSize.height,
        rotate: `${degree - 90}deg`,
      }}>
      {value?.map((i, index: number) => (
        <button
          className="absolute w-2 h-2 rounded-full border z-[1] !bg-white"
          key={index}
          style={{
            left: `${i.position}%`,
            top: '50%',
          }}
          type="button"
          onClick={() => setSelectedGradientStep(index)}>
          <button
            className={cn('w-5 h-5 border -translate-x-1/2 translate-y-1/2', {
              'border-primary': selectedGradientStep === index,
              'border-white/30': selectedGradientStep !== index,
            })}
            style={{
              backgroundColor: i.color,
            }}
            type="button"
            onClick={() => null}
            onMouseDown={() => {
              setSelectedGradientStep(index)
              setDraggingPointOffset(index)
            }}
          />
        </button>
      ))}
      <div
        className="bg-neutral-300 absolute w-full h-0.5 top-1/2 translate-y-[0.2rem]"
        ref={lineRef}
        role="button"
        tabIndex={-1}
        onClick={handleAddPoint}
        onKeyDown={() => null}
      />
    </div>
  )
}

export default memo(GradientEditor, () => true)
