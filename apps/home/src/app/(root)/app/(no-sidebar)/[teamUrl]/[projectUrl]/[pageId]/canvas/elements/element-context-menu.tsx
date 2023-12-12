import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from 'ui'
import { useCallback, useEffect, useState } from 'react'
import { format } from 'prettier/standalone'
import { toast } from 'sonner'
import { createId } from '@paralleldrive/cuid2'
import { useInteractionsStore } from '@/stores/interactions-store'
import exportHtmlCss from '@/lib/export/html-css'
import type { Element } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'

interface ElementContextMenuProps {
  element: Element
  isVoidElement?: boolean
  children: React.ReactNode
}

const ElementContextMenu = ({
  children,
  element,
  isVoidElement,
}: ElementContextMenuProps) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )
  const addElement = useCanvasStore((s) => s.addElement)
  const removeElement = useCanvasStore((s) => s.removeElement)

  const [data, setData] = useState({
    html: '',
    css: '',
  })

  const handleSelectElement = () => {
    if (selectedElementId !== element.id) {
      setSelectedElementId(element.id)
    } else {
      setSelectedElementId(null)
    }
  }

  const getHtmlCss = useCallback(async () => {
    const exportData = await exportHtmlCss({
      overrideElements: [element],
      skipDownload: true,
      skipBodyStyles: true,
      skipVariables: true,
      skipDefaultCss: true,
    })

    const htmlNode = exportData?.htmlNode
    const bodyChildren = htmlNode?.querySelector('body')?.children
    if (!bodyChildren)
      return {
        html: '',
        css: '',
      }

    const bodyChildrenArray = Array.from(bodyChildren)
    const elementHtml = bodyChildrenArray
      .map((child) => child.outerHTML)
      .join('\n')

    const prettierHtml = await format(elementHtml, {
      parser: 'html',
      plugins: [require('prettier/parser-html')],
    })

    const elementCss = exportData?.css

    const prettierCss = await format(elementCss || '', {
      parser: 'css',
      plugins: [require('prettier/parser-postcss')],
    })

    return {
      html: prettierHtml,
      css: prettierCss,
    }
  }, [element])

  useEffect(() => {
    const getHtmlCssData = async () => {
      const d = await getHtmlCss()
      setData(d)
    }

    void getHtmlCssData()
  }, [getHtmlCss])

  const copyElementJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(element, null, 2))
      toast.success('Copied element JSON to clipboard')
    } catch (err) {
      toast.error('Failed to copy element JSON to clipboard')
    }
  }

  const handlePasteElement = async (position: 'before' | 'after' | 'child') => {
    try {
      const text = await navigator.clipboard.readText()
      const json = JSON.parse(text)

      const deepValidate = (el) => {
        if (typeof el === 'string') return el
        if (!el.type) throw new Error('Missing type')
        if (!el.children) throw new Error('Missing children')
        if (!el.style) throw new Error('Missing style')
        if (!el.attributes) throw new Error('Missing attributes')

        return {
          id: createId(),
          type: el.type,
          children: (el.children || []).map((child) => deepValidate(child)),
          style: el.style,
          attributes: el.attributes,
        }
      }

      const validatedJson = deepValidate(json)

      addElement(validatedJson as Element, element.id, position)
      setSelectedElementId(validatedJson?.[0]?.id || null)

      toast.success('Pasted element')
    } catch (err) {
      toast.error('Failed to paste element')
    }
  }

  return (
    <AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleSelectElement}>
            {selectedElementId === element.id ? 'Deselect' : 'Select'} Element
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={copyElementJson}>
            Copy Element
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger className="px-2">
              Paste Element
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem onClick={() => handlePasteElement('before')}>
                Paste Before Element
              </ContextMenuItem>
              {!isVoidElement && (
                <ContextMenuItem onClick={() => handlePasteElement('child')}>
                  Paste As Child Element
                </ContextMenuItem>
              )}
              <ContextMenuItem onClick={() => handlePasteElement('after')}>
                Paste After Element
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <AlertDialogTrigger>
            <ContextMenuItem>Export Element</ContextMenuItem>
          </AlertDialogTrigger>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => {
              removeElement(element.id)
            }}>
            Delete Element
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Export Element</AlertDialogTitle>
          <AlertDialogDescription>
            A snippet of code to embed this element on your website.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase text-neutral-400">HTML</p>
          <button
            className="text-xs font-medium uppercase text-primary-500 hover:text-primary-600"
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(data?.html || '')
                toast.success('Copied HTML to clipboard')
              } catch (err) {
                toast.error('Failed to copy HTML to clipboard')
              }
            }}>
            Copy HTML
          </button>
        </div>{' '}
        <div className="p-4 overflow-auto max-h-[8rem] rounded-md bg-neutral-200">
          <pre className="font-mono text-sm text-neutral-700">
            {data?.html || ''}
          </pre>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase text-neutral-400">CSS</p>
          <button
            className="text-xs font-medium uppercase text-primary-500 hover:text-primary-600"
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(data?.css || '')
                toast.success('Copied CSS to clipboard')
              } catch (err) {
                toast.error('Failed to copy CSS to clipboard')
              }
            }}>
            Copy CSS
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[8rem] rounded-md bg-neutral-200">
          <pre className="font-mono text-sm text-neutral-700">
            {data?.css || ''}
          </pre>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Done</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ElementContextMenu
