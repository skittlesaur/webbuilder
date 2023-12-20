'use client'

import { useState } from 'react'

const Image = ({ src, alt }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="flex flex-col items-center gap-4 mx-auto my-6 w-fit">
      <button type="button" onClick={() => setExpanded(!expanded)}>
        <img
          alt={alt}
          className="relative object-contain w-fit max-w-[60rem] max-h-[26rem] overflow-hidden border rounded-lg border-border"
          src={src}
        />
      </button>
      {alt ? <p className="text-sm text-center text-gray-500">{alt}</p> : null}
      {expanded ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center max-h-screen p-10 cursor-default bg-background/80"
          role="button"
          tabIndex={0}
          onClick={() => setExpanded(false)}
          onKeyDown={() => setExpanded(false)}>
          <img alt={alt} className="object-contain w-full h-full" src={src} />
        </div>
      ) : null}
    </div>
  )
}

export default Image
