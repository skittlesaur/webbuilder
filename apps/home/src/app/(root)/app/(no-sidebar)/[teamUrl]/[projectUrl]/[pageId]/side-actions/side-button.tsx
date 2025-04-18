'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui'
import { usePanelsStore, type PanelsEnum } from '@/stores/panels-store'

interface SideButtonProps {
  Icon: React.ReactNode
  title: string
  value: PanelsEnum
}

const SideButton = ({ Icon, title, value }: SideButtonProps) => {
  const activePanel = usePanelsStore((s) => s.activePanel)
  const setActivePanel = usePanelsStore((s) => s.setActivePanel)

  return (
    <TooltipProvider disableHoverableContent delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-secondary/50 text-text"
            id={title.toLowerCase().replace(/&/g, '').replace(/ +/g, '-')}
            type="button"
            onClick={() => {
              if (activePanel === value) {
                setActivePanel(null)
              } else {
                setActivePanel(value)
              }
            }}>
            <span className="sr-only">{title}</span>
            {Icon}
          </button>
        </TooltipTrigger>
        <TooltipContent
          className="h-8"
          data-canvas-function="true"
          side="left"
          sideOffset={8}>
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default SideButton
