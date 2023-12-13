import { createId } from '@paralleldrive/cuid2'
import html2canvas from 'html2canvas'
import { toast } from 'sonner'
import type { DefinedComponent } from '@/stores/canvas-store'
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
  const updateElement = useCanvasStore((state) => state.updateElement)
  const updateComponent = useCanvasStore((state) => state.updateComponent)
  const variables = useCanvasStore((state) => state.variables)

  const element = findElementByIdArr(elements, selectedElementId as string)

  const handleClick = async () => {
    if (!element) return

    const newComponent: DefinedComponent = {
      id: createId(),
      name: 'Component',
      element,
    }

    addComponent(newComponent)
    updateElement(element.id, {
      componentId: newComponent.id,
    })
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

  if (element?.componentId) return null

  return (
    <div className="items-center p-4 border-b border-border">
      <button
        className="w-full px-2 py-1 text-center border rounded border-border hover:bg-accent text-neutral-400 hover:text-white"
        type="button"
        onClick={handleClick}>
        Make component
      </button>
    </div>
  )
}

export default MakeComponentButton
