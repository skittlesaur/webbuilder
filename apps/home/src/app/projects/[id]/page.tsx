'use client'
import dynamic from 'next/dynamic'
import AddElementsPanel from './action-panels/add-elements'
import SideActions from './side-actions'
import TopActions from './top-actions'
import LayersPanel from './action-panels/layers'
import './fonts.css'
import AssetsAndComponentsPanel from './action-panels/assets-and-components'

const DevTools = dynamic(() => import('./dev-tools'), { ssr: false })
const Canvas = dynamic(() => import('./canvas'), { ssr: false })
const PropertiesPanel = dynamic(() => import('./properties-panel'), {
  ssr: false,
})

const ProjectsPage = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden relative">
      <DevTools />
      <SideActions />
      <div className="flex flex-col flex-1">
        <TopActions />
        <div className="relative flex-1">
          <AddElementsPanel />
          <LayersPanel />
          <AssetsAndComponentsPanel />
          <Canvas />
          <PropertiesPanel />
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage
