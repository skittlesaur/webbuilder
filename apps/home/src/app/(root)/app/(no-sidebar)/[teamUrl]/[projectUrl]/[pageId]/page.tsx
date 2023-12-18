'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import AddElementsPanel from './action-panels/add-elements'
import SideActions from './side-actions'
import TopActions from './top-actions'
import LayersPanel from './action-panels/layers'
import './fonts.css'
import AssetsAndComponentsPanel from './action-panels/assets-and-components'
import PagesPanel from './action-panels/pages'
import StateIndicator from './state-indicator'
import Instructions from './instructions'
import { useCanvasStore } from '@/stores/canvas-store'
import useProjectPage from '@/resolvers/use-project-page'
import FullLoader from '@/components/full-loader'
import useUser from '@/resolvers/use-user'

const DevTools = dynamic(() => import('./dev-tools'), { ssr: false })
const Canvas = dynamic(() => import('./canvas'), { ssr: false })
const PropertiesPanel = dynamic(() => import('./properties-panel'), {
  ssr: false,
})

const ProjectsPage = () => {
  const [pageLoaded, setPageLoaded] = useState(false)

  const variables = useCanvasStore((s) => s.variables) || []

  const setElements = useCanvasStore((s) => s.setElements)
  const setBodyStyles = useCanvasStore((s) => s.setBodyStyles)
  const setCustomFonts = useCanvasStore((s) => s.setCustomFonts)
  const setAssets = useCanvasStore((s) => s.setAssets)
  const setComponents = useCanvasStore((s) => s.setComponents)
  const setZoom = useCanvasStore((s) => s.setZoom)
  const setPan = useCanvasStore((s) => s.setPan)
  const setVariables = useCanvasStore((s) => s.setVariables)
  const setCompletedInstructions = useCanvasStore(
    (s) => s.setCompletedInstructions
  )
  const { projectPage } = useProjectPage()
  const { user } = useUser()

  useEffect(() => {
    if (projectPage) {
      setElements(projectPage.elements)
      setZoom(projectPage.zoom ?? 1)
      setPan({
        x: projectPage.panX ?? 0,
        y: projectPage.panY ?? 0,
      })
      setBodyStyles(projectPage.bodyStyles)
      setCustomFonts(projectPage.customFonts)
      setAssets(projectPage.assets)
      setVariables(projectPage.variables || [])
      setComponents(projectPage.components)
      setPageLoaded(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
  }, [projectPage])

  useEffect(() => {
    if (user) {
      setCompletedInstructions(user.onboarded)
    }
  }, [setCompletedInstructions, user])

  if (!pageLoaded || !user) return <FullLoader title="Loading Project" />

  return (
    <div
      className="relative flex w-screen h-screen overflow-hidden"
      style={variables.reduce((prev, curr) => {
        prev[`--${curr.name.toLowerCase().replace(/ /g, '-')}`] = curr.value
        return prev
      }, {})}>
      <Instructions />
      <DevTools />
      <SideActions />
      <div className="flex flex-col flex-1">
        <TopActions />
        <div className="relative flex-1">
          <AddElementsPanel />
          <LayersPanel />
          <AssetsAndComponentsPanel />
          <PagesPanel />
          <Canvas />
          <PropertiesPanel />
          <StateIndicator />
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage
