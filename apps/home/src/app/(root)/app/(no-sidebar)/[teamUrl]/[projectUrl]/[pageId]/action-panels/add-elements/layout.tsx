import { createId } from '@paralleldrive/cuid2'
import Element from './element'
import type { PanelElement } from '.'
import SectionIcon from '@/icons/elements/section.svg'
import ContainerIcon from '@/icons/elements/container.svg'
import GridIcon from '@/icons/elements/grid.svg'
import ColumnsIcon from '@/icons/elements/columns.svg'
import ListIcon from '@/icons/elements/list.svg'

const LAYOUT_ELEMENTS: PanelElement[] = [
  {
    Icon: <SectionIcon className="w-full h-full" />,
    title: 'Section',
    element: 'section',
    style: {},
    children: [],
  },
  {
    Icon: <ContainerIcon className="w-full h-full" />,
    title: 'Container',
    element: 'div',
    style: {},
    children: [],
  },
  {
    Icon: <GridIcon className="w-full h-full" />,
    title: 'Grid',
    element: 'div',
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      width: '100%',
      gap: '1rem',
    },
    children: Array.from({ length: 4 }).map(() => ({
      id: createId(),
      type: 'div',
      children: [],
      style: {},
    })),
  },
  {
    Icon: <ColumnsIcon className="w-full h-full" />,
    title: 'Columns',
    element: 'div',
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      width: '100%',
      minHeight: '10rem',
      height: '100%',
      gap: '1rem',
    },
    children: Array.from({ length: 3 }).map(() => ({
      id: createId(),
      type: 'div',
      children: [],
      style: {
        flex: 1,
      },
    })),
  },
  {
    Icon: <ListIcon className="w-full h-full" />,
    title: 'List',
    element: 'ul',
    style: {
      listStyleType: 'none',
      width: '100%',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    children: Array.from({ length: 3 }).map(() => ({
      id: createId(),
      type: 'li',
      children: [],
      style: {},
    })),
  },
]

const LayoutElements = () => {
  return (
    <>
      <h1 className="text-sm font-medium">Layout</h1>
      <div className="grid grid-cols-[repeat(var(--grid-cols-count),1fr)] gap-4 flex-wrap">
        {LAYOUT_ELEMENTS.map((element) => (
          <Element
            Icon={element.Icon}
            element={element.element}
            key={element.title}
            style={element.style}
            title={element.title}>
            {element.children}
          </Element>
        ))}
      </div>
    </>
  )
}

export default LayoutElements
