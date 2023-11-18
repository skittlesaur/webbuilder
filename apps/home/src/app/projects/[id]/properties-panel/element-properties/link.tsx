import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'ui'
import { toast } from 'sonner'
import PageLinkIcon from '@/icons/document-attach-outline.svg'
import { useInteractionsStore } from '@/stores/interactions-store'
import { useCanvasStore } from '@/stores/canvas-store'

const OPEN_IN = [
  {
    value: '_self',
    label: 'Current tab',
  },
  {
    value: '_blank',
    label: 'New tab',
  },
]

const LinkAttributes = ({
  isAnchor,
  href,
  target,
}: {
  isAnchor: boolean
  href?: string
  target?: string
}) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  if (!isAnchor) return null

  return (
    <div className="p-4 border-b border-border flex flex-col gap-4">
      <p className="font-medium">Link</p>
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Input
            className="!pr-9"
            defaultValue={href}
            placeholder="https://example.com"
            onChange={(e) => {
              const value = e.target.value
              if (selectedElementId === null) return
              updateElementAttribute(
                selectedElementId,
                'attributes',
                'href',
                value || null,
                null
              )
            }}
          />
          <TooltipProvider disableHoverableContent delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="absolute top-1 bottom-1 right-1 p-1.5 aspect-square rounded border border-border text-white bg-background hover:bg-accent"
                  type="button"
                  onClick={() => {
                    toast.error('Not available yet')
                  }}>
                  <PageLinkIcon />
                </button>
              </TooltipTrigger>
              <TooltipContent className="h-8" side="top" sideOffset={8}>
                Link a page
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
          <p className="text-gray-400">Open in</p>
          <Select
            defaultValue={target || '_self'}
            onValueChange={(value) => {
              if (selectedElementId === null) return
              updateElementAttribute(
                selectedElementId,
                'attributes',
                'target',
                value || null,
                null
              )
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Open in" />
            </SelectTrigger>
            <SelectContent>
              {OPEN_IN.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default LinkAttributes
