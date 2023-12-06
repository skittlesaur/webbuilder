'use client'
import ActionPanelWrapper from '..'
import LayersPanelHeader from './header'
import LayersList from './list'
import { PanelsEnum } from '@/stores/panels-store'

const LayersPanel = () => {
  return (
    <ActionPanelWrapper self={PanelsEnum.Layers}>
      <div className="flex flex-col gap-4 px-5 pt-6 -mx-5 -mt-6 pb-6 border-b border-border bg-background relative z-[1]">
        <LayersPanelHeader />
      </div>
      <LayersList />
    </ActionPanelWrapper>
  )
}

export default LayersPanel
