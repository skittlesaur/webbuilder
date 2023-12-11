import type { ReactNode } from 'react'
import DashboardSidebar from './sidebar'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row">
      <DashboardSidebar />
      <div className="flex-1 px-8 py-6">{children}</div>
    </div>
  )
}

export default DashboardLayout
