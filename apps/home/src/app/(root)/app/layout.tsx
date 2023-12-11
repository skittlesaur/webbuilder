'use client'
import EnsureLoggedIn from '@/components/ensure-logged-in'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <EnsureLoggedIn ensureVerified />
      {children}
    </div>
  )
}

export default DashboardLayout
