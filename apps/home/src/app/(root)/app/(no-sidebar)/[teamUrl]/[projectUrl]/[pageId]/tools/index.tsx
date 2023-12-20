import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui'
import cn from 'classnames'
import { useEffect, type ReactNode, useState } from 'react'
import CursorIcon from '@/icons/cursor.svg'
import HandIcon from '@/icons/hand.svg'
import ZoomInIcon from '@/icons/zoom-in.svg'
import ZoomOutIcon from '@/icons/zoom-out.svg'
import type { Tool } from '@/stores/interactions-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import { useCanvasStore } from '@/stores/canvas-store'

const toolsData: {
  type: Tool
  icon: ReactNode
  tooltip: string
  shortcut?: string
  temporaryShortcut?: string
}[] = [
  {
    type: 'cursor',
    icon: <CursorIcon />,
    tooltip: 'Select',
    shortcut: 'V',
  },
  {
    type: 'hand',
    icon: <HandIcon />,
    tooltip: 'Pan',
    shortcut: 'H',
    temporaryShortcut: ' ',
  },
]

const Tools = () => {
  const tool = useInteractionsStore((s) => s.tool)
  const setTool = useInteractionsStore((s) => s.setTool)

  const zoom = useCanvasStore((s) => s.zoom)
  const setZoom = useCanvasStore((s) => s.setZoom)

  const [zoomValue, setZoomValue] = useState(zoom)

  useEffect(() => {
    setZoomValue(zoom)
  }, [setZoomValue, zoom])

  useEffect(() => {
    let previousTool: Tool = 'cursor'

    const handleKeyDown = (e: KeyboardEvent) => {
      Object.entries(toolsData).forEach(([_key, value]) => {
        if (value.shortcut?.toLowerCase() === e.key?.toLowerCase()) {
          e.preventDefault()
          previousTool = tool
          setTool(value.type)
        }

        if (
          value.temporaryShortcut?.toLowerCase() === e.key?.toLowerCase() &&
          tool !== value.type
        ) {
          e.preventDefault()
          previousTool = tool
          setTool(value.type)
        }
      })

      // zoom controls
      if ((e.ctrlKey || e.metaKey) && e.key === '=') {
        e.preventDefault()
        setZoom(zoom + 0.1)
      } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault()
        setZoom(zoom - 0.1)
      } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault()
        setZoom(1)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      Object.entries(toolsData).forEach(([_key, value]) => {
        if (value.temporaryShortcut?.toLowerCase() === e.key?.toLowerCase()) {
          setTool(previousTool)
          previousTool = 'cursor'
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [setTool, setZoom, tool, zoom])

  return (
    <div className="flex items-center gap-0.5 px-2 py-1 rounded-lg fixed left-1/2 -translate-x-1/2 bottom-4 bg-background border border-border z-30">
      {toolsData.map((t) => (
        <TooltipProvider
          disableHoverableContent
          delayDuration={200}
          key={t.type}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  'flex items-center justify-center p-2.5 transition-colors duration-150 ease-in-out rounded-lg w-9 h-9',
                  {
                    '!bg-background hover:!bg-accent text-white/70 hover:text-white/90':
                      tool !== t.type,
                    '!bg-secondary text-white': tool === t.type,
                  }
                )}
                type="button"
                onClick={() => {
                  if (tool === t.type && tool !== 'cursor') {
                    setTool('cursor')
                  } else {
                    setTool(t.type)
                  }
                }}>
                {t.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent className="h-8" side="top" sideOffset={8}>
              {t.tooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      <div className="w-px h-6 mx-2 bg-border" />
      <div className="flex items-center overflow-hidden border rounded-md border-border">
        <button
          className="w-8 h-8 p-2 -m-px border hover:bg-accent border-border"
          type="button"
          onClick={() => {
            setZoom(zoom + 0.1)
          }}>
          <ZoomInIcon />
        </button>
        <input
          className="w-10 py-1.5 text-xs text-center bg-transparent focus:outline-none focus:ring-0"
          type="number"
          value={zoomValue.toFixed(2).replace('.00', '')}
          onBlur={(e) => {
            const value = parseFloat(e.target.value)
            if (!isNaN(value)) {
              setZoom(value)
            }
          }}
          onChange={(e) => {
            const value = parseFloat(e.target.value)
            if (!isNaN(value)) {
              if (value > 8) setZoomValue(8)
              else if (value < 0.1) setZoomValue(0.1)
              else setZoomValue(value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur()
            }
          }}
        />
        <button
          className="w-8 h-8 p-1.5 -m-px border hover:bg-accent border-border"
          type="button"
          onClick={() => {
            setZoom(zoom - 0.1)
          }}>
          <ZoomOutIcon />
        </button>
      </div>
    </div>
  )
}

export default Tools
