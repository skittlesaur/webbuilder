import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui'
import InputWithUnit from './input-with-unit'
import RemoveIcon from '@/icons/remove.svg'
import AddIcon from '@/icons/add.svg'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

interface ElementPropertiesSizeProps {
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
}

const properties = [
  {
    title: 'Width',
    key: 'width',
  },
  {
    title: 'Height',
    key: 'height',
  },
  {
    title: 'Min Width',
    key: 'minWidth',
    hiddenByDefault: true,
  },
  {
    title: 'Min Height',
    key: 'minHeight',
    hiddenByDefault: true,
  },
  {
    title: 'Max Width',
    key: 'maxWidth',
    hiddenByDefault: true,
  },
  {
    title: 'Max Height',
    key: 'maxHeight',
    hiddenByDefault: true,
  },
]

const ElementPropertiesSize = (props: ElementPropertiesSizeProps) => {
  const { selectedElementId, selectedMediaQuery } = useInteractionsStore()
  const { updateElementAttribute } = useCanvasStore()

  const [visibleProperties, setVisibleProperties] = useState(() => {
    const visible = properties.filter((property) => {
      const itemHasValue = props[property.key]
      if (itemHasValue) return true
      return !property.hiddenByDefault
    })
    return visible
  })

  const hiddenProperties = properties.filter(
    (property) =>
      !visibleProperties.some(
        (visibleProperty) => visibleProperty.key === property.key
      )
  )

  return (
    <div className="p-4 border-b border-border flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-medium">Size</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="select-none rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              type="button">
              <AddIcon className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {hiddenProperties.map((property) => (
              <DropdownMenuItem
                key={property.key}
                onClick={() => {
                  setVisibleProperties((prev) => {
                    // sort based on the order of the properties array
                    const sorted = [...prev, property].sort(
                      (a, b) => properties.indexOf(a) - properties.indexOf(b)
                    )
                    return sorted
                  })
                }}>
                {property.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-3">
        {visibleProperties.map((property) => (
          <div
            className="relative grid grid-cols-[0.5fr_1fr] gap-2 items-center group"
            key={property.key}>
            {property.hiddenByDefault ? (
              <button
                className="z-10 opacity-0 group-hover:opacity-100 focus:opacity-100 absolute top-1/2 -translate-y-1/2 translate-x-[calc(-50%-1rem)] w-8 flex items-center justify-center transition-all duration-150 ease-in-out"
                type="button"
                onClick={() => {
                  setVisibleProperties((prev) => {
                    const filtered = prev.filter(
                      (prevProperty) => prevProperty.key !== property.key
                    )
                    return filtered
                  })

                  if (selectedElementId)
                    updateElementAttribute(
                      selectedElementId,
                      'style',
                      property.key,
                      undefined,
                      selectedMediaQuery
                    )
                }}>
                <div className="bg-background rounded-md border border-border hover:bg-accent">
                  <RemoveIcon className="w-5 h-5" />
                </div>
              </button>
            ) : null}
            <p className="text-gray-400">{property.title}</p>
            <InputWithUnit
              showMeasure
              autoValue="unset"
              initial={props[property.key]}
              type={property.key}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ElementPropertiesSize
