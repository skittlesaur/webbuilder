import Link from 'next/link'
import useTeam from '@/resolvers/use-team'

const DashboardTeamHeader = () => {
  const { team, isTeamLoading } = useTeam()

  return (
    <div className="h-16 bg-background border-b border-border -mx-8 -mt-6 px-8 py-3 flex items-center justify-between gap-4">
      {isTeamLoading ? (
        <div className="animate-pulse bg-accent h-7 rounded w-32" />
      ) : (
        <>
          <h1 className="text-xl">{team.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <Link
              className="px-3 py-2 border border-border rounded flex items-center hover:bg-accent hover:text-white transition-all duration-200"
              href={`/dashboard/${team.url}/create?redirect=/dashboard/${team.url}&redirectTitle=${team.name}`}>
              Create Project
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardTeamHeader
