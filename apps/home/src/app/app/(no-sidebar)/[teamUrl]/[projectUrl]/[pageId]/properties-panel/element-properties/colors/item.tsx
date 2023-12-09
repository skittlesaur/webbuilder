import { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from 'ui'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { ChromePicker } from 'react-color'
import cn from 'classnames'
import {
  opacityToHex,
  type Fill,
  DEFAULT_GRADIENT,
  DEFAULT_COLOR,
  gradientToBackground,
} from './fill'
import { useInteractionsStore } from '@/stores/interactions-store'

interface ItemProps {
  fill: Fill
  onConfirm: (data: Fill) => void
  colorPickerClick: () => void
  colorPickerOpen: boolean
  closeColorPicker: () => void
  hideGradient?: boolean
}

export const ColorFill = ({
  fill,
  onConfirm,
  colorPickerClick,
  colorPickerOpen,
  closeColorPicker,
  hideGradient,
}: ItemProps & { fill: { type: 'color' } }) => {
  const [color, setColor] = useState<string>(fill.value)
  const [opacity, setOpacity] = useState<number>(fill.opacity)

  const ref = useDetectClickOutside({
    onTriggered: () => {
      closeColorPicker()
    },
  })

  const handleColorBlur = () => {
    const colorValue = color.startsWith('#')
      ? color.substring(0, 7)
      : `#${color.substring(0, 6)}`
    const isValidColor = /^#(?<check>[0-9A-F]{3}){1,2}$/i.test(colorValue)

    if (isValidColor) {
      onConfirm({ ...fill, value: colorValue })
    } else {
      setColor(fill.value)
    }
  }

  const handleOpacityBlur = () => {
    onConfirm({ ...fill, opacity })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <>
      <div className="relative flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            className="w-5 h-5 border rounded-sm border-border"
            style={{
              background: `${fill.value}${opacityToHex(fill.opacity / 100)}`,
            }}
            type="button"
            onClick={colorPickerClick}
            onPointerDown={(e) => {
              e.preventDefault()
            }}
          />
          <div className="flex">
            <Input
              className="uppercase !p-1 !text-xs !h-6 !w-24 !rounded-r-none"
              value={color}
              onBlur={handleColorBlur}
              onChange={(e) => {
                setColor(e.target.value)
              }}
              onKeyDown={handleKeyPress}
            />
            <div className="relative -ml-px">
              <Input
                className="!p-1 !text-xs !h-6 pr-2 !w-12 !rounded-l-none"
                value={opacity}
                onBlur={handleOpacityBlur}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (isNaN(value)) return

                  setOpacity(value)
                }}
                onKeyDown={handleKeyPress}
              />
              <p className="select-none pointer-events-none absolute right-2 leading-[0] top-1/2 -translate-y-1/2 text-xs text-gray-400">
                %
              </p>
            </div>
          </div>
        </div>
        {/* <button
          className="rounded-full select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          type="button"
          onClick={() => {
            //
          }}>
          <RemoveIcon className="w-4 h-4" />
        </button> */}
      </div>
      {colorPickerOpen ? (
        <div
          className="absolute top-0 flex flex-col gap-2 overflow-hidden -translate-x-6 -translate-y-1/2 border rounded-md shadow-lg select-none bg-background border-border right-full"
          ref={ref}>
          {!hideGradient && (
            <div className="flex items-center px-2 pt-1 text-xs">
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
          )}
          <ChromePicker
            color={`${fill.value}${opacityToHex(fill.opacity / 100)}`}
            onChange={(c: { hex: string; rgb: { a: number } }, e) => {
              e.stopPropagation()
              e.preventDefault()

              const hex = c.hex
              const alpha = Math.round(c.rgb.a * 100)

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
  closeColorPicker,
}: ItemProps & { fill: { type: 'gradient' } }) => {
  const selectedGradientStep = useInteractionsStore(
    (s) => s.selectedGradientStep
  )
  const setSelectedGradientStep = useInteractionsStore(
    (s) => s.setSelectedGradientStep
  )
  const ref = useDetectClickOutside({
    onTriggered: () => {
      closeColorPicker()
    },
  })

  const [dragging, setDragging] = useState<number | null>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging === null) return

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

      const sortedFills = newFills.sort((a, b) => a.position - b.position)
      const newDraggingIndex = sortedFills.findIndex(
        (item) => item.position === mouseXPercentageFixed
      )

      setDragging(newDraggingIndex)
      setSelectedGradientStep(newDraggingIndex)
      onConfirm({
        ...fill,
        value: sortedFills,
      })
    },
    [dragging, fill, onConfirm, setSelectedGradientStep]
  )

  useEffect(() => {
    if (dragging === null) return
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', () => setDragging(null))

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', () => setDragging(null))
    }
  }, [dragging, handleMouseMove])

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
    const mouseXPercentageFixed = Math.min(Math.max(0, mouseXPercentage), 100)
    const newColor = '#000000'

    const newFills = [...fill.value]
    newFills.push({
      color: newColor,
      opacity: 100,
      position: mouseXPercentageFixed,
    })

    const sortedFills = newFills.sort((a, b) => a.position - b.position)
    const itemIndex = sortedFills.findIndex(
      (item) => item.position === mouseXPercentageFixed
    )

    setDragging(null)
    setSelectedGradientStep(itemIndex)
    onConfirm({
      ...fill,
      value: sortedFills,
    })
  }

  const handleStepClick = (index: number) => {
    setDragging(index)
    setSelectedGradientStep(index)
  }

  const handleStepDelete = (index: number) => {
    const newFills = [...fill.value]
    newFills.splice(index, 1)

    onConfirm({
      ...fill,
      value: newFills,
    })
  }

  return (
    <>
      <div className="relative flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            className="w-5 h-5 border rounded-sm border-border"
            style={{
              background: gradientToBackground(fill.value, fill.degree),
            }}
            type="button"
            onClick={colorPickerClick}
          />
          <p className="text-xs text-neutral-400">Gradient</p>
        </div>
        <div className="relative -ml-px">
          <Input
            className="!py-1 !px-2 !text-xs !h-6 pr-2 !w-20"
            value={fill.degree}
            onChange={(e) => {
              const value = Number(e.target.value)
              if (isNaN(value)) return

              onConfirm({
                ...fill,
                degree: value,
              })
            }}
          />
          <p className="select-none pointer-events-none absolute right-2 leading-[0] top-1/2 -translate-y-1/2 text-xs text-gray-400">
            deg
          </p>
        </div>
      </div>
      {colorPickerOpen ? (
        <div
          className="absolute top-0 flex flex-col gap-2 -translate-x-6 -translate-y-1/2 border rounded-md shadow-lg select-none bg-background border-border right-full"
          ref={ref}>
          <div className="flex items-center px-2 pt-1 text-xs">
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
            className="relative flex items-end w-full h-12 mb-2"
            ref={wrapperRef}
            role="button"
            tabIndex={-1}
            onClick={handleWrapperClick}
            onKeyDown={() => null}>
            {fill.value.map((step, index) => (
              <button
                className={cn(
                  'shadow-lg absolute top-0 w-6 h-6 border-2 -translate-x-1/2 before:content-[""] before:absolute before:z-[1] before:inset-0 before:bg-background after:content-[""] after:absolute after:z-[-2] after:w-2 after:h-2 after:top-full after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45',
                  {
                    'border-primary after:bg-primary':
                      index === selectedGradientStep,
                    'border-white after:bg-white ':
                      index !== selectedGradientStep,
                  }
                )}
                key={index}
                style={{
                  left: `${step.position}%`,
                }}
                type="button"
                onClick={() => setSelectedGradientStep(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Delete') {
                    handleStepDelete(index)
                  }
                }}
                onMouseDown={() => handleStepClick(index)}>
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
              className="w-full h-4"
              style={{
                background: gradientToBackground(fill.value, 90),
              }}
            />
          </div>
          <ChromePicker
            color={`${fill.value[selectedGradientStep].color}${opacityToHex(
              fill.value[selectedGradientStep].opacity / 100
            )}`}
            onChange={(c: { hex: string; rgb: { a: number } }) => {
              const hex = c.hex
              const alpha = c.rgb.a * 100

              const newFills = [...fill.value]
              newFills[selectedGradientStep] = {
                ...newFills[selectedGradientStep],
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
  closeColorPicker,
}: ItemProps) => {
  if (fill.type === 'color')
    return (
      <ColorFill
        closeColorPicker={closeColorPicker}
        colorPickerClick={colorPickerClick}
        colorPickerOpen={colorPickerOpen}
        fill={fill}
        onConfirm={onConfirm}
      />
    )

  return (
    <GradientFill
      closeColorPicker={closeColorPicker}
      colorPickerClick={colorPickerClick}
      colorPickerOpen={colorPickerOpen}
      fill={fill}
      onConfirm={onConfirm}
    />
  )
}

export default FillItem
