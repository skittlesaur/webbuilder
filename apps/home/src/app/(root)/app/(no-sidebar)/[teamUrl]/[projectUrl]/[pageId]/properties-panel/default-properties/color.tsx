import { useRef, useState } from 'react'
import { Input } from 'ui'
import { useDetectClickOutside } from 'react-detect-click-outside'
import Image from 'next/image'
import { ColorFill } from '../element-properties/colors/item'
import { opacityToHex, type Fill } from '../element-properties/colors/fill'
import { useCanvasStore } from '@/stores/canvas-store'
import RemoveIcon from '@/icons/remove-circle-outline.svg'
import AddIcon from '@/icons/add-circle-outline.svg'
import CloseIcon from '@/icons/close-outline.svg'

const ColorStyle = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [fill, setFill] = useState<Fill & { type: 'color' }>({
    type: 'color',
    value: '#ffffff',
    opacity: 100,
  })

  const [colorPicker, setColorPicker] = useState(false)

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setOpen(false)
    },
  })

  const colorStyles = useCanvasStore((s) => s.variables)?.filter(
    (v) => v.type === 'color'
  )

  const addVariable = useCanvasStore((s) => s.addVariable)
  const removeVariable = useCanvasStore((s) => s.removeVariable)

  return (
    <div className="relative mt-4">
      <div className="flex items-center justify-between px-4 py-2 group">
        <p className="text-xs font-medium text-neutral-400">Color styles</p>
        <button
          className="transition-opacity duration-150 opacity-0 group-hover:opacity-100"
          type="button"
          onClick={() => setOpen(true)}>
          <AddIcon className="w-4 h-4 text-neutral-400 hover:text-white" />
        </button>
      </div>
      {open ? (
        <div
          className="absolute flex flex-col min-w-[16rem] gap-4 px-4 py-4 mr-1 border rounded-md bg-background border-border top-2 right-full whitespace-nowrap"
          ref={ref}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium">Create a new color style</p>
            <button type="button" onClick={() => setOpen(false)}>
              <CloseIcon className="w-4 h-4 text-neutral-400 hover:text-white" />
            </button>
          </div>
          <div className="w-full h-px bg-border" />
          <div className="relative w-full h-16 overflow-hidden rounded">
            <div
              className="absolute inset-0 z-[1]"
              style={{
                backgroundColor: `${fill.value}${opacityToHex(
                  fill.opacity / 100
                )}`,
              }}
            />
            <Image
              fill
              alt="Square pattern"
              className="object-cover w-full h-full"
              src="/square-pattern.jpeg"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium">Name</p>
            <Input
              className="!text-xs"
              placeholder="New color style"
              ref={nameRef}
            />
          </div>
          <div className="w-full h-px bg-border" />
          <p className="text-xs font-medium text-neutral-400">Properties</p>
          <div className="flex flex-col gap-2">
            <div className="relative flex items-center gap-2">
              <ColorFill
                hideGradient
                closeColorPicker={() => setColorPicker(false)}
                colorPickerClick={() => {
                  setColorPicker((prev) => !prev)
                }}
                colorPickerOpen={colorPicker}
                fill={fill}
                onConfirm={(data: Fill & { type: 'color' }) => {
                  setFill(data)
                }}
              />
            </div>
          </div>
          <button
            className="self-end px-4 py-2 text-xs font-medium text-white rounded w-fit bg-primary"
            type="button"
            onClick={() => {
              setOpen(false)
              setColorPicker(false)
              setFill({
                type: 'color',
                value: '#ffffff',
                opacity: 100,
              })
              const val = fill.value
              const opacity = fill.opacity
              const colorHex = `${val}${opacityToHex(opacity / 100)}`

              const name = nameRef.current?.value

              addVariable({
                type: 'color',
                name: name || 'New color style',
                value: colorHex,
              })
            }}>
            Create Style
          </button>
        </div>
      ) : null}
      <div className="flex flex-col">
        {colorStyles?.map((v) => (
          <div
            className="flex items-center justify-between gap-2 px-4 py-2.5 text-xs group"
            key={v.name}>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 border rounded border-border"
                style={{
                  backgroundColor: v.value as string,
                }}
              />
              <p className="font-medium">{v.name}</p>
            </div>
            <button
              className="transition-opacity duration-150 opacity-0 group-hover:opacity-100"
              type="button"
              onClick={() => {
                removeVariable(v.name)
              }}>
              <RemoveIcon className="w-4 h-4 text-neutral-400 hover:text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorStyle
