import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui'
import cn from 'classnames'
import AlignLeftIcon from '@/icons/align-left.svg'
import AlignCenterIcon from '@/icons/align-center.svg'
import AlignRightIcon from '@/icons/align-right.svg'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const buttons = [
  {
    display: 'Left',
    value: 'left',
    icon: <AlignLeftIcon className="w-4 h-4" />,
  },
  {
    display: 'Center',
    value: 'center',
    icon: <AlignCenterIcon className="w-4 h-4" />,
  },
  {
    display: 'Right',
    value: 'right',
    icon: <AlignRightIcon className="w-4 h-4" />,
  },
]

const AlignText = ({
  textAlign,
  isBody,
}: {
  textAlign?: string
  isBody?: boolean
}) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)
  const updateBodyStyle = useCanvasStore((s) => s.updateBodyStyle)

  const handleAlign = (value: string) => {
    if (isBody) {
      return updateBodyStyle('textAlign', value, selectedMediaQuery)
    }
    if (!selectedElementId) return
    updateElementAttribute(
      selectedElementId,
      'style',
      'textAlign',
      value,
      selectedMediaQuery
    )
  }

  return (
    <div className="relative grid grid-cols-[0.5fr_1fr] gap-2 items-center group">
      <p className="text-gray-400">Align</p>
      <div className="grid w-full grid-cols-3 overflow-hidden border rounded-md bg-background border-border h-9">
        {buttons.map((button) => (
          <TooltipProvider
            disableHoverableContent
            delayDuration={200}
            key={button.value}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    'w-full flex items-center justify-center border-r border-border',
                    {
                      'bg-accent': button.value === textAlign,
                      'hover:bg-accent/70': button.value !== textAlign,
                    }
                  )}
                  type="button"
                  onClick={() => handleAlign(button.value)}>
                  {button.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent className="h-8" side="top" sideOffset={8}>
                {button.display}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
}

export default AlignText
