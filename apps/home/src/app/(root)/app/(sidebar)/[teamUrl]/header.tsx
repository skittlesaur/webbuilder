import Link from 'next/link'
import useTeam from '@/resolvers/use-team'

const DashboardTeamHeader = () => {
  const { team, isTeamLoading } = useTeam()

  return (
    <div className="flex items-center justify-between h-16 gap-4 px-8 py-3 -mx-8 -mt-6 border-b bg-background border-border">
      {isTeamLoading ? (
        <div className="w-32 rounded animate-pulse bg-accent h-7" />
      ) : (
        <>
          <h1 className="text-xl">{team.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <Link
              className="flex items-center px-3 py-2 transition-all duration-200 border rounded border-border hover:bg-accent hover:text-white"
              href={`/app/${team.url}/create?redirect=/app/${team.url}&redirectTitle=${team.name}`}>
              Create Project
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardTeamHeader
