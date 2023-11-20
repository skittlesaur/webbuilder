'use client'

import { useRouter } from 'next/navigation'
import BackChevronIcon from '@/icons/chevron-back-outline.svg'

const BackButton = () => {
  const router = useRouter()
  return (
    <button
      className="w-6 h-6 rounded-sm hover:bg-secondary flex items-center justify-center transition-colors ease-in-out duration-150"
      type="button"
      onClick={() => {
        router.push('/projects')
      }}>
      <BackChevronIcon className="w-4 h-4" />
    </button>
  )
}

export default BackButton
