import { useEffect, useState } from 'react'
import { useInteractionsStore } from '@/stores/interactions-store'

const SelectionIndicator = () => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )

  const [yOffset, setYOffset] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!selectedElementId) return

    const clickAwayListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (
        target.closest('#layers-container') ||
        target.dataset.droppable === 'true'
      )
        return

      // setSelectedElementId(null)
    }

    window.addEventListener('click', clickAwayListener)

    return () => {
      window.removeEventListener('click', clickAwayListener)
    }
  }, [selectedElementId, setSelectedElementId])

  useEffect(() => {
    if (!selectedElementId) {
      setYOffset(0)
      setHeight(0)
      return
    }

    const element = document.getElementById(`layer-${selectedElementId}`)

    if (!element) {
      setYOffset(0)
      setHeight(0)
      return
    }

    // get position relative to container
    const parentLiElement = element.closest('li')
    const rect = parentLiElement?.getBoundingClientRect()
    const containerRect = document
      .getElementById('layers-container')
      ?.getBoundingClientRect()

    // scroll container
    const scrollContainer = document.querySelector(
      '#layers-container'
    )?.querySelector('[data-scroll]')
    
    const dataScroll = Number(scrollContainer?.getAttribute('data-scroll') ?? 0)

    if (!rect || !containerRect) {
      setYOffset(0)
      setHeight(0)
      return
    }

    const relativeY = rect.y - containerRect.y + dataScroll

    setYOffset(relativeY)
    setHeight(rect.height)
  }, [selectedElementId])

  if (!selectedElementId) return null

  return (
    <div
      className="absolute top-0 left-0 right-0 pointer-events-none z-[-1] -mx-5 bg-primary/20 select-none"
      style={{
        transform: `translateY(${yOffset}px)`,
        height: `${height}px`,
      }}
    />
  )
}

export default SelectionIndicator
