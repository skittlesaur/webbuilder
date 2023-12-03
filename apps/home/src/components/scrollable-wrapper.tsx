import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'

const ScrollableWrapper = ({ children }: { children: React.ReactNode }) => {
  const [innerRef, innerBounds] = useMeasure()
  const [wrapperRef, wrapperBounds] = useMeasure()
  const scrollableRef = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(0)

  useEffect(() => {
    const ref = scrollableRef.current

    if (!ref) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setY((prev) =>
        Math.min(
          Math.max(prev + e.deltaY, 0),
          innerBounds.height - wrapperBounds.height
        )
      )
    }

    ref.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      ref.removeEventListener('wheel', handleWheel)
    }
  }, [innerBounds.height, wrapperBounds.height])

  return (
    <div className="relative w-full h-full" ref={wrapperRef}>
      <div
        className="absolute w-full h-full overflow-visible scroll-wrapper"
        data-scroll={String(y)}
        ref={scrollableRef}
        style={{
          transform: `translateY(-${y}px)`,
        }}
        onWheel={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setY((prev) =>
            Math.min(
              Math.max(prev + e.deltaY, 0),
              innerBounds.height - wrapperBounds.height
            )
          )
        }}>
        <div
          role="presentation"
          ref={innerRef}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ScrollableWrapper
