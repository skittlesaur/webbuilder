import { useState } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui'
import { useDetectClickOutside } from 'react-detect-click-outside'
import InputWithUnit from './input-with-unit'

const Button = ({
  initial,
  type,
  title,
  className,
}: {
  initial?: string
  type: string
  title: string
  className?: string
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setIsOpen(false)
    },
  })

  return (
    <div className="relative">
      <TooltipProvider disableHoverableContent delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn('hover:bg-accent px-3 rounded', className)}
              type="button"
              onClick={() => setIsOpen(!isOpen)}>
              {initial ?? 'none'}
            </button>
          </TooltipTrigger>
          <TooltipContent className="h-8" side="top" sideOffset={8}>
            {title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="shadow-lg flex flex-col gap-1.5 absolute bottom-full !left-1/2 !-translate-x-1/2 px-2 py-1.5 bg-background/70 backdrop-blur rounded border border-border whitespace-nowrap"
            exit={{ opacity: 0, y: 0 }}
            initial={{ opacity: 0, y: -30 }}
            key={type}
            ref={ref}
            transition={{ duration: 0.1, ease: 'easeInOut' }}>
            <p className="text-xs tracking-wide text-white/80">{title}</p>
            <div className="flex items-center w-40">
              <InputWithUnit
                showMeasure
                initial={initial || '0px'}
                type={type}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

interface ElementPropertiesPaddingAndMarginProps {
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
}

const ElementPropertiesPaddingAndMargin = (
  props: ElementPropertiesPaddingAndMarginProps
) => {
  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border">
      <p className="font-medium">Margin & Padding</p>
      <div className="flex flex-col w-full h-32 p-1 mx-auto text-xs border rounded-md border-border">
        <div className="flex items-center justify-center w-full h-5">
          <Button
            initial={props.marginTop}
            title="Margin Top"
            type="marginTop"
          />
        </div>
        <div className="flex flex-1">
          <div className="flex items-center justify-center w-5 h-full">
            <Button
              className="-rotate-90"
              initial={props.marginLeft}
              title="Margin Left"
              type="marginLeft"
            />
          </div>
          <div className="flex flex-col flex-1 p-3 m-1 border rounded-md border-border">
            <div className="flex items-center justify-center w-full h-5">
              <Button
                initial={props.paddingTop}
                title="Padding Top"
                type="paddingTop"
              />
            </div>
            <div className="flex items-center justify-between flex-1">
              <div className="flex items-center justify-center w-5 h-full">
                <Button
                  className="-rotate-90"
                  initial={props.paddingLeft}
                  title="Padding Left"
                  type="paddingLeft"
                />
              </div>
              <div className="flex items-center justify-center w-5 h-full">
                <Button
                  className="rotate-90"
                  initial={props.paddingRight}
                  title="Padding Right"
                  type="paddingRight"
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-5">
              <Button
                initial={props.paddingBottom}
                title="Padding Bottom"
                type="paddingBottom"
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-5 h-full">
            <Button
              className="rotate-90"
              initial={props.marginRight}
              title="Margin Right"
              type="marginRight"
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-5">
          <Button
            initial={props.marginBottom}
            title="Margin Bottom"
            type="marginBottom"
          />
        </div>
      </div>
    </div>
  )
}

export default ElementPropertiesPaddingAndMargin
