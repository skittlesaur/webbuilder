import cn from 'classnames'
import type { DraggedElement } from '@/stores/canvas-store'

const DraggableIndicator = ({
  position,
}: {
  position: DraggedElement['relativePosition']
}) => {
  return (
    <span
      className={cn(
        'block absolute left-1/2 -translate-x-1/2 bg-primary w-1/2 h-1',
        {
          'top-0 -translate-y-1/2': position === 'before',
          'bottom-0 translate-y-1/2': position === 'after',
          'top-1/2 -translate-y-1/2': position === 'child',
        }
      )}>
      <span className="block absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white border-2 border-primary w-3 h-3" />
      <span className="block absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 rounded-full bg-white border-2 border-primary w-3 h-3" />
    </span>
  )
}

export default DraggableIndicator
