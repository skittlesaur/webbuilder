import { createId } from '@paralleldrive/cuid2'
import html2canvas from 'html2canvas'
import { toast } from 'sonner'
import type { DefinedComponent , Element } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import { findElementByIdArr } from '@/lib/find-element-by-id'
import uploadImage from '@/lib/upload-image'

const MakeComponentButton = () => {
  const selectedElementId = useInteractionsStore(
    (state) => state.selectedElementId
  )
  const elements = useCanvasStore((state) => state.elements)
  const addComponent = useCanvasStore((state) => state.addComponent)
  const updateComponent = useCanvasStore((state) => state.updateComponent)

  const element = findElementByIdArr(elements, selectedElementId as string)

  const handleClick = async () => {
    if (!element) return

    const { id: _, ...rest } = element

    const deepCloneChildren = (children: Element | string) => {
      if (typeof children === 'string') return children

      return {
        ...children,
        id: createId(),
        children: children.children?.map(deepCloneChildren),
      }
    }

    const newComponent: DefinedComponent = {
      id: createId(),
      name: 'Component',
      element: deepCloneChildren(rest as Element),
    }

    addComponent(newComponent)
    toast.success('Component created')

    const defaultBreakpoint = document.querySelector(
      '[data-default-breakpoint]'
    )

    const elementInDom = defaultBreakpoint?.querySelector(
      `#${selectedElementId}`
    )

    if (elementInDom) {
      const clone = elementInDom.cloneNode(true) as HTMLElement
      clone.className = ''
      clone.style.position = 'absolute'
      clone.style.top = '0'
      clone.style.left = '0'
      clone.style.zIndex = '-1'

      document.body.appendChild(clone)

      const canvas = await html2canvas(clone)
      const dataURL = canvas.toDataURL()
      clone.remove()

      const screenshotUrl = await uploadImage(dataURL)

      updateComponent({
        ...newComponent,
        screenshot: screenshotUrl,
      })
    }
  }

  return (
    <div className="items-center p-4 border-b border-border">
      <button
        className="w-full px-2 py-1 text-center border rounded border-border hover:bg-accent text-neutral-400 hover:text-white"
        type="button"
        onClick={handleClick}>
        Make Component
      </button>
    </div>
  )
}

export default MakeComponentButton
