import { create } from 'zustand'
import type { ElementStyle } from './canvas-store'
import type { Fill } from '@/app/(root)/app/(no-sidebar)/[teamUrl]/[projectUrl]/[pageId]/properties-panel/element-properties/colors/fill'

export type Tool = 'cursor' | 'hand' | 'zoom'
interface InteractionsStore {
  tool: Tool
  setTool: (tool: Tool) => void
  isDraggingElement: boolean
  setIsDraggingElement: (isDragging: boolean) => void
  hoveredElementId: string | null
  setHoveredElementId: (id: string | null) => void
  selectedElementId: string
  setSelectedElementId: (id: string | null) => void
  selectedMediaQuery: number | null
  setSelectedMediaQuery: (index: number | null) => void
  gradientEditor: (Fill & { type: 'gradient' }) | null
  setGradientEditor: (fill: (Fill & { type: 'gradient' }) | null) => void
  selectedGradientStep: number
  setSelectedGradientStep: (step: number) => void
  selectedState: keyof ElementStyle
  setSelectedState: (state: keyof ElementStyle) => void
}

export const useInteractionsStore = create<InteractionsStore>((set) => ({
  tool: 'cursor',
  setTool: (tool) => {
    set({ tool })
  },
  isDraggingElement: false,
  setIsDraggingElement: (isDragging) => {
    set({ isDraggingElement: isDragging })
  },
  hoveredElementId: null,
  setHoveredElementId: (id) => {
    set({ hoveredElementId: id })
  },
  selectedElementId: 'body',
  setSelectedElementId: (id) => {
    set({ selectedElementId: id ?? 'body' })
    if (id === null) set({ selectedMediaQuery: null })
  },
  selectedMediaQuery: null,
  setSelectedMediaQuery: (index) => {
    set({ selectedMediaQuery: index })
  },
  gradientEditor: null,
  setGradientEditor: (fill) => {
    set({ gradientEditor: fill })
  },
  selectedGradientStep: 0,
  setSelectedGradientStep: (step) => {
    set({ selectedGradientStep: step })
  },
  selectedState: 'default',
  setSelectedState: (state) => {
    set({ selectedState: state })
  },
}))
