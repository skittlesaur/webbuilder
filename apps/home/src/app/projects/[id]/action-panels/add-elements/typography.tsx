import { createId } from '@paralleldrive/cuid2'
import Element from './element'
import type { PanelElement } from '.'
import HeadingIcon from '@/icons/elements/heading.svg'
import ParagraphIcon from '@/icons/elements/paragraph.svg'
import TextLinkIcon from '@/icons/elements/text-link.svg'

const TYPOGRAPHY_ELEMENTS: PanelElement[] = [
  {
    Icon: <HeadingIcon className="w-full h-full" />,
    title: 'Heading',
    element: 'h1',
    style: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: '1.25',
      letterSpacing: '-0.025em',
    },
    children: ['Heading'],
  },
  {
    Icon: <ParagraphIcon className="w-full h-full" />,
    title: 'Paragraph',
    element: 'p',
    style: {
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    children: ['Paragraph'],
  },
  {
    Icon: <TextLinkIcon className="w-full h-full" />,
    title: 'Text Link',
    element: 'a',
    style: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#0070f3',
      textDecoration: 'underline',
    },
    children: [
      {
        id: createId(),
        type: 'span',
        children: ['Text Link'],
        style: {},
      },
    ],
    attributes: {
      href: 'https://baraa.app',
      rel: 'noopener noreferrer',
      target: '_blank',
    },
  },
]

const TypographyElements = () => {
  return (
    <>
      <h1 className="font-medium text-sm">Typography</h1>
      <div className="grid grid-cols-[repeat(var(--grid-cols-count),1fr)] gap-4 flex-wrap">
        {TYPOGRAPHY_ELEMENTS.map((element) => (
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

export default TypographyElements
