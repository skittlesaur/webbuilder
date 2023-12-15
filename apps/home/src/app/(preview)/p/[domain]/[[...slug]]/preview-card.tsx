import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ChevronIcon from '@/icons/chevron-forward.svg'
import CloseIcon from '@/icons/close-outline.svg'

const PreviewCard = () => {
  const [hidePreviewCard, setHidePreviewCard] = useState(true)

  useEffect(() => {
    const localStoragePreview = localStorage.getItem('preview-card')
    if (localStoragePreview === 'false') setHidePreviewCard(true)
    else setHidePreviewCard(false)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {!hidePreviewCard && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="fixed origin-center px-8 py-4 bg-white border rounded-md shadow-lg bottom-5 right-5 border-border w-full max-w-[calc(100vw-1.25rem*2)] md:max-w-[23rem] flex flex-col gap-2"
          exit={{ opacity: 0, scale: 0.5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-bold text-black">Preview Mode</h1>
            <button
              className="p-0.5 border border-transparent hover:bg-secondary/5 hover:border-border/50 rounded"
              type="button"
              onClick={() => {
                localStorage.setItem('preview-card', 'false')
                setHidePreviewCard(true)
              }}>
              <CloseIcon className="w-4 h-4 text-black" />
            </button>
          </div>
          <p className="w-full text-sm text-neutral-600">
            This is a preview of your site. You can share this link with others
            to show them your site.
          </p>
          <p className="w-full text-sm text-neutral-600">
            For safety reasons, events are disabled in preview mode.
          </p>
          <Link
            className="flex items-center justify-between w-full px-4 py-2 text-xs text-black border rounded group border-border/20 hover:border-border"
            href="/">
            <p>Start Building</p>
            <ChevronIcon className="w-4 h-4 text-border/20 group-hover:text-border" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PreviewCard
