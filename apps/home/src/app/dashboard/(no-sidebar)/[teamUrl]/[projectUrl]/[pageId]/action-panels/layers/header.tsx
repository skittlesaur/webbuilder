import CloseIcon from '@/icons/close-outline.svg'
import { usePanelsStore } from '@/stores/panels-store'

const LayersPanelHeader = () => {
  const setActivePanel = usePanelsStore((s) => s.setActivePanel)

  return (
    <div className="flex items-center justify-between gap-2">
      <p className="font-medium">Layers</p>
      <button
        className="flex items-center justify-center w-6 h-6 -mr-1 transition-colors duration-150 ease-in-out rounded hover:bg-secondary/50"
        type="button"
        onClick={() => {
          setActivePanel(null)
        }}>
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

export default LayersPanelHeader
