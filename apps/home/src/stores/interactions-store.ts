import { create } from 'zustand'
import type { Fill } from '@/app/(root)/app/(no-sidebar)/[teamUrl]/[projectUrl]/[pageId]/properties-panel/element-properties/colors/fill'

interface InteractionsStore {
  isDraggingElement: boolean
  setIsDraggingElement: (isDragging: boolean) => void
  hoveredElementId: string | null
  setHoveredElementId: (id: string | null) => void
  selectedElementId: string
  setSelectedElementId: (id: string | null) => void
  selectedMediaQuery: number | null
  setSelectedMediaQuery: (index: number | null) => void
  gradientEditor: Fill & { type: 'gradient' } | null
  setGradientEditor: (fill: Fill & { type: 'gradient' } | null) => void
  selectedGradientStep: number
  setSelectedGradientStep: (step: number) => void
}

export const useInteractionsStore = create<InteractionsStore>((set) => ({
  isDraggingElement: false,
  setIsDraggingElement: (isDragging) => { set({ isDraggingElement: isDragging }) },
  hoveredElementId: null,
  setHoveredElementId: (id) => { set({ hoveredElementId: id }) },
  selectedElementId: 'body',
  setSelectedElementId: (id) => {
    set({ selectedElementId: id ?? 'body' })
    if (id === null) set({ selectedMediaQuery: null })
  },
  selectedMediaQuery: null,
  setSelectedMediaQuery: (index) => { set({ selectedMediaQuery: index }) },
  gradientEditor: null,
  setGradientEditor: (fill) => { set({ gradientEditor: fill }) },
  selectedGradientStep: 0,
  setSelectedGradientStep: (step) => { set({ selectedGradientStep: step }) },
}))