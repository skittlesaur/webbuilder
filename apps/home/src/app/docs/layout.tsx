import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import { mainNav, sidebarNav } from './config'
import DocsSidebarNav from '@/components/sidebar-nav'

const DocsLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
        <div className="flex items-center h-16 gap-8 px-16">
          <div className="flex items-center gap-4">
            <div className="relative w-8 h-8 bg-white rounded">
              <Image
                fill
                alt="Baraa Logo"
                className="object-contain p-1"
                src="https://baraa.app/logo.png"
              />
            </div>
            <h1>
              <span className="font-medium">builder</span>
              <span className="text-sm text-white/70">.baraa.app</span>
            </h1>
          </div>
          <nav className="flex items-center">
            {mainNav.map((item) => (
              <Link
                className={cn('px-2 py-1 text-sm rounded-md', {
                  'text-white/70 hover:bg-accent  hover:text-white':
                    item.href !== '/docs',
                  'text-white': item.href === '/docs',
                })}
                href={item.href}
                key={item.title}>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="w-full px-2 py-4 border-r border-border">
          <DocsSidebarNav items={sidebarNav} />
        </aside>
        <div className="flex flex-col flex-1 gap-2 py-8 px-14">{children}</div>
      </main>
      <footer className="flex items-center justify-center h-16 text-sm border-t border-border text-white/70 hover:[&_a]:text-white [&_a]:underline [&_a]:underline-offset-2">
        <p>
          Built by{' '}
          <Link href="https//baraa.app" target="_blank">
            baraa
          </Link>
          . The source code is available on{' '}
          <Link
            href="https://github.com/skittlesaur/webbuilder"
            target="_blank">
            GitHub
          </Link>
          .
        </p>
      </footer>
    </div>
  )
}

export default DocsLayout
