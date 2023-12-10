'use client'
import {
  Dialog,
  DialogCancel,
  DialogConfirm,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui'
import { useState } from 'react'
import cn from 'classnames'
import { toast } from 'sonner'
import HtmlIcon from '@/icons/html.svg'
import CssIcon from '@/icons/css.svg'
import BootstrapIcon from '@/icons/bootstrap.svg'
import exportHtmlCss from '@/lib/export/html-css'

interface ExportEntry {
  name: string
  value: string
  icon: React.ReactNode
}

const HTML_EXPORTS = [
  {
    name: 'HTML5',
    value: 'html',
    icon: <HtmlIcon />,
  },
]

const CSS_EXPORTS = [
  {
    name: 'CSS3',
    value: 'css',
    icon: <CssIcon />,
  },
  {
    name: 'Bootstrap',
    value: 'bootstrap',
    icon: <BootstrapIcon />,
  },
]

const exportFunctions = {
  'html-css': exportHtmlCss,
}

const ExportButton = () => {
  const [open, setOpen] = useState(false)
  const [selectedExport, setSelectedExport] = useState<{
    html: ExportEntry
    css: ExportEntry
  }>({
    html: HTML_EXPORTS[0],
    css: CSS_EXPORTS[0],
  })

  const handleExport = async () => {
    const exportFunctionKey = `${selectedExport.html.value}-${selectedExport.css.value}`
    const exportFunction = exportFunctions[exportFunctionKey]

    if (exportFunction) {
      await exportFunction()
      setOpen(false)
      return
    }

    toast.error('Not implemented yet')
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <button
          className="px-2.5 py-1.5 h-7 text-medium !bg-primary text-text rounded text-xs hover:!bg-primary-800 transition-colors ease-in-out duration-150"
          type="button"
          onClick={() => {
            setOpen(true)
          }}>
          Export
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export website</DialogTitle>
          <DialogDescription>
            Pick a framework to export your website to
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium text-neutral-200">HTML</p>
          <div className="flex gap-3">
            {HTML_EXPORTS.map((entry) => (
              <button
                className="flex flex-col items-center gap-2 group"
                key={entry.value}
                type="button"
                onClick={() => {
                  setSelectedExport((p) => ({
                    ...p,
                    html: entry,
                  }))
                }}>
                <div
                  className={cn(
                    'w-20 h-20 p-3 transition-colors duration-150 ease-in-out border rounded-md flex items-center justify-between',
                    {
                      'border-primary bg-accent/50':
                        selectedExport.html.value === entry.value,
                      'border-border group-hover:bg-accent':
                        selectedExport.html.value !== entry.value,
                    }
                  )}>
                  {entry.icon}
                </div>
                <p className="text-sm">{entry.name}</p>
              </button>
            ))}
          </div>
          <p className="text-xs font-medium text-neutral-200">CSS</p>
          <div className="flex gap-3">
            {CSS_EXPORTS.map((entry) => (
              <button
                className="flex flex-col items-center gap-2 group"
                key={entry.value}
                type="button"
                onClick={() => {
                  setSelectedExport((p) => ({
                    ...p,
                    css: entry,
                  }))
                }}>
                <div
                  className={cn(
                    'w-20 h-20 p-3 transition-colors duration-150 ease-in-out border rounded-md flex items-center justify-between',
                    {
                      'border-primary bg-accent/50':
                        selectedExport.css.value === entry.value,
                      'border-border group-hover:bg-accent':
                        selectedExport.css.value !== entry.value,
                    }
                  )}>
                  {entry.icon}
                </div>
                <p className="text-sm">{entry.name}</p>
              </button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogCancel
            onClick={() => {
              setOpen(false)
            }}>
            Cancel
          </DialogCancel>
          <DialogConfirm onClick={handleExport}>Export</DialogConfirm>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExportButton
