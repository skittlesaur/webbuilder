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

const AlignText = ({ textAlign }: { textAlign?: string }) => {
  const { selectedElementId } = useInteractionsStore()
  const { updateElementAttribute } = useCanvasStore()

  const handleAlign = (value: string) => {
    if (!selectedElementId) return
    updateElementAttribute(selectedElementId, 'style', 'textAlign', value)
  }

  return (
    <div className="relative grid grid-cols-[0.5fr_1fr] gap-2 items-center group">
      <p className="text-gray-400">Align</p>
      <div className="bg-background border border-border rounded-md grid grid-cols-3 h-9 w-full overflow-hidden">
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
