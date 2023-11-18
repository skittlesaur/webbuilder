import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from 'ui'
import Element from '../../add-elements/element'
import ComponentsDeleteButton from './delete'
import { useCanvasStore } from '@/stores/canvas-store'

const ComponentsDisplay = () => {
  const components = useCanvasStore((state) => state.components)

  if (!components?.length) return null

  return (
    <>
      <h1 className="font-medium text-sm">Components</h1>
      <div className="grid grid-cols-[repeat(var(--grid-cols-count),1fr)] gap-4 [&_.icon-wrapper]:bg-transparent [&_.icon-wrapper]:p-0">
        {components.map((component) => (
          <ContextMenu key={component.id}>
            <ContextMenuTrigger>
              <Element
                Icon={
                  // @todo: add component icon
                  <div className="relative overflow-hidden w-full h-full rounded-md bg-white" />
                }
                attributes={component.element.attributes}
                element={component.element.type}
                mediaQueries={component.element.mediaQueries}
                style={component.element.style}
                title={component.name}>
                {component.element.children}
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
    </>
  )
}

export default ComponentsDisplay
