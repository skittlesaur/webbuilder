'use client'

import ActionPanelSeparator from '../separator'
import ActionPanelWrapper from '..'
import AddElementsPanelHeader from './header'
import LayoutElements from './layout'
import AddElementsPanelSearch from './search'
import { PanelsEnum } from '@/stores/panels-store'
import type { Element } from '@/stores/canvas-store'

export interface PanelElement {
  Icon: JSX.Element
  title: string
  element: Element['type']
  style: Element['style']
  children?: Element['children']
}

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
