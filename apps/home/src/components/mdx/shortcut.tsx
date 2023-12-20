'use client'

import { useEffect, useState } from 'react'

const Shortcut = ({ cmd, keys }) => {
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    const agent = navigator.userAgent.toLowerCase()
    setIsMac(agent.includes('mac'))
  }, [])
  
  return (
    <span className="inline-flex px-1.5 py-0.5 text-sm border rounded bg-accent border-border">
      {cmd ? <>{isMac ? '⌘' : 'Ctrl'}</> : null}
      {keys?.join(', ')}
    </span>
  )
}

export default Shortcut
