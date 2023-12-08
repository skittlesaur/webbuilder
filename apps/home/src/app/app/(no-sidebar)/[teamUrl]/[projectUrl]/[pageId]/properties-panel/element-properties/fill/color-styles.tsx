import { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useCanvasStore } from '@/stores/canvas-store'
import CloseIcon from '@/icons/close-outline.svg'
import ChevronRightIcon from '@/icons/chevron-forward.svg'
import StylesIcon from '@/icons/color-filter.svg'

const FillColorStyles = ({ setFills }) => {
  const colorStyles = useCanvasStore((s) => s.variables)?.filter(
    (v) => v.type === 'color'
  )

  const [stylePickerOpen, setStylePickerOpen] = useState(false)

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setStylePickerOpen(false)
    },
  })

  if (!colorStyles?.length) return null

  return (
    <>
      <button type="button" onClick={() => setStylePickerOpen((p) => !p)}>
        <StylesIcon className="w-4 h-4 fill-neutral-300 hover:fill-white" />
      </button>
      {stylePickerOpen ? (
        <div
          className="absolute flex flex-col min-w-[16rem] gap-4 px-4 py-4 mr-1 border rounded-md bg-background border-border top-2 right-full whitespace-nowrap"
          ref={ref}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium">Color styles</p>
            <button type="button" onClick={() => setStylePickerOpen(false)}>
              <CloseIcon className="w-4 h-4 text-neutral-400 hover:text-white" />
            </button>
          </div>
          <div className="w-full h-px bg-border" />
          {colorStyles.map((style) => (
            <button
              className="flex items-center justify-between gap-2 group"
              key={style.name}
              type="button"
              onClick={() => {
                setFills((prev) => [...prev, style])
                setStylePickerOpen(false)
              }}>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: style.value as string }}
                />
                <p className="text-xs">{style.name}</p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </button>
          ))}
        </div>
      ) : null}
    </>
  )
}

export default FillColorStyles
