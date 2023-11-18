import { useState } from 'react'
import { ContextMenuItem } from 'ui'
import { useCanvasStore } from '@/stores/canvas-store'

const AssetsDeleteImageButton = ({ assetId }: { assetId: string }) => {
  const deleteAsset = useCanvasStore((s) => s.deleteAsset)
  const [isConfirming, setIsConfirming] = useState(false)

  return (
    <ContextMenuItem
      className="!text-red-500"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        if (isConfirming) {
          deleteAsset(assetId)
        } else {
          setIsConfirming(true)
        }
      }}>
      {isConfirming ? 'Are you sure?' : 'Delete'}
    </ContextMenuItem>
  )
}

export default AssetsDeleteImageButton
