'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'

const DocsSidebarNav = ({ items }) => {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div className={cn('pb-8')} key={index}>
          <h4 className="px-2 py-1 mb-1 text-sm font-medium rounded-md">
            {item.title}
          </h4>
          {item.items ? (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          ) : null}
        </div>
      ))}
    </div>
  ) : null
}

export const DocsSidebarNavItems = ({ items, pathname }) => {
  return items?.length ? (
    <div className="grid grid-flow-row text-sm auto-rows-max">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <Link
            className={cn(
              'flex w-full items-center rounded-md p-2 hover:underline',
              {
                'bg-muted': pathname === item.href,
              }
            )}
            href={item.href}
            key={index}
            rel={item.external ? 'noreferrer' : ''}
            target={item.external ? '_blank' : ''}>
            {item.title}
          </Link>
        ) : (
          <span
            className="flex items-center w-full p-2 rounded-md cursor-not-allowed opacity-60"
            key={index}>
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null
}

export default DocsSidebarNav
