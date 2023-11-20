import Image from 'next/image'
import {
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from 'ui'
import { useState } from 'react'
import { useInteractionsStore } from '@/stores/interactions-store'
import { useCanvasStore } from '@/stores/canvas-store'
import ImagesIcon from '@/icons/images-outline.svg'

const isSourceValidImage = (src?: string) => {
  if (!src) return false
  return /\.(?<temp1>jpeg|jpg|gif|png)$/.exec(src)
}

const ImageAttributes = ({
  isImage,
  src,
  alt,
}: {
  isImage: boolean
  src?: string
  alt?: string
}) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)
  const assets = useCanvasStore((s) => s.assets)
  const [open, setOpen] = useState(false)

  if (!isImage) return null

  return (
    <div className="p-4 border-b border-border flex flex-col gap-4">
      <p className="font-medium">Image</p>
      <div className="flex flex-col gap-3">
        <Dialog open={open}>
          {src && isSourceValidImage(src) ? (
            <DialogTrigger asChild>
              <button
                className="group relative w-full aspect-video border border-border rounded-lg overflow-hidden flex items-center justify-center"
                type="button"
                onClick={() => setOpen(true)}>
                <p className="absolute z-10 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                  Browse Assets
                </p>
                <Image
                  fill
                  alt={alt ?? ''}
                  className="w-full h-full object-cover group-hover:opacity-30 transition-opacity duration-200 ease-in-out"
                  src={src}
                />
              </button>
            </DialogTrigger>
          ) : null}
          <div className="relative">
            <Input
              key={src}
              className="!pr-9"
              defaultValue={src}
              placeholder="Image URL"
              onChange={(e) => {
                const value = e.target.value
                if (selectedElementId === null) return
                if (isSourceValidImage(value)) {
                  updateElementAttribute(
                    selectedElementId,
                    'attributes',
                    'src',
                    value || null,
                    null
                  )
                }
              }}
            />
            <TooltipProvider disableHoverableContent delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <button
                      className="absolute top-1 bottom-1 right-1 p-1.5 aspect-square rounded border border-border text-white bg-background hover:bg-accent"
                      type="button"
                      onClick={() => {
                        setOpen(true)
                      }}>
                      <ImagesIcon />
                    </button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="h-8" side="top" sideOffset={8}>
                  Pick from assets
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center justify-between gap-2">
                <DialogTitle>Asset Picker</DialogTitle>
                <DialogClose onClick={() => setOpen(false)} />
              </div>
              <DialogDescription>
                Pick an image from your assets to use as the image for this
                element. You can also upload a new image.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 max-h-[20rem] overflow-y-auto">
              {assets.map((asset) => (
                <TooltipProvider
                  key={asset.id}
                  disableHoverableContent
                  delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="relative w-full aspect-square rounded-lg overflow-hidden"
                        type="button"
                        onClick={() => {
                          if (selectedElementId === null) return
                          updateElementAttribute(
                            selectedElementId,
                            'attributes',
                            'src',
                            asset.url,
                            null
                          )
                          setOpen(false)
                        }}>
                        <Image
                          fill
                          alt={asset.name}
                          className="w-full h-full object-cover origin-bottom"
                          src={asset.url}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="h-8" side="top" sideOffset={8}>
                      {asset.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
          <p className="text-gray-400">Alt</p>
          <Input
            defaultValue={alt}
            placeholder="Image description"
            onChange={(e) => {
              const value = e.target.value
              if (selectedElementId === null) return
              updateElementAttribute(
                selectedElementId,
                'attributes',
                'alt',
                value || null,
                null
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageAttributes
