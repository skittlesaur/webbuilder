import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum PanelsEnum {
  AddElements = 'add-elements',
  AssetsAndComponents = 'assets-and-components',
  Layers = 'layers',
  PagesAndLayouts = 'pages-and-layouts',
}

interface PanelsStore {
  activePanel: PanelsEnum | null
  previousPanel: PanelsEnum | null
  setActivePanel: (panel: PanelsEnum | null) => void
  panelWidth: number
  setPanelWidth: (width: number) => void
}

export const usePanelsStore = create<PanelsStore>()(
  persist(
    (set, get) => ({
      activePanel: null,
      previousPanel: null,
      setActivePanel: (panel) => {
        const closed = panel === null
        if (closed) {
          set({
            previousPanel: null,
            activePanel: null,
          })
        } else {
          set({
            previousPanel: get().activePanel,
            activePanel: panel
          })
        }
      },
      panelWidth: 0,
      setPanelWidth: (width) => {
        set({ panelWidth: width })
      },
    }),
    {
      name: 'panels-store',
      skipHydration: true,
    }
  )
)
