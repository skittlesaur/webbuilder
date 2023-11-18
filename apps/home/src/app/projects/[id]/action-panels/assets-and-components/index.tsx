import ActionPanelWrapper from '..'
import ActionPanelSeparator from '../separator'
import ComponentsDisplay from './components'
import AssetsAndComponentsPanelHeader from './header'
import AssetsImages from './images'
import { PanelsEnum } from '@/stores/panels-store'

const AssetsAndComponentsPanel = () => {
  return (
    <ActionPanelWrapper self={PanelsEnum.AssetsAndComponents}>
      <div className="flex flex-col gap-4">
        <AssetsAndComponentsPanelHeader />
      </div>
      <ActionPanelSeparator />
      <ComponentsDisplay />
      <ActionPanelSeparator />
      <AssetsImages />
    </ActionPanelWrapper>
  )
}

export default AssetsAndComponentsPanel
