import Link from 'next/link'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from 'ui'
import { useParams } from 'next/navigation'
import cn from 'classnames'
import useUserTeams from '@/resolvers/use-user-teams'
import AddIcon from '@/icons/add.svg'

const SidebarCreateTeamButton = () => {
  return (
    <TooltipProvider disableHoverableContent delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className="w-6 h-6 hover:bg-secondary/50 rounded flex items-center justify-center transition-colors ease-in-out duration-150"
            href="/create?redirect=/dashboard&redirectTitle=Dashboard"
            type="button">
            <AddIcon className="w-4 h-4" />
          </Link>
        </TooltipTrigger>
        <TooltipContent className="h-8" side="right" sideOffset={8}>
          Create a new team
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const SidebarTeams = () => {
  const { userTeams, isUserTeamsLoading } = useUserTeams()
  const { teamUrl } = useParams()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-medium text-white/50 uppercase text-xs">
          My Teams
        </h2>
        <SidebarCreateTeamButton />
      </div>
      <div className="flex flex-col gap-1">
        {isUserTeamsLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                className="animate-pulse w-full h-6 bg-accent rounded-md"
                key={i}
              />
            ))}
          </>
        ) : null}
        {userTeams?.length === 0 && !isUserTeamsLoading ? (
          <p className="text-xs text-white/60">
            You don&apos;t have any teams.{' '}
            <Link
              className="text-white/80 hover:text-white"
              href="/create?redirect=/dashboard&redirectTitle=Dashboard">
              Create a new team
            </Link>
            .
          </p>
        ) : null}
        {userTeams?.map((team) => (
          <Link
            className={cn(
              'px-3 -mx-3 py-2 rounded transition-colors ease-in-out duration-150',
              {
                'bg-secondary/50 text-white': teamUrl === team.url,
                'text-white/80 hover:text-white hover:bg-secondary/30':
                  teamUrl !== team.url,
              }
            )}
            href={`/dashboard/${team.url}`}
            key={team.id}>
            {team.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SidebarTeams
