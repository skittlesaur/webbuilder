import ActionPanelWrapper from '..'
import ComponentsDisplay from './components'
import AssetsAndComponentsPanelHeader from './header'
import AssetsImages from './images'
import ScrollableWrapper from '@/components/scrollable-wrapper'
import { PanelsEnum } from '@/stores/panels-store'

const AssetsAndComponentsPanel = () => {
  return (
    <ActionPanelWrapper self={PanelsEnum.AssetsAndComponents}>
      <div className="flex flex-col gap-4 px-5 pt-6 -mx-5 -mt-6 pb-6 border-b border-border bg-background relative z-[1]">
        <AssetsAndComponentsPanelHeader />
      </div>
      <ScrollableWrapper>
        <div className="flex flex-col gap-8">
          <ComponentsDisplay />
          <AssetsImages />
        </div>
      </ScrollableWrapper>
    </ActionPanelWrapper>
  )
}

export default AssetsAndComponentsPanel
