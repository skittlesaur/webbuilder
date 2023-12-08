import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'ui'
import getElementParentById from '@/lib/element-parent-by-id'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import capitalizeFirstLetter from '@/lib/capitalize-first-letter'

const ElementPropertiesParentAndMediaQuery = () => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const elements = useCanvasStore((s) => s.elements)
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )

  const breakpoints = useCanvasStore((s) => s.breakpoints)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const setSelectedMediaQuery = useInteractionsStore(
    (s) => s.setSelectedMediaQuery
  )

  if (!selectedElementId) return null

  const parentElement = getElementParentById(selectedElementId, elements)

  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border">
      {parentElement ? (
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
          <p className="text-gray-400">Parent</p>
          <TooltipProvider disableHoverableContent delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex items-center w-full gap-2 px-2 py-1 text-left truncate border rounded-md bg-background border-border hover:bg-accent"
                  type="button"
                  onClick={() => {
                    setSelectedElementId(parentElement.id)
                  }}>
                  <div className="bg-accent px-1.5 rounded-md flex items-center justify-center">
                    {parentElement.type}
                  </div>
                  <p className="text-xs truncate text-white/50">
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
      ) : null}
      <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
        <TooltipProvider disableHoverableContent delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-gray-400 truncate">Breakpoint</p>
            </TooltipTrigger>
            <TooltipContent className="h-8" side="bottom" sideOffset={8}>
              Breakpoint
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Select
          defaultValue={selectedMediaQuery || breakpoints[0]?.width}
          onValueChange={(value) => {
            const breakpoint = breakpoints.find((b) => b.width === value)
            if (!breakpoint) return
            if (breakpoint.isDefault) setSelectedMediaQuery(null)
            else setSelectedMediaQuery(value)
          }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Open in" />
          </SelectTrigger>
          <SelectContent>
            {breakpoints.map((b) => (
              <SelectItem key={b.id} value={b.width}>
                {capitalizeFirstLetter(b.id)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ElementPropertiesParentAndMediaQuery
