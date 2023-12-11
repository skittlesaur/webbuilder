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

    // scroll container
    const scrollContainer = document
      .querySelector('#layers-container')
      ?.querySelector('[data-scroll]')

    const dataScroll = Number(scrollContainer?.getAttribute('data-scroll') ?? 0)

    const relativeY = rect.y - containerRect.y + dataScroll

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
