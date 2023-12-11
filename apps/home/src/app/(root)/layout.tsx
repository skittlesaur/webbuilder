import '../globals.css'
import 'ui/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import cn from 'classnames'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'baraa.app',
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'bg-background text-text w-screen h-screen'
        )}>
        <Toaster position="bottom-center" theme="light" />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
