import Element from './element'
import type { PanelElement } from '.'
import ImageIcon from '@/icons/elements/image.svg'
import VideoIcon from '@/icons/elements/video.svg'

const MEDIA_ELEMENTS: PanelElement[] = [
  {
    Icon: <ImageIcon className="w-full h-full" />,
    title: 'Image',
    element: 'img',
    style: {
      default: {
        objectFit: 'cover',
        width: '150px',
        height: '100px',
      },
    },
    attributes: {
      src: '/placeholder.jpeg',
      alt: '',
    },
  },
  {
    Icon: <VideoIcon className="w-full h-full" />,
    title: 'Video',
    element: 'video',
    style: {
      default: {
        width: '400px',
        height: '225px',
      },
    },
    attributes: {
      src: '',
    },
  },
]

const MediaElements = () => {
  return (
    <>
      <h1 className="text-sm font-medium">Media</h1>
      <div className="grid grid-cols-[repeat(var(--grid-cols-count),1fr)] gap-4 flex-wrap">
        {MEDIA_ELEMENTS.map((element) => (
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

export default MediaElements
