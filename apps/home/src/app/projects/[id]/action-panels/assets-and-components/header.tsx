import CloseIcon from '@/icons/close-outline.svg'
import { usePanelsStore } from '@/stores/panels-store'

const AssetsAndComponentsPanelHeader = () => {
  const setActivePanel = usePanelsStore((s) => s.setActivePanel)

  return (
    <div className="flex items-center justify-between gap-2">
      <p className="font-medium">
        Assets & Components
      </p>
      <button
        className="w-6 h-6 hover:bg-secondary/50 rounded flex items-center justify-center transition-colors ease-in-out duration-150 -mr-1"
        type="button"
        onClick={() => {
          setActivePanel(null)
        }}>
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

export default AssetsAndComponentsPanelHeader
