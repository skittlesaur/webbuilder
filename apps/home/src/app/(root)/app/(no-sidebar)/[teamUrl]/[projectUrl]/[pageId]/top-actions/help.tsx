import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from 'ui'
import HelpIcon from '@/icons/help-outline.svg'
import { useCanvasStore } from '@/stores/canvas-store'

const Help = () => {
  const setCompletedInstructions = useCanvasStore(
    (s) => s.setCompletedInstructions
  )

  return (
    <TooltipProvider disableHoverableContent delayDuration={300}>
      <Tooltip>
        <TooltipTrigger
          className="flex items-center justify-center rounded w-7 h-7 hover:bg-secondary"
          onClick={() => setCompletedInstructions(false)}>
          <HelpIcon className="w-4 h-4 text-white fill-white" />
        </TooltipTrigger>
        <TooltipContent
          className="h-8"
          data-canvas-function="true"
          side="bottom"
          sideOffset={8}>
          Help
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Help
