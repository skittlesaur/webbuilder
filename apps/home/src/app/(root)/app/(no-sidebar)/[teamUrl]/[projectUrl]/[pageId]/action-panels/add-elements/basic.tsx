import { createId } from '@paralleldrive/cuid2'
import Element from './element'
import type { PanelElement } from '.'
import DivBlockIcon from '@/icons/elements/div-block.svg'
import ListItemIcon from '@/icons/elements/list-item.svg'
import ButtonIcon from '@/icons/elements/button.svg'
import SpanIcon from '@/icons/elements/span.svg'

const BASIC_ELEMENTS: PanelElement[] = [
  {
    Icon: <DivBlockIcon className="w-full h-full" />,
    title: 'Div Block',
    element: 'div',
    style: {},
    children: [],
  },
  {
    Icon: <ListItemIcon className="w-full h-full" />,
    title: 'List Item',
    element: 'li',
    style: {
      listStyleType: 'disc',
    },
    children: ['List Item'],
  },
  {
    Icon: <SpanIcon className="w-full h-full" />,
    title: 'Span',
    element: 'span',
    style: {},
    children: ['Span'],
  },
  {
    Icon: <ButtonIcon className="w-full h-full" />,
    title: 'Button',
    element: 'button',
    style: {
      backgroundColor: '#000000',
      color: '#ffffff',
      borderRadius: '0.25rem',
      width: 'fit-content',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
    children: [
      {
        id: createId(),
        type: 'span',
        style: {},
        children: ['Button'],
      },
    ],
  },
]

const BasicElements = () => {
  return (
    <>
      <h1 className="text-sm font-medium">Basic</h1>
      <div className="grid grid-cols-[repeat(var(--grid-cols-count),1fr)] gap-4 flex-wrap">
        {BASIC_ELEMENTS.map((element) => (
          <Element
            Icon={element.Icon}
            attributes={element.attributes}
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

export default BasicElements
