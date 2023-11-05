'use client'

import ActionPanelSeparator from '../separator'
import ActionPanelWrapper from '..'
import AddElementsPanelHeader from './header'
import LayoutElements from './layout'
import AddElementsPanelSearch from './search'
import TypographyElements from './typography'
import { PanelsEnum } from '@/stores/panels-store'
import type { Element } from '@/stores/canvas-store'

export interface PanelElement {
  Icon: JSX.Element
  title: string
  element: Element['type']
  style: Element['style']
  children?: Element['children']
  attributes?: Element['attributes']
}

const DividerElement = () => {
  return <div className="w-[calc(100%+1.25rem*2)] h-px bg-border -ml-5" />
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
      <DividerElement />
      <TypographyElements />
    </ActionPanelWrapper>
  )
}

export default AddElementsPanel
