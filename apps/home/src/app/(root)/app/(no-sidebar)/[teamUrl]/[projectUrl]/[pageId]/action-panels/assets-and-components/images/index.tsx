'use client'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'ui'
import { toast } from 'sonner'
import Image from 'next/image'
import Element from '../../add-elements/element'
import AssetsUploadImageButton from './upload'
import AssetsDeleteImageButton from './delete'
import { useCanvasStore } from '@/stores/canvas-store'

const AssetsImages = () => {
  const assets = useCanvasStore((s) => s.assets)

  const images = assets?.filter((asset) => asset.type === 'image')

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-sm font-medium">Images</h1>
        <AssetsUploadImageButton />
      </div>
      <div className="grid grid-cols-[repeat(var(--grid-cols-count),1fr)] gap-4 [&_.icon-wrapper]:bg-transparent [&_.icon-wrapper]:p-0">
        {images?.length > 0 &&
          images.map((asset) => (
            <ContextMenu key={asset.id}>
              <TooltipProvider disableHoverableContent delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ContextMenuTrigger asChild>
                      <Element
                        Icon={
                          <div className="relative w-full h-full overflow-hidden bg-white rounded-md">
                            <Image
                              fill
                              alt={asset.name}
                              className="object-contain w-full h-full rounded-md pointer-events-none select-none"
                              src={asset.url}
                            />
                          </div>
                        }
                        attributes={{
                          src: asset.url,
                          alt: asset.name,
                        }}
                        element="img"
                        key={asset.id}
                        style={{}}
                        title={
                          asset.name.length > 8
                            ? `${asset.name.substring(0, 8)}…`
                            : asset.name
                        }
                      />
                    </ContextMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent className="h-8" side="top" sideOffset={8}>
                    {asset.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ContextMenuContent>
                <ContextMenuLabel>{asset.name}</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuItem>Rename</ContextMenuItem>
                <ContextMenuItem
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(asset.url as string)
                      toast.success('Copied URL to clipboard')
                    } catch (err) {
                      toast.error('Failed to copy URL to clipboard')
                    }
                  }}>
                  Copy URL
                </ContextMenuItem>
                <AssetsDeleteImageButton assetId={asset.id} />
              </ContextMenuContent>
            </ContextMenu>
          ))}
      </div>
    </>
  )
}

export default AssetsImages
