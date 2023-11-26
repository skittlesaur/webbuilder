import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogCancel,
  DialogConfirm,
  Input,
} from 'ui'
import { toast } from 'sonner'
import { useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import CloseIcon from '@/icons/close-outline.svg'
import { usePanelsStore } from '@/stores/panels-store'
import AddIcon from '@/icons/add.svg'
import api from '@/lib/api'
import usePages from '@/resolvers/use-pages'
import getErrorMessage from '@/lib/get-error-message'

const PagesPanelHeader = () => {
  const setActivePanel = usePanelsStore((s) => s.setActivePanel)
  const [open, setOpen] = useState(false)
  const pathRef = useRef<HTMLInputElement>(null)
  const { teamUrl, projectUrl } = useParams()
  const { mutatePages } = usePages()
  const [isLoading, setIsLoading] = useState(false)

  const handleCreatePage = async () => {
    const path = pathRef.current?.value

    if (!path) {
      toast.error('Please enter a path')
      return
    }

    const slashFirst = path.startsWith('/') ? path : `/${path}`
    const slashLast = slashFirst.endsWith('/')
      ? slashFirst.slice(0, -1)
      : slashFirst

    const formattedPath = slashLast.trim()

    if (!formattedPath) {
      toast.error('Please enter a valid path')
      return
    }

    try {
      setIsLoading(true)
      await api.post(
        `/team/${teamUrl as string}/project/${projectUrl as string}/page`,
        {
          path: formattedPath,
        }
      )

      await mutatePages()
      setOpen(false)
    } catch (err) {
      toast.error(getErrorMessage(err) as string)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <p className="font-medium">Pages & Layouts</p>
      <div className="flex items-center gap-1">
        <Dialog open={open}>
          <DialogTrigger asChild>
            <button
              className="flex items-center justify-center w-6 h-6 -mr-1 transition-colors duration-150 ease-in-out rounded hover:bg-secondary/50 disabled:opacity-50"
              disabled={isLoading}
              type="button"
              onClick={() => {
                setOpen(true)
              }}>
              <AddIcon className="w-4 h-4" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new page</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col w-full gap-2">
              <label className="text-xs" htmlFor="path">
                Path
              </label>
              <Input id="path" placeholder="/path" ref={pathRef} />
            </div>
            <DialogFooter>
              <DialogCancel
                onClick={() => {
                  setOpen(false)
                }}>
                Cancel
              </DialogCancel>
              <DialogConfirm onClick={handleCreatePage}>Create</DialogConfirm>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <button
          className="flex items-center justify-center w-6 h-6 -mr-1 transition-colors duration-150 ease-in-out rounded hover:bg-secondary/50"
          type="button"
          onClick={() => {
            setActivePanel(null)
          }}>
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default PagesPanelHeader
