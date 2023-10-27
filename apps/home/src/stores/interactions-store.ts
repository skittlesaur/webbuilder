import { create } from 'zustand'

interface InteractionsStore {
  hoveredElementId: string | null
  setHoveredElementId: (id: string | null) => void
  selectedElementId: string | null
  setSelectedElementId: (id: string | null) => void
}

export const useInteractionsStore = create<InteractionsStore>((set) => ({
  hoveredElementId: null,
  setHoveredElementId: (id) => { set({ hoveredElementId: id }) },
  selectedElementId: null,
  setSelectedElementId: (id) => { set({ selectedElementId: id }) },
}))