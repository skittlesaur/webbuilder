import cn from 'classnames'
import { useState } from 'react'
import Variables from './variables'

enum PropertyPanel {
  VARIABLES,
  BODY,
}

const panels = [
  {
    title: 'Variables',
    panel: PropertyPanel.VARIABLES,
  },
  {
    title: 'Body',
    panel: PropertyPanel.BODY,
  },
]

const DefaultProperties = () => {
  const [activePanel, setActivePanel] = useState(PropertyPanel.VARIABLES)

  return (
    <>
      <div className="relative z-[1] bg-background flex items-center w-full px-2 border-b border-border">
        {panels.map((p) => (
          <button
            className={cn('text-xs px-2 py-2', {
              'text-white': activePanel === p.panel,
              'text-white/70': activePanel !== p.panel,
            })}
            key={p.panel}
            type="button"
            onClick={() => setActivePanel(p.panel)}>
            {p.title}
          </button>
        ))}
      </div>
      {activePanel === PropertyPanel.VARIABLES && <Variables />}
    </>
  )
}

export default DefaultProperties
