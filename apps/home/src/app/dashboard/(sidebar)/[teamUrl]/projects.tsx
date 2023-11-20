import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from 'ui'
import useTeamProjects from '@/resolvers/use-team-projects'
import getTimeAgo from '@/lib/time-ago'

const DashboardTeamProjects = () => {
  const { teamProjects, isTeamProjectsLoading } = useTeamProjects()
  const { teamUrl } = useParams()

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-lg font-light">Projects</h1>
      <div className="grid grid-cols-4 gap-4">
        {isTeamProjectsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div className="flex flex-col gap-3" key={i}>
                <div className="flex items-center justify-center w-full aspect-video bg-accent rounded-lg border border-border" />
                <div className="flex flex-col gap-1">
                  <div className="w-1/2 h-3 bg-accent rounded" />
                  <div className="w-1/4 h-3 bg-accent rounded" />
                </div>
              </div>
            ))
          : null}
        {teamProjects?.map((project) => {
          const user = project.lastEditedBy || project.createdBy
          const name = user.name || user.username
          const twoCharsName = name.slice(0, 2).toUpperCase()

          return (
            <Link
              className="flex flex-col gap-3 group"
              href={`/dashboard/${teamUrl as string}/${project.url}/${project.pages?.[0]?.id ?? ''}`}
              key={project.id}>
              <div className="flex items-center justify-center w-full aspect-video bg-accent rounded-lg border border-border group-hover:border-primary transition-colors ease-in-out duration-150">
                @todo: screenshot
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white">{project.name}</p>
                <div className="flex items-center gap-2">
                  <Avatar className="!w-5 !h-5">
                    <AvatarImage alt={`${name}'s avatar`} src={user.avatar} />
                    <AvatarFallback className="!text-[8px]">
                      {twoCharsName}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-white/50 text-sm">
                    {project.lastEditedBy ? 'Edited' : 'Created'}{' '}
                    {getTimeAgo(new Date(project.updatedAt as string))}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardTeamProjects
