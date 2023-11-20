'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import AddElementsPanel from './action-panels/add-elements'
import SideActions from './side-actions'
import TopActions from './top-actions'
import LayersPanel from './action-panels/layers'
import './fonts.css'
import AssetsAndComponentsPanel from './action-panels/assets-and-components'
import { useCanvasStore } from '@/stores/canvas-store'
import useProjectPage from '@/resolvers/use-project-page'
import useProject from '@/resolvers/use-project'

const DevTools = dynamic(() => import('./dev-tools'), { ssr: false })
const Canvas = dynamic(() => import('./canvas'), { ssr: false })
const PropertiesPanel = dynamic(() => import('./properties-panel'), {
  ssr: false,
})

const ProjectsPage = () => {
  const [projectLoaded, setProjectLoaded] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  
  const setStoredProject = useCanvasStore((s) => s.setProject)
  const setStoredPageId = useCanvasStore((s) => s.setPageId)
  const setElements = useCanvasStore((s) => s.setElements)
  const setBodyStyles = useCanvasStore((s) => s.setBodyStyles)
  const setCustomFonts = useCanvasStore((s) => s.setCustomFonts)
  const setAssets = useCanvasStore((s) => s.setAssets)
  const setComponents = useCanvasStore((s) => s.setComponents)
  const setZoom = useCanvasStore((s) => s.setZoom)
  const setPan = useCanvasStore((s) => s.setPan)
  const { project } = useProject()
  const { projectPage } = useProjectPage()

  useEffect(() => {
    if (projectPage) {
      setStoredPageId(projectPage.id)
      setElements(projectPage.elements)
      setZoom(projectPage.zoom ?? 1)
      setPan({
        x: projectPage.panX ?? 0,
        y: projectPage.panY ?? 0,
      })
      setBodyStyles(projectPage.bodyStyles)
      setCustomFonts(projectPage.customFonts)
      setAssets(projectPage.assets)
      setComponents(projectPage.components)
      setPageLoaded(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
  }, [projectPage])

  useEffect(() => {
    if (project) {
      setStoredProject({
        name: project.name,
        url: project.url,
        pages: project.pages.map((page) => ({
          id: page.id,
          path: page.path,
        })),
      })
      setProjectLoaded(true)
    }
  }, [project, setStoredProject])

  if (!projectLoaded || !pageLoaded) return null

  return (
    <div className="relative flex w-screen h-screen overflow-hidden">
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
