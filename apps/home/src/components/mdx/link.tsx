import Link from 'next/link'
import type { ReactNode } from 'react'

const LinkComponent = ({
  href = '/',
  ...props
}: {
  href?: string
  children: ReactNode
}) => {
  return <Link href={href} {...props} className='text-primary-500 hover:text-primary' />
}

export default LinkComponent
