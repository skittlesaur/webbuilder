import { useMemo, useRef } from 'react'
import cn from 'classnames'
import Element from './elements'
import { useCanvasStore } from '@/stores/canvas-store'

interface BreakpointProps {
  breakpoint: {
    id: string
    width: number
    position: {
      x: number
      y: number
    }
  }
}

const Breakpoint = ({ breakpoint }: BreakpointProps) => {
  const { pan, zoom, elements } = useCanvasStore()
  const ref = useRef<HTMLDivElement>(null)

  const breakpointTitle = useMemo(() => {
    if (breakpoint.width < 768) return 'Mobile'
    if (breakpoint.width < 1024) return 'Tablet'
    return 'Desktop'
  }, [breakpoint.width])

  const hasRelativeParent = useMemo(() => {
    if (!elements) return false
    return elements.some((el) => el.style?.position === 'relative')
  }, [elements])

  return (
    <div
      className="absolute flex flex-col gap-5"
      data-breakpoint={breakpoint.id}
      style={{
        width: breakpoint.width,
        scale: zoom * 0.2,
        transform: `translate(${pan.x}px, ${pan.y}px)`,
        left: breakpoint.position.x,
        top: breakpoint.position.y,
      }}>
      <div
        className="bg-accent px-5 py-2 rounded flex items-center gap-4"
        style={{
          fontSize: `${(5 - zoom) * 0.7}rem`,
          lineHeight: `${(5 - zoom) * 0.7 + 0.5}rem`,
        }}>
        <h1>{breakpointTitle}</h1>
        <p className="text-white/70">
          {breakpoint.width}x{ref.current?.offsetHeight}
        </p>
      </div>
      <div
        className={cn(
          'relative flex flex-col w-full bg-white text-black text-base',
          {
            'h-[20rem]': !hasRelativeParent,
          }
        )}
        data-breakpoint="true"
        ref={ref}>
        {elements.map((element) => (
          <Element element={element} key={element.id} />
        ))}
      </div>
    </div>
  )
}

export default Breakpoint
