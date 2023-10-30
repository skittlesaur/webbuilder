import { useEffect, useRef, useState } from 'react'
import { Input } from 'ui'
import { ChromePicker } from 'react-color'
import cn from 'classnames'
import {
  opacityToHex,
  type Fill,
  DEFAULT_GRADIENT,
  DEFAULT_COLOR,
  gradientToBackground,
} from '.'
import RemoveIcon from '@/icons/remove.svg'

interface ItemProps {
  fill: Fill
  onConfirm: (data: Fill) => void
  colorPickerClick: () => void
  colorPickerOpen: boolean
}

const ColorFill = ({
  fill,
  onConfirm,
  colorPickerClick,
  colorPickerOpen,
}: ItemProps & { fill: { type: 'color' } }) => {
  const [color, setColor] = useState<string>(fill.value)
  const [opacity, setOpacity] = useState<number>(fill.opacity)

  return (
    <>
      <div className="relative flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <button
            className="w-5 h-5 rounded-sm border border-border"
            style={{
              background: `${fill.value}${opacityToHex(fill.opacity / 100)}`,
            }}
            type="button"
            onClick={colorPickerClick}
          />
          <div className="flex">
            <Input
              className="uppercase !p-1 !text-xs !h-6 !w-24 !rounded-r-none"
              value={color}
              onBlur={() => {
                const colorValue = color.startsWith('#')
                  ? color.substring(0, 7)
                  : `#${color.substring(0, 6)}`

                const isValidColor = /^#(?<check>[0-9A-F]{3}){1,2}$/i.test(
                  colorValue
                )

                if (!isValidColor) return setColor(fill.value)

                onConfirm({
                  ...fill,
                  value: colorValue,
                })
              }}
              onChange={(e) => {
                setColor(e.target.value)
              }}
              onKeyDown={(e) => {
                const isEnter = e.key === 'Enter'
                if (!isEnter) return

                const target = e.target as HTMLInputElement
                target.blur()
              }}
            />
            <div className="relative -ml-px">
              <Input
                className="!p-1 !text-xs !h-6 pr-2 !w-12 !rounded-l-none"
                value={opacity}
                onBlur={() => {
                  onConfirm({
                    ...fill,
                    opacity,
                  })
                }}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (isNaN(value)) return

                  setOpacity(value)
                }}
                onKeyDown={(e) => {
                  const isEnter = e.key === 'Enter'
                  if (!isEnter) return

                  const target = e.target as HTMLInputElement
                  target.blur()
                }}
              />
              <p className="select-none pointer-events-none absolute right-2 leading-[0] top-1/2 -translate-y-1/2 text-xs text-gray-400">
                %
              </p>
            </div>
          </div>
        </div>
        <button
          className="select-none rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          type="button"
          onClick={() => {
            //
          }}>
          <RemoveIcon className="w-4 h-4" />
        </button>
      </div>
      {colorPickerOpen ? (
        <div className="select-none bg-background border border-border flex flex-col gap-2 rounded-md overflow-hidden absolute right-full top-0 -translate-x-6 shadow-lg -translate-y-1/2">
          <div className="flex items-center text-xs px-2 pt-1">
            {['Color', 'Gradient'].map((item) => (
              <button
                className={cn('px-1 py-1', {
                  'text-neutral-400 hover:text-neutral-200':
                    item.toLowerCase() !== fill.type,
                })}
                key={item}
                type="button"
                onClick={() => {
                  const type = item.toLowerCase()
                  if (type === fill.type) return
                  if (type === 'gradient') return onConfirm(DEFAULT_GRADIENT)
                  if (type === 'color') return onConfirm(DEFAULT_COLOR)
                }}>
                {item}
              </button>
            ))}
          </div>
          <ChromePicker
            color={`${fill.value}${opacityToHex(fill.opacity / 100)}`}
            onChange={(c: { hex: string; rgb: { a: number } }) => {
              const hex = c.hex
              const alpha = c.rgb.a * 100

              setColor(hex)
              setOpacity(alpha)

              onConfirm({
                ...fill,
                value: hex,
                opacity: alpha,
              })
            }}
          />
        </div>
      ) : null}
    </>
  )
}

const GradientFill = ({
  fill,
  onConfirm,
  colorPickerClick,
  colorPickerOpen,
}: ItemProps & { fill: { type: 'gradient' } }) => {
  const [selectedStep, setSelectedStep] = useState<number>(0)
  const [dragging, setDragging] = useState<number | null>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dragging === null) return

    const listener = (e: MouseEvent) => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const wrapperRect = wrapper.getBoundingClientRect()
      const wrapperWidth = wrapperRect.width

      const left = wrapperRect.left

      const mouseX = e.clientX
      const mouseXRelative = mouseX - left

      const mouseXPercentage = (mouseXRelative / wrapperWidth) * 100
      const mouseXPercentageFixed = Math.min(Math.max(0, mouseXPercentage), 100)

      const newFills = [...fill.value]

      newFills[dragging] = {
        ...newFills[dragging],
        position: mouseXPercentageFixed,
      }

      // sort fills by position
      const sortedFills = newFills.sort((a, b) => a.position - b.position)
      // update dragging index
      const newDraggingIndex = sortedFills.findIndex(
        (item) => item.position === mouseXPercentageFixed
      )

      setDragging(newDraggingIndex)
      setSelectedStep(newDraggingIndex)
      onConfirm({
        ...fill,
        value: sortedFills,
      })
    }

    window.addEventListener('mousemove', listener)
    window.addEventListener('mouseup', () => setDragging(null))

    return () => {
      window.removeEventListener('mousemove', listener)
      window.removeEventListener('mouseup', () => setDragging(null))
    }
  }, [dragging, fill, onConfirm])

  return (
    <>
      <div className="relative flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <button
            className="w-5 h-5 rounded-sm border border-border"
            style={{
              background: gradientToBackground(fill.value, fill.degree),
            }}
            type="button"
            onClick={colorPickerClick}
          />
          <p className="text-xs text-neutral-400">Gradient</p>
        </div>
      </div>
      {colorPickerOpen ? (
        <div className="select-none bg-background border border-border flex flex-col gap-2 rounded-md absolute right-full top-0 -translate-x-6 shadow-lg -translate-y-1/2">
          <div className="flex items-center text-xs px-2 pt-1">
            {['Color', 'Gradient'].map((item) => (
              <button
                className={cn('px-1 py-1', {
                  'text-neutral-400 hover:text-neutral-200':
                    item.toLowerCase() !== fill.type,
                })}
                key={item}
                type="button"
                onClick={() => {
                  const type = item.toLowerCase()
                  if (type === fill.type) return
                  if (type === 'gradient') return onConfirm(DEFAULT_GRADIENT)
                  if (type === 'color') return onConfirm(DEFAULT_COLOR)
                }}>
                {item}
              </button>
            ))}
          </div>
          <div
            className="relative h-12 w-full flex items-end mb-2"
            ref={wrapperRef}
            role="button"
            tabIndex={-1}
            onClick={(e) => {
              const wrapper = wrapperRef.current
              if (!wrapper) return

              const target = e.target as HTMLDivElement

              if (wrapper !== target) return

              const wrapperRect = wrapper.getBoundingClientRect()
              const wrapperWidth = wrapperRect.width
              const left = wrapperRect.left

              const mouseX = e.clientX
              const mouseXRelative = mouseX - left

              const mouseXPercentage = (mouseXRelative / wrapperWidth) * 100
              const mouseXPercentageFixed = Math.min(
                Math.max(0, mouseXPercentage),
                100
              )

              // calculate the color of the new step based on the position of the click and previous colors
              const newColor = '#000000'

              const newFills = [...fill.value]

              newFills.push({
                color: newColor,
                opacity: 100,
                position: mouseXPercentageFixed,
              })

              // sort fills by position
              const sortedFills = newFills.sort(
                (a, b) => a.position - b.position
              )

              // update dragging index
              const itemIndex = sortedFills.findIndex(
                (item) => item.position === mouseXPercentageFixed
              )

              setDragging(null)
              setSelectedStep(itemIndex)
              onConfirm({
                ...fill,
                value: sortedFills,
              })
            }}
            onKeyDown={() => null}>
            {fill.value.map((step, index) => (
              <button
                className={cn(
                  'shadow-lg absolute top-0 w-6 h-6 border-2 -translate-x-1/2 before:content-[""] before:absolute before:z-[1] before:inset-0 before:bg-background after:content-[""] after:absolute after:z-[-2] after:w-2 after:h-2 after:top-full after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45',
                  {
                    'border-primary after:bg-primary': index === selectedStep,
                    'border-white after:bg-white ': index !== selectedStep,
                  }
                )}
                key={index}
                style={{
                  left: `${step.position}%`,
                }}
                type="button"
                onClick={() => setSelectedStep(index)}
                onKeyDown={(e) => {
                  const isDeleteKey = e.key === 'Delete'
                  if (!isDeleteKey) return

                  const newFills = [...fill.value]
                  newFills.splice(index, 1)

                  onConfirm({
                    ...fill,
                    value: newFills,
                  })
                }}
                onMouseDown={() => {
                  setDragging(index)
                  setSelectedStep(index)
                }}>
                <div
                  className="relative z-10 w-full h-full"
                  style={{
                    background: `${step.color}${opacityToHex(
                      step.opacity / 100
                    )}`,
                  }}
                />
              </button>
            ))}
            <div
              className="h-4 w-full"
              style={{
                background: gradientToBackground(fill.value, 90),
              }}
            />
          </div>
          <ChromePicker
            color={`${fill.value[selectedStep].color}${opacityToHex(
              fill.value[selectedStep].opacity / 100
            )}`}
            onChange={(c: { hex: string; rgb: { a: number } }) => {
              const hex = c.hex
              const alpha = c.rgb.a * 100

              const newFills = [...fill.value]
              newFills[selectedStep] = {
                ...newFills[selectedStep],
                color: hex,
                opacity: alpha,
              }

              onConfirm({
                ...fill,
                value: newFills,
              })
            }}
          />
        </div>
      ) : null}
    </>
  )
}

const FillItem = ({
  fill,
  onConfirm,
  colorPickerClick,
  colorPickerOpen,
}: ItemProps) => {
  if (fill.type === 'color')
    return (
      <ColorFill
        colorPickerClick={colorPickerClick}
        colorPickerOpen={colorPickerOpen}
        fill={fill}
        onConfirm={onConfirm}
      />
    )

  return (
    <GradientFill
      colorPickerClick={colorPickerClick}
      colorPickerOpen={colorPickerOpen}
      fill={fill}
      onConfirm={onConfirm}
    />
  )
}

export default FillItem
