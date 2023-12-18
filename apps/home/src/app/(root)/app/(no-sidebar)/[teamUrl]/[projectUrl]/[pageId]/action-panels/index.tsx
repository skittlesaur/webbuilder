import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'
import { usePanelsStore, type PanelsEnum } from '@/stores/panels-store'

const ActionPanelWrapper = ({
  children,
  self,
}: {
  children: React.ReactNode
  self: PanelsEnum
}) => {
  const activePanel = usePanelsStore((s) => s.activePanel)
  const previousPanel = usePanelsStore((s) => s.previousPanel)
  const panelWidth = usePanelsStore((s) => s.panelWidth)
  const setPanelWidth = usePanelsStore((s) => s.setPanelWidth)
  const [isResizing, setIsResizing] = useState(false)
  const [ref, bounds] = useMeasure()

  const handleResizeStart = () => {
    setIsResizing(true)
  }

  useEffect(() => {
    if (!isResizing) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = e.clientX - bounds.left
      setPanelWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [bounds.left, isResizing, setPanelWidth])

  const getGridColsCount = () => {
    if (panelWidth < 320) {
      return 3
    }

    if (panelWidth < 400) {
      return 4
    }

    return 5
  }

  return (
    <AnimatePresence mode="wait">
      {activePanel === self && (
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          className="min-w-[16rem] max-w-[30rem] absolute z-40 left-0 top-0 bottom-0 border-r border-border px-5 py-6 flex flex-col gap-8 bg-background/80 backdrop-blur"
          exit={{
            x: previousPanel === null || activePanel === null ? '-100%' : 0,
            opacity: 0,
          }}
          id={`${self}-panel`}
          initial={{ x: previousPanel === null ? '-100%' : 0, opacity: 0 }}
          ref={ref}
          style={
            {
              width: panelWidth,
              '--grid-cols-count': getGridColsCount(),
            } as React.CSSProperties
          }
          transition={{ ease: 'easeInOut', duration: 0.2 }}>
          <div
            className="w-2 absolute right-0 translate-x-1/2 top-0 bottom-0 !cursor-col-resize select-none z-50"
            role="button"
            tabIndex={-1}
            onMouseDown={handleResizeStart}
          />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ActionPanelWrapper
