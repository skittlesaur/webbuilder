'use client'
import ActionPanelWrapper from '..'
import AddElementsPanelHeader from './header'
import LayoutElements from './layout'
import TypographyElements from './typography'
import { PanelsEnum } from '@/stores/panels-store'
import type { Element } from '@/stores/canvas-store'
import ScrollableWrapper from '@/components/scrollable-wrapper'
import BasicElements from './basic'
import MediaElements from './media'
import FormsElements from './forms'

export interface PanelElement {
  Icon: JSX.Element
  title: string
  element: Element['type']
  style: Element['style']
  children?: Element['children']
  attributes?: Element['attributes']
  mediaQueries?: Element['mediaQueries']
}

const DividerElement = () => {
  return <div className="w-[calc(100%+1.25rem*2)] h-px bg-border -ml-5" />
}

const AddElementsPanel = () => {
  return (
    <ActionPanelWrapper self={PanelsEnum.AddElements}>
      <div className="flex flex-col gap-4 px-5 pt-6 -mx-5 -mt-6 pb-6 border-b border-border bg-background relative z-[1]">
        <AddElementsPanelHeader />
      </div>
      <ScrollableWrapper>
        <div className="flex flex-col gap-8">
          <LayoutElements />
          <DividerElement />
          <BasicElements />
          <DividerElement />
          <TypographyElements />
          <DividerElement />
          <MediaElements />
          <DividerElement />
          <FormsElements />
        </div>
      </ScrollableWrapper>
    </ActionPanelWrapper>
  )
}

export default AddElementsPanel
