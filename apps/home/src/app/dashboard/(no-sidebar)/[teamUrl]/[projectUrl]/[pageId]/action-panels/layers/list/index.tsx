import { useCallback, useMemo } from 'react'
import type {} from '@/stores/canvas-store'
import type { Item } from 'react-nestable'
import Nestable from 'react-nestable'
import HoverIndicator from './hover'
import SelectionIndicator from './selection'
import ListItem from './item'
import { useCanvasStore } from '@/stores/canvas-store'

const LayersList = () => {
  const elements = useCanvasStore((s) => s.elements)

  const recursiveFormat = useCallback((element) => {
    if (typeof element === 'string') return null

    const children =
      element.children
        .map((child) => recursiveFormat(child))
        .filter((child) => child) || []

    const someChildString = element.children.find(
      (child) => typeof child === 'string'
    )

    return {
      id: element.id,
      text: someChildString || element.type,
      children,
    }
  }, [])

  const formattedElements = useMemo(() => {
    return elements.map((element) => recursiveFormat(element))
  }, [elements, recursiveFormat])

  if (!formattedElements?.length)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-text/50">No layers</p>
      </div>
    )

  return (
    <div className="relative" id="layers-container">
      <Nestable
        items={formattedElements as Item[]}
        renderItem={({ item }) => <ListItem item={{
          id: item.id,
          text: item.text,
        }} />}
        // onChange={(newItems) => {
        //
        // }}
      />
      <HoverIndicator />
      <SelectionIndicator />
    </div>
  )
}

export default LayersList
