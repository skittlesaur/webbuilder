'use client'
import SidebarTeams from './teams'
import SidebarTitle from './title'
import SidebarUser from './user'

const DashboardSidebar = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-between px-5 py-6 w-[16rem] border-r border-border bg-background min-h-[100dvh] max-h-[100dvh] sticky top-0">
      <SidebarTitle />
      <div className="flex flex-col flex-1 w-full text-sm">
        <SidebarTeams />
      </div>
      <SidebarUser />
    </div>
  )
}

export default DashboardSidebar
