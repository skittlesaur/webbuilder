import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogCancel,
  DialogConfirm,
} from 'ui'
import { toast } from 'sonner'
import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'classnames'
import { createId } from '@paralleldrive/cuid2'
import uploadImage from '@/lib/upload-image'
import TrashIcon from '@/icons/trash-outline.svg'
import AddIcon from '@/icons/add.svg'
import { useCanvasStore } from '@/stores/canvas-store'

const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif']

const AssetsUploadImageButton = () => {
  const [files, setFiles] = useState<
    { name: string; file: File; uploaded: boolean }[]
  >([])
  const [open, setOpen] = useState(false)
  const addAsset = useCanvasStore((s) => s.addAsset)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventFiles = e.target.files
    if (!eventFiles) return

    const images = Array.from(eventFiles)
      .filter((file) => ALLOWED_FILE_TYPES.includes(file.type))
      .map((file) => ({
        name: file.name.replace(/\.[^/.]+$/, '').trim(),
        file,
        uploaded: false,
      }))

    setFiles((prev) => {
      const oldFiles = [...prev]
      // filter out files that are already uploaded
      const newFiles = images.filter(
        (image) => !oldFiles.find((file) => file.name === image.name)
      )

      const filteredImages = images.filter(
        (image) => !newFiles.find((file) => file.name === image.name)
      )

      if (filteredImages.length > 0)
        toast.warning('Duplicate files will be ignored', {
          description: `${filteredImages.length} duplicate${
            filteredImages.length > 1 ? 's' : ''
          } found (${filteredImages.map((image) => image.name).join(', ')})`,
        })

      newFiles.forEach((file) => {
        uploadImage(file.file)
          .then((url) => {
            setFiles((p) => {
              const newFilesUploaded = [...p]
              const index = newFilesUploaded.findIndex(
                (newFile) => newFile.name === file.name
              )
              newFilesUploaded[index].uploaded = true
              newFilesUploaded[index].file = new File([file.file], url as string, {
                type: file.file.type,
              })
              return newFilesUploaded
            })
          })
          .catch(() => {
            toast.error(`Failed to upload image (${file.name})`)
          })
      })

      return [...oldFiles, ...newFiles]
    })
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <button
          className="flex items-center justify-center w-6 h-6 -mr-1 transition-colors duration-150 ease-in-out rounded hover:bg-secondary/50"
          type="button"
          onClick={() => setOpen(true)}>
          <AddIcon className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload an image</DialogTitle>
          <DialogDescription>
            Upload images from your computer or via a URL. You can also drag and
            drop images from your computer into the canvas.
          </DialogDescription>
        </DialogHeader>
        <div
          className="relative flex items-center justify-center w-full h-32 text-sm rounded border-border group"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%231F2937' stroke-width='3' stroke-dasharray='10' stroke-dashoffset='9' stroke-linecap='round'/%3e%3c/svg%3e")`,
          }}>
          <input
            multiple
            accept={ALLOWED_FILE_TYPES.join(',')}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title=""
            type="file"
            onChange={handleFileChange}
          />
          <p>
            <span className="font-medium text-primary group-hover:text-primary-500">
              Drag and drop
            </span>{' '}
            or{' '}
            <span className="font-medium text-primary group-hover:text-primary-500">
              click here
            </span>{' '}
            to upload
          </p>
        </div>
        {files.length > 0 && (
          <div className="flex flex-row w-full gap-3 py-5 mb-8 overflow-x-auto hide-scrollbar">
            <AnimatePresence mode="sync">
              {files.map((file) => (
                <motion.div
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="flex flex-col gap-2 select-none"
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  key={file.name}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}>
                  <div className="relative w-20 h-20 rounded-lg shadow bg-secondary group">
                    <button
                      className="absolute z-10 right-0 top-0 translate-x-1/2 -translate-y-1/2 rounded-full !bg-red-900 w-6 h-6 p-1 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all ease-in-out duration-100"
                      type="button"
                      onClick={() => {
                        setFiles((prev) => {
                          const newFiles = [...prev]
                          newFiles.splice(newFiles.indexOf(file), 1)
                          return newFiles
                        })
                      }}>
                      <TrashIcon className="w-full h-full" />
                    </button>
                    <Image
                      fill
                      alt={file.name}
                      className={cn(
                        'object-contain pointer-events-none rounded-lg',
                        {
                          'animate-pulse opacity-60': !file.uploaded,
                        }
                      )}
                      src={URL.createObjectURL(file.file)}
                    />
                  </div>
                  <p className="text-xs font-medium text-center">
                    {file.name.length > 10
                      ? `${file.name.substring(0, 10)}…`
                      : file.name}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        <DialogFooter>
          <DialogCancel
            onClick={() => {
              setOpen(false)
              setFiles([])
            }}>
            Cancel
          </DialogCancel>
          <DialogConfirm
            onClick={() => {
              const hasImages = files.length > 0
              if (!hasImages) {
                toast.error('No images selected to upload')
                return
              }

              const allFilesUploaded = files.every((file) => file.uploaded)
              if (!allFilesUploaded) {
                toast.error('Some images are still uploading', {
                  description:
                    'Please wait for all images to finish uploading before confirming',
                })
                return
              }

              addAsset(
                files.map((file) => ({
                  id: createId(),
                  name: file.name,
                  type: 'image',
                  url: file.file.name,
                }))
              )

              setOpen(false)
              setFiles([])

              toast.success('Images uploaded successfully', {
                description: `${files.length} image${
                  files.length > 1 ? 's' : ''
                } uploaded`,
              })
            }}>
            Confirm
          </DialogConfirm>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AssetsUploadImageButton
