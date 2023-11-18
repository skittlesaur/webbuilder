import ActionPanelWrapper from '..'
import ActionPanelSeparator from '../separator'
import AssetsDisplay from './assets'
import AssetsAndComponentsPanelHeader from './header'
import { PanelsEnum } from '@/stores/panels-store'

const AssetsAndComponentsPanel = () => {
  return (
    <ActionPanelWrapper self={PanelsEnum.AssetsAndComponents}>
      <div className="flex flex-col gap-4">
        <AssetsAndComponentsPanelHeader />
      </div>
      <ActionPanelSeparator />
      <AssetsDisplay />
    </ActionPanelWrapper>
  )
}

export default AssetsAndComponentsPanel
