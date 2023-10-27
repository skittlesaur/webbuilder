import { useEffect, useState } from 'react'
import { useInteractionsStore } from '@/stores/interactions-store'

const SelectionIndicator = () => {
  const { selectedElementId, setSelectedElementId } = useInteractionsStore()
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
    if (!selectedElementId) return

    const element = document.getElementById(`layer-${selectedElementId}`)

    if (!element) return

    // get position relative to container
    const parentLiElement = element.closest('li')
    const rect = parentLiElement?.getBoundingClientRect()
    const containerRect = document
      .getElementById('layers-container')
      ?.getBoundingClientRect()

    if (!rect || !containerRect) return

    const relativeY = rect.y - containerRect.y

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
