import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from 'ui'
import Image from 'next/image'
import { createId } from '@paralleldrive/cuid2'
import Element from '../../add-elements/element'
import ActionPanelSeparator from '../../separator'
import ComponentsDeleteButton from './delete'
import type { Element as ElementType } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'

const deepCloneChildren = (children: ElementType | string) => {
  if (typeof children === 'string') return children

  return {
    ...children,
    id: createId(),
    children: children.children?.map(deepCloneChildren),
  }
}

const ComponentsDisplay = () => {
  const components = useCanvasStore((state) => state.components)

  if (!components?.length) return null

  return (
    <>
      <h1 className="text-sm font-medium">Components</h1>
      <div className="grid grid-cols-[repeat(var(--grid-cols-count),1fr)] gap-4 [&_.icon-wrapper]:bg-transparent [&_.icon-wrapper]:p-0">
        {components.map((component) => (
          <ContextMenu key={component.id}>
            <ContextMenuTrigger>
              <Element
                Icon={
                  <div className="relative w-full h-full overflow-hidden border rounded-md border-border">
                    {component.screenshot ? (
                      <Image
                        fill
                        alt="Component screenshot"
                        className="object-contain w-full h-full p-1 pointer-events-none select-none"
                        src={component.screenshot}
                      />
                    ) : null}
                  </div>
                }
                attributes={component.element.attributes}
                componentId={component.id}
                element={component.element.type}
                mediaQueries={component.element.mediaQueries}
                style={component.element.style}
                title={component.name}>
                {component.element.children?.map(deepCloneChildren)}
              </Element>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>{component.name}</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem>Rename</ContextMenuItem>
              <ComponentsDeleteButton componentId={component.id} />
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
      <ActionPanelSeparator />
    </>
  )
}

export default ComponentsDisplay
