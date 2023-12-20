'use client'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Offline } from 'react-detect-offline'
import { stateMapping } from '../state-indicator'
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
  const selectedState = useInteractionsStore((s) => s.selectedState)

  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )
  const setHoveredElementId = useInteractionsStore((s) => s.setHoveredElementId)
  const setSelectedState = useInteractionsStore((s) => s.setSelectedState)
  const tool = useInteractionsStore((s) => s.tool)

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
      setSelectedState('default')
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
      setSelectedState('default')
      setHoveredElementId(null)
      removeElement(selectedElementId)
      toast.success('Element deleted')
    },
    [
      removeElement,
      selectedElementId,
      setHoveredElementId,
      setSelectedElementId,
      setSelectedState,
    ]
  )

  useEffect(() => {
    if (!selectedElementId) return

    window.addEventListener('keydown', handleElementDelete)

    return () => {
      window.removeEventListener('keydown', handleElementDelete)
    }
  }, [handleElementDelete, selectedElementId])

  useEffect(() => {
    const curr = ref.current
    if (!curr) return

    const isHand = tool === 'hand'

    const handleMouseDown = (e: MouseEvent) => {
      if (!isHand) return

      e.preventDefault()
      e.stopPropagation()

      const startX = e.pageX - pan.x
      const startY = e.pageY - pan.y

      const handleMouseMove = (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        
        setPan({
          x: event.pageX - startX,
          y: event.pageY - startY,
        })
      }

      const handleMouseUp = (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        
        curr.removeEventListener('mousemove', handleMouseMove)
        curr.removeEventListener('mouseup', handleMouseUp)
      }

      curr.addEventListener('mousemove', handleMouseMove)
      curr.addEventListener('mouseup', handleMouseUp)
    }

    curr.addEventListener('mousedown', handleMouseDown)

    return () => {
      curr.removeEventListener('mousedown', handleMouseDown)
    }
  }, [pan.x, pan.y, setPan, tool])

  const getToolCursorType = () => {
    switch (tool) {
      case 'cursor':
        return 'default'
      case 'hand':
        return 'grab'
      default:
        return 'default'
    }
  }

  return (
    <div
      className="relative flex-1 w-full h-full border outline-none select-none bg-background cursor-all-children"
      id="canvas"
      ref={ref}
      role="button"
      style={
        {
          '--cursor': getToolCursorType(),
          cursor: getToolCursorType(),
          borderColor:
            selectedState === 'default'
              ? 'transparent'
              : stateMapping[selectedState].color,
        } as React.CSSProperties
      }
      tabIndex={-1}
      onClick={handleClick}
      onKeyDown={() => null}>
      <Offline>
        <div className="absolute top-0 left-0 right-0 z-30 px-8 text-sm font-medium text-black border-b border-border bg-amber-500">
          You are offline. Changes cannot be saved until you are back online,
          but you can continue working.
        </div>
      </Offline>
      {breakpoints.map((breakpoint) => (
        <Breakpoint breakpoint={breakpoint} key={breakpoint.id} />
      ))}
    </div>
  )
}

export default Canvas
