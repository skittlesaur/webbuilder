'use client'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import Breakpoint from './breakpoint'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const Canvas = () => {
  const breakpoints = useCanvasStore((s) => s.breakpoints)
  const pan = useCanvasStore((s) => s.pan)
  const setPan = useCanvasStore((s) => s.setPan)
  const zoom = useCanvasStore((s) => s.zoom)
  const setZoom = useCanvasStore((s) => s.setZoom)
  const removeElement = useCanvasStore((s) => s.removeElement)

  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )
  const setHoveredElementId = useInteractionsStore((s) => s.setHoveredElementId)

  const ref = useRef<HTMLDivElement>(null)

  // handle scroll on canvas to pan
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.stopPropagation()
      e.preventDefault()

      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const zoomChange: number = zoom + e.deltaY / 1000
        const zoomVal = Math.min(Math.max(0.1, zoomChange), 8)
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

  const handleElementDelete = useCallback(
    (e: KeyboardEvent) => {
      const isDelete = e.key === 'Delete' || e.key === 'Backspace'
      if (!isDelete) return

      const target = e.target as HTMLElement | null

      if (['input', 'textarea'].includes(target?.tagName.toLowerCase() ?? ''))
        return
      if (!selectedElementId || selectedElementId === 'root') return

      const element = document.getElementById(selectedElementId as string)
      if (!element) return

      // check if the element is an input that is focused
      const isInputFocused = element.querySelector('input:focus')
      if (isInputFocused) return

      // check if the element is a textarea that is focused
      const isTextareaFocused = element.querySelector('textarea:focus')
      if (isTextareaFocused) return

      // check if the element is a contenteditable that is focused
      const isContentEditableFocused = element.querySelector(
        '[contenteditable]:focus'
      )
      if (isContentEditableFocused) return

      setSelectedElementId(null)
      setHoveredElementId(null)
      removeElement(selectedElementId)
      toast.success('Element deleted')
    },
    [
      removeElement,
      selectedElementId,
      setHoveredElementId,
      setSelectedElementId,
    ]
  )

  useEffect(() => {
    if (!selectedElementId) return

    window.addEventListener('keydown', handleElementDelete)

    return () => {
      window.removeEventListener('keydown', handleElementDelete)
    }
  }, [handleElementDelete, selectedElementId])

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