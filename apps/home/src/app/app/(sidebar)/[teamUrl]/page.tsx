'use client'

import DashboardTeamHeader from './header'
import DashboardTeamProjects from './projects'

const DashboardTeamPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <DashboardTeamHeader />
      <DashboardTeamProjects />
    </div>
  )
}

export default DashboardTeamPage
