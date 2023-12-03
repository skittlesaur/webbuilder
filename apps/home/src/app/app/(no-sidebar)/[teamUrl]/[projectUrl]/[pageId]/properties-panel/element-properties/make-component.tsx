import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui'
import { Component1Icon } from '@radix-ui/react-icons'
import { createId } from '@paralleldrive/cuid2'
import type { DefinedComponent } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import { findElementByIdArr } from '@/lib/find-element-by-id'
import { toast } from 'sonner'

const MakeComponentButton = () => {
  const selectedElementId = useInteractionsStore(
    (state) => state.selectedElementId
  )
  const elements = useCanvasStore((state) => state.elements)
  const addComponent = useCanvasStore((state) => state.addComponent)

  const element = findElementByIdArr(elements, selectedElementId as string)

  const handleClick = () => {
    if (!element) return

    const { id: _, ...rest } = element

    const newComponent: DefinedComponent = {
      id: createId(),
      name: 'Component',
      element: rest,
    }

    addComponent(newComponent)
    toast.success('Component created')
  }

  return (
    <TooltipProvider disableHoverableContent delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="hover:!bg-secondary p-1 rounded w-5 h-5 text-sm"
            type="button"
            onClick={handleClick}>
            <Component1Icon className="w-full h-full" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="h-8" side="bottom" sideOffset={8}>
          Turn into component
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default MakeComponentButton
