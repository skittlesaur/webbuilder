'use client'
import ActionPanelWrapper from '..'
import LayersPanelSearch from './search'
import LayersPanelHeader from './header'
import LayersList from './list'
import { PanelsEnum } from '@/stores/panels-store'

const LayersPanel = () => {
  return (
    <ActionPanelWrapper self={PanelsEnum.Layers}>
      <div className="flex flex-col gap-4">
        <LayersPanelHeader />
        <LayersPanelSearch />
      </div>
      <LayersList />
    </ActionPanelWrapper>
  )
}

export default LayersPanel
