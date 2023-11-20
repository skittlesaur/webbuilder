import { useMemo, useRef } from 'react'
import Element from './elements'
import { useCanvasStore } from '@/stores/canvas-store'
import type { Breakpoint as BreakpointType } from '@/stores/canvas-store'

interface BreakpointProps {
  breakpoint: BreakpointType
}

const Breakpoint = ({ breakpoint }: BreakpointProps) => {
  const pan = useCanvasStore((s) => s.pan)
  const zoom = useCanvasStore((s) => s.zoom)
  const elements = useCanvasStore((s) => s.elements)
  const bodyStyles = useCanvasStore((s) => s.bodyStyles)

  const ref = useRef<HTMLDivElement>(null)

  const breakpointTitle = useMemo(() => {
    if (breakpoint.width < 768) return 'Mobile'
    if (breakpoint.width < 1024) return 'Tablet'
    return 'Desktop'
  }, [breakpoint.width])

  const hasRelativeParent = useMemo(() => {
    if (!elements.length) return false
    return elements.some(
      (el) =>
        el.style === undefined ||
        el.style.position === 'static' ||
        el.style.position === 'relative' ||
        el.style.position === 'sticky' ||
        el.style.position === undefined
    )
  }, [elements])

  return (
    <div
      className="absolute flex flex-col gap-5 origin-top"
      data-breakpoint={breakpoint.id}
      style={{
        width: breakpoint.width,
        transform: `scale(${zoom * 0.2}) translate(${pan.x}px, ${pan.y}px)`,
        left:
          breakpoint.position.x * zoom * 0.2 - breakpoint.width / 2 + pan.x / 2,
        top: breakpoint.position.y * zoom * 0.2 + pan.y / 2,
      }}>
      <div
        className="flex items-center gap-4 px-5 py-2 rounded bg-accent"
        style={{
          fontSize: `minmax(0.5rem, ${(5 - zoom) * 0.7}rem, 1.5rem))`,
          lineHeight: `minmax(0.6rem, ${(5 - zoom) * 0.7 + 0.5}rem, 1.5rem))`,
        }}>
        <h1>{breakpointTitle}</h1>
        <p className="text-white/70">
          {breakpoint.width}x{ref.current?.offsetHeight}
        </p>
      </div>
      <div
        data-breakpoint="true"
        ref={ref}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: hasRelativeParent ? undefined : '20rem',
          backgroundColor: 'white',
          color: 'black',
          fontSize: '1rem',
          ...bodyStyles,
          maxWidth: '100%',
          minWidth: '100%',
          overflowX: 'hidden',
        }}>
        {elements.map((element) => (
          <Element
            element={element}
            key={element.id}
            mediaQuery={breakpoint.isDefault ? null : breakpoint.width}
          />
        ))}
        {elements.length === 0 && (
          <Element
            element={{
              id: 'root',
              type: 'div',
              style: { height: '20rem', width: '100%' },
              children: [],
            }}
            mediaQuery={breakpoint.isDefault ? null : breakpoint.width}
          />
        )}
      </div>
    </div>
  )
}

export default Breakpoint
