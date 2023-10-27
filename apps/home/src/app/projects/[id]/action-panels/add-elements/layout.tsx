import Element from './element'
import SectionIcon from '@/icons/elements/section.svg'

const LAYOUT_ELEMENTS = [
  {
    Icon: <SectionIcon className="w-full h-full" />,
    title: 'Section',
    element: 'section',
  },
]

const LayoutElements = () => {
  return (
    <>
      <h1 className="font-medium text-sm">Layout</h1>
      <div className="grid grid-cols-[repeat(var(--grid-cols-count),1fr)] gap-4 flex-wrap">
        {LAYOUT_ELEMENTS.map((element) => (
          <Element
            Icon={element.Icon}
            element={element.element}
            key={element.title}
            title={element.title}
          />
        ))}
      </div>
    </>
  )
}

export default LayoutElements
