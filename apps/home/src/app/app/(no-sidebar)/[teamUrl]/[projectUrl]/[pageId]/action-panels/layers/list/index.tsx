import { useCallback, useMemo } from 'react'
import type { Item } from 'react-nestable'
import Nestable from 'react-nestable'
import HoverIndicator from './hover'
import SelectionIndicator from './selection'
import ListItem from './item'
import type { Element } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { findElementByIdArr } from '@/lib/find-element-by-id'
import ScrollableWrapper from '@/components/scrollable-wrapper'

const LayersList = () => {
  const elements = useCanvasStore((s) => s.elements)
  const setElements = useCanvasStore((s) => s.setElements)

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
    <div className="relative w-full h-full" id="layers-container">
      <ScrollableWrapper>
        <Nestable
          items={formattedElements as Item[]}
          renderItem={({ item }) => (
            <ListItem
              item={{
                id: item.id,
                text: item.text,
              }}
            />
          )}
          onChange={(newItems) => {
            const { dragItem, targetPath } = newItems

            const element = findElementByIdArr(elements, dragItem.id)

            if (!element) return

            // remove the item from its original position
            const oldItems = [...elements]

            const recursiveFindAndDelete = (el: Element): Element | null => {
              if (el.id === dragItem.id) {
                return null
              }

              if (el.children) {
                el.children = el.children
                  .map((child) =>
                    typeof child === 'string'
                      ? child
                      : recursiveFindAndDelete(child)
                  )
                  .filter((child) => child) as Element[]
              }

              return el
            }

            const newElements = oldItems
              .map((item) => recursiveFindAndDelete(item))
              .filter((item) => item) as Element[]

            if (targetPath.length === 1) {
              // top level move
              const targetIndex = targetPath[0]
              newElements.splice(targetIndex, 0, element)

              setElements(newElements)
              return
            }

            const findAndUpdateRecursive = (
              el: Element | string,
              depth: number
            ) => {
              if (typeof el === 'string') return el

              const isFinal = depth === targetPath.length - 1

              if (isFinal) {
                el.children.splice(targetPath[depth], 0, element)
                return el
              }

              if (el.children) {
                el.children = el.children.map((child, index) => {
                  if (index === targetPath[depth + 1]) {
                    return findAndUpdateRecursive(child, depth + 1)
                  }

                  return child
                })
              }

              return el
            }

            const newElements2 = newElements.map((item, index) => {
              if (index === targetPath[0]) {
                return findAndUpdateRecursive(item, 1)
              }

              return item
            })

            setElements(newElements2 as Element[])
          }}
        />
        <HoverIndicator />
        <SelectionIndicator />
      </ScrollableWrapper>
    </div>
  )
}

export default LayersList
