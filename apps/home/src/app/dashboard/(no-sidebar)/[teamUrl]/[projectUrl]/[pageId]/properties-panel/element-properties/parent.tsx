import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui'
import getElementParentById from '@/lib/element-parent-by-id'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const ElementPropertiesParent = () => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const elements = useCanvasStore((s) => s.elements)
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )

  if (!selectedElementId) return null

  const parentElement = getElementParentById(selectedElementId, elements)

  if (!parentElement) return null

  return (
    <div className="p-4 border-b border-border grid grid-cols-[0.5fr_1fr] gap-2 items-center">
      <p className="text-gray-400">Parent</p>
      <TooltipProvider disableHoverableContent delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-full bg-background border border-border py-1 rounded-md truncate text-left px-2 flex items-center gap-2 hover:bg-accent"
              type="button"
              onClick={() => {
                setSelectedElementId(parentElement.id)
              }}>
              <div className="bg-accent px-1.5 rounded-md flex items-center justify-center">
                {parentElement.type}
              </div>
              <p className="truncate text-xs text-white/50">
                {parentElement.id}
              </p>
            </button>
          </TooltipTrigger>
          <TooltipContent className="h-8" side="bottom" sideOffset={8}>
            Select parent
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ElementPropertiesParent
