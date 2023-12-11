import { useState } from 'react'
import { ContextMenuItem } from 'ui'
import { useCanvasStore } from '@/stores/canvas-store'

const ComponentsDeleteButton = ({ componentId }: { componentId: string }) => {
  const removeComponent = useCanvasStore((s) => s.removeComponent)
  const [isConfirming, setIsConfirming] = useState(false)

  return (
    <ContextMenuItem
      className="!text-red-500"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        if (isConfirming) {
          removeComponent(componentId)
        } else {
          setIsConfirming(true)
        }
      }}>
      {isConfirming ? 'Are you sure?' : 'Delete'}
    </ContextMenuItem>
  )
}

export default ComponentsDeleteButton
