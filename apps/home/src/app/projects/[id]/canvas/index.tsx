'use client'
import { useCallback, useEffect, useRef } from 'react'
import Breakpoint from './breakpoint'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const Canvas = () => {
  const { breakpoints, pan, setPan, zoom, setZoom } = useCanvasStore()
  const ref = useRef<HTMLDivElement>(null)
  const { setSelectedElementId } = useInteractionsStore()

  // handle scroll on canvas to pan
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.stopPropagation()
      e.preventDefault()

      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const zoomChange: number = zoom + e.deltaY / 1000
        const zoomVal = Math.min(Math.max(0.1, zoomChange), 5)
        const fixedZoom = parseFloat(zoomVal.toFixed(3))
        setZoom(fixedZoom)
      } else {
        setPan({
          x: pan.x - e.deltaX,
          y: pan.y - e.deltaY,
        })
      }
    },
    [pan.x, pan.y, setPan, setZoom, zoom]
  )

  useEffect(() => {
    if (!ref.current) return

    const canvasRef = ref.current

    canvasRef.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      canvasRef.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel, ref])

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    const target = e.target as HTMLElement | null
    if (!target) return

    const isTargetSelf = target.id === 'canvas'

    if (isTargetSelf) {
      setSelectedElementId(null)
    }
  }

  return (
    <div
      className="select-none relative flex-1 w-full h-full bg-background cursor-all-children !cursor-default outline-none"
      id="canvas"
      ref={ref}
      role="button"
      style={
        {
          '--cursor': 'default',
        } as React.CSSProperties
      }
      tabIndex={-1}
      onClick={handleClick}
      onKeyDown={() => null}>
      {breakpoints.map((breakpoint) => (
        <Breakpoint breakpoint={breakpoint} key={breakpoint.id} />
      ))}
    </div>
  )
}

export default Canvas
