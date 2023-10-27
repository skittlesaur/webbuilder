'use client'

import ActionPanelWrapper from '..'
import ActionPanelSeparator from '../separator'
import AddElementsPanelHeader from './header'
import LayoutElements from './layout'
import AddElementsPanelSearch from './search'
import { PanelsEnum } from '@/stores/panels-store'

const AddElementsPanel = () => {
  return (
    <ActionPanelWrapper self={PanelsEnum.AddElements}>
      <div className="flex flex-col gap-4">
        <AddElementsPanelHeader />
        <AddElementsPanelSearch />
      </div>
      <ActionPanelSeparator />
      <LayoutElements />
    </ActionPanelWrapper>
  )
}

export default AddElementsPanel
