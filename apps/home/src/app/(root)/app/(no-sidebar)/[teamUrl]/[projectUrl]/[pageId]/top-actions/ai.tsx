import { useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  TextArea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'ui'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { createId } from '@paralleldrive/cuid2'
import html2canvas from 'html2canvas'
import Link from 'next/link'
import Element from '../canvas/elements'
import RobotIcon from '@/icons/robot.svg'
import api from '@/lib/api'
import { useCanvasStore } from '@/stores/canvas-store'
import type {
  DefinedComponent,
  Element as ElementType,
} from '@/stores/canvas-store'
import getErrorMessage from '@/lib/get-error-message'
import useUser from '@/resolvers/use-user'
import TokenIcon from '@/icons/token.svg'
import uploadImage from '@/lib/upload-image'

const AiButton = () => {
  const { pageId } = useParams()

  const [open, setOpen] = useState(false)
  const [generatedElement, setGeneratedElement] = useState<ElementType | null>(
    null
  )
  const [isGenerating, setIsGenerating] = useState(false)

  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const variables = useCanvasStore((s) => s.variables)
  const addComponent = useCanvasStore((s) => s.addComponent)
  const updateComponent = useCanvasStore((s) => s.updateComponent)
  const addElement = useCanvasStore((s) => s.addElement)
  const removeElement = useCanvasStore((s) => s.removeElement)

  const { user, mutateUser } = useUser()

  const handleGenerateElement = () => {
    if (isGenerating) return

    const description = descriptionRef.current?.value?.trim()

    if (!description) {
      return toast.error('Please enter a description')
    }

    const generate = async () => {
      try {
        setIsGenerating(true)

        const { data } = await api.post(
          `/ai/${pageId as string}/generate-element`,
          {
            prompt: description,
          }
        )

        const deepFormatData = (element: ElementType | string) => {
          if (typeof element === 'string') return element

          const childrenArray = Array.isArray(element.children || [])
            ? element.children || []
            : [element.children]

          const style = element.style || {}

          if (style.padding) {
            const splitPadding = String(style.padding).split(' ')
            const top = splitPadding[0]
            const right = splitPadding[1] || top
            const bottom = splitPadding[2] || top
            const left = splitPadding[3] || right
            style.paddingTop = top
            style.paddingRight = right
            style.paddingBottom = bottom
            style.paddingLeft = left
            delete style.padding
          }

          if (style.border) {
            const splitBorder = String(style.border).split(' ')
            const borderWidth = splitBorder[0]
            const borderStyle = splitBorder[1] || 'solid'
            const borderColor = splitBorder[2] || 'black'
            style.borderWidth = borderWidth
            style.borderStyle = borderStyle
            style.borderColor = borderColor
            delete style.border
          }

          return {
            ...element,
            id: createId(),
            children: (childrenArray || []).map((child) =>
              deepFormatData(child)
            ),
          }
        }

        const element = deepFormatData(data)

        setGeneratedElement(element)
        await mutateUser()
      } finally {
        setIsGenerating(false)
      }
    }

    toast.promise(generate(), {
      loading: 'Generating...',
      success: 'Element generated',
      error: (e) => toast.error(getErrorMessage(e)),
    })
  }

  const handleMakeComponent = async () => {
    if (!generatedElement) return

    const newComponent: DefinedComponent = {
      id: createId(),
      name: 'AI-Component',
      element: generatedElement,
    }

    addElement(newComponent.element)

    const defaultBreakpoint = document.querySelector(
      '[data-default-breakpoint]'
    )

    const elementInDom = defaultBreakpoint?.querySelector(
      `#${newComponent.element.id}`
    )

    removeElement(newComponent.element.id)

    addComponent(newComponent)
    setOpen(false)
    setGeneratedElement(null)
    toast.success('Component created')

    if (elementInDom) {
      const clone = elementInDom.cloneNode(true) as HTMLElement
      clone.className = ''
      clone.style.position = 'absolute'
      clone.style.top = '0'
      clone.style.left = '0'
      clone.style.zIndex = '-1'

      document.body.setAttribute(
        'style',
        variables
          .map(
            (v) => `--${v.name.toLowerCase().replace(/ /g, '-')}: ${v.value};`
          )
          .join(' ')
      )

      document.body.appendChild(clone)

      const canvas = await html2canvas(clone)
      const dataURL = canvas.toDataURL()
      clone.remove()

      const screenshotUrl = await uploadImage(dataURL)

      document.body.removeAttribute('style')

      updateComponent({
        ...newComponent,
        screenshot: screenshotUrl,
      })
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <TooltipProvider disableHoverableContent delayDuration={300}>
          <Tooltip>
            <TooltipTrigger
              className="flex items-center justify-center rounded w-7 h-7 hover:bg-secondary"
              onClick={() => setOpen(true)}>
              <RobotIcon className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent
              className="h-8"
              data-canvas-function="true"
              side="bottom"
              sideOffset={8}>
              Generate using AI
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <AlertDialogTitle>Generate using AI</AlertDialogTitle>
            {user ? (
              <Link
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-secondary"
                href="/tokens">
                <div className="w-5 h-5 fill-white">
                  <TokenIcon />
                </div>
                <p className="text-xs text-neutral-400">
                  {isGenerating
                    ? user.remainingTokens - 1
                    : user.remainingTokens}{' '}
                  Token{user.remainingTokens === 1 ? '' : 's'}
                </p>
              </Link>
            ) : null}
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Enter a descriptive description for the element you want to generate.
        </AlertDialogDescription>
        <TextArea
          className="min-h-[4rem] max-h-[8rem]"
          disabled={isGenerating || !user?.remainingTokens}
          placeholder="Enter a description"
          ref={descriptionRef}
        />
        {generatedElement ? (
          <>
            <p className="text-xs font-medium uppercase text-neutral-400">
              Preview
            </p>
            <div
              className="w-full h-full p-1 flex flex-col items-center justify-center overflow-y-auto max-h-[20rem] overflow-hidden border rounded-lg border-border min-h-[4rem] text-black"
              style={{
                backgroundImage: `url("/square-pattern.jpeg")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat',
                ...variables.reduce((prev, curr) => {
                  prev[`--${curr.name.toLowerCase().replace(/ /g, '-')}`] =
                    curr.value
                  return prev
                }, {}),
              }}>
              <Element
                previewMode
                element={generatedElement}
                mediaQuery={null}
              />
            </div>
          </>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel
            className="disabled:opacity-50"
            disabled={isGenerating}
            onClick={() => {
              setOpen(false)
              setGeneratedElement(null)
            }}>
            Cancel
          </AlertDialogCancel>
          {generatedElement ? (
            <AlertDialogAction
              disabled={!user?.remainingTokens}
              onClick={handleMakeComponent}>
              Make Component
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              className="disabled:opacity-50"
              disabled={isGenerating || !user?.remainingTokens}
              onClick={handleGenerateElement}>
              {isGenerating ? 'Generating...' : null}
              {!user?.remainingTokens ? 'No tokens remaining' : null}
              {!isGenerating && user?.remainingTokens ? 'Generate' : null}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AiButton
