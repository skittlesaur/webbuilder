'use client'
import { PlusIcon, Component1Icon, LayersIcon } from '@radix-ui/react-icons'
import UserProfile from './profile'
import SideButton from './side-button'
import PagesIcon from '@/icons/pages-outline.svg'
import { PanelsEnum, usePanelsStore } from '@/stores/panels-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import {} from '@/stores/canvas-store'

const ACTIONS = [
  {
    Icon: PlusIcon,
    title: 'Add Elements',
    value: PanelsEnum.AddElements,
  },
  {
    Icon: Component1Icon,
    title: 'Assets & Components',
    value: PanelsEnum.AssetsAndComponents,
  },
  {
    Icon: LayersIcon,
    title: 'Layers',
    value: PanelsEnum.Layers,
  },
  {
    Icon: PagesIcon,
    title: 'Pages & Layouts',
    value: PanelsEnum.PagesAndLayouts,
  },
]

const SideActions = () => {
  const { setSelectedElementId } = useInteractionsStore()
  const { setActivePanel } = usePanelsStore()

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    const target = e.target as HTMLElement | null
    if (!target) return

    const isTargetSelf = target.id === 'side-actions'

    if (isTargetSelf) {
      setSelectedElementId(null)
      setActivePanel(null)
    }
  }

  return (
    <div
      className="select-none relative z-50 px-5 py-6 border-r border-border bg-background flex flex-col h-screen gap-5 items-center outline-none !cursor-default"
      id="side-actions"
      role="button"
      tabIndex={-1}
      onClick={handleClick}
      onKeyDown={() => null}>
      <UserProfile />
      <div className="w-full h-px bg-secondary" />
      <div className="flex flex-col items-center gap-3">
        {ACTIONS.map((action) => (
          <SideButton
            Icon={<action.Icon className="w-5 h-5" />}
            key={action.title}
            title={action.title}
            value={action.value}
          />
        ))}
      </div>
    </div>
  )
}

export default SideActions
