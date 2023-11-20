'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import BackChevronIcon from '@/icons/chevron-back-outline.svg'

const BackButton = () => {
  const { teamUrl, projectUrl } = useParams()

  return (
    <Link
      className="flex items-center justify-center w-6 h-6 transition-colors duration-150 ease-in-out rounded-sm hover:bg-secondary"
      href={`/dashboard/${teamUrl as string}/${projectUrl as string}`}>
      <BackChevronIcon className="w-4 h-4" />
    </Link>
  )
}

export default BackButton
