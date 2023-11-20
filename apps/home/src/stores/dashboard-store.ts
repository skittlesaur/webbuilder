import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DashboardStore {
  sidebarExpanded: boolean
  setSidebarExpanded: (sidebarExpanded: boolean) => void
  activeTeamId: string
  setActiveTeamId: (activeTeamId: string) => void
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, _get) => ({
      sidebarExpanded: false,
      setSidebarExpanded: (sidebarExpanded: boolean) => set({ sidebarExpanded }),
      activeTeamId: '',
      setActiveTeamId: (activeTeamId: string) => set({ activeTeamId }),
    }),
    {
      name: 'dashboard-store',
    }
  )
)
