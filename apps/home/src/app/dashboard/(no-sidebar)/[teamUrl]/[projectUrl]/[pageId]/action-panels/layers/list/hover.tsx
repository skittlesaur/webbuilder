import { useEffect, useState } from 'react'
import { useInteractionsStore } from '@/stores/interactions-store'

const HoverIndicator = () => {
  const hoveredElementId = useInteractionsStore((s) => s.hoveredElementId)
  const [yOffset, setYOffset] = useState(0)

  useEffect(() => {
    if (!hoveredElementId) return

    const element = document.getElementById(`layer-${hoveredElementId}`)

    if (!element) return

    // get position relative to container
    const rect = element.getBoundingClientRect()
    const containerRect = document
      .getElementById('layers-container')
      ?.getBoundingClientRect()

    if (!containerRect) return

    const relativeY = rect.y - containerRect.y

    setYOffset(relativeY)
  }, [hoveredElementId])

  if (!hoveredElementId) return null

  return (
    <div
      className="absolute top-0 left-0 right-0 h-7 pointer-events-none z-[-1] mx-[calc(-1.25rem+2px)] ring-1 ring-primary select-none"
      style={{
        transform: `translateY(${yOffset}px)`,
      }}
    />
  )
}

export default HoverIndicator
