'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from 'ui'
import useMeasure from 'react-use-measure'
import { toast } from 'sonner'
import { useRef, useState } from 'react'
import useUser from '@/resolvers/use-user'
import api from '@/lib/api'
import getErrorMessage from '@/lib/get-error-message'
import useTeam from '@/resolvers/use-team'

const CreateProjectPage = () => {
  const { user, isUserLoading } = useUser()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const redirectTitle = searchParams.get('redirectTitle')
  const router = useRouter()
  const [pRef, pMeasure] = useMeasure()
  const nameRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { team, isTeamLoading } = useTeam()

  if (!team && !isTeamLoading) return router.push('/app')

  const handleCreateProject = async () => {
    const name = nameRef.current?.value

    if (!name) return toast.error('Team name cannot be empty')

    if (name.length < 3)
      return toast.error('Team name must be at least 3 characters')

    if (!url) return toast.error('Team url cannot be empty')

    if (url.length < 3)
      return toast.error('Team url must be at least 3 characters')

    const startsWithDash = url.startsWith('-')
    if (startsWithDash) return toast.error('Team url cannot start with a dash')

    const startsWithNumber = /^\d/.test(url)
    if (startsWithNumber)
      return toast.error('Team url cannot start with a number')

    const hasSpecialCharacters = /[^a-zA-Z0-9-]/.test(url)
    if (hasSpecialCharacters)
      return toast.error(
        'Team url can only contain letters, numbers, and dashes'
      )

    try {
      setIsLoading(true)
      const { data: project } = await api.post(`/team/${team.url}/project`, {
        name,
        url,
      })
      router.push(
        `/app/${team.url}/${project.url}/${project.defaultPageId}`
      )
    } catch (error) {
      toast.error(getErrorMessage(error) as string)
      setIsLoading(false)
    }
  }

  if (!user && !isUserLoading) router.push('/login?redirect=/create')

  return (
    <div className="min-h-[100dvh] max-h-[100dvh] p-8 flex flex-col">
      <div className="flex items-start justify-between w-full text-sm">
        {redirect && redirectTitle ? (
          <Link
            className="px-4 py-2 transition-colors duration-150 ease-in-out rounded hover:bg-accent text-white/80 hover:text-white"
            href={redirect}>
            Return to {redirectTitle}
          </Link>
        ) : (
          <div />
        )}
        {user ? (
          <div className="flex flex-col px-4">
            <p className="text-xs text-white/50">Logged in as:</p>
            <p className="text-white">
              {user?.username} ({user?.email})
            </p>
          </div>
        ) : null}
      </div>
      <div className="max-w-md mx-auto flex-1 w-full flex flex-col gap-8 items-center justify-center pb-[4rem]">
        <div className="flex flex-col w-full gap-4 p-6 border shadow-lg bg-accent border-border rounded-xl">
          <div className="flex flex-col gap-2">
            <label
              className="block text-xs text-white/80"
              htmlFor="project-name">
              Project Name
            </label>
            <Input
              className="w-full"
              id="project-name"
              placeholder="Project Name"
              ref={nameRef}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="block text-xs text-white/80"
              htmlFor="project-url">
              Project URL
            </label>
            <div className="relative">
              <Input
                className="w-full"
                id="project-url"
                placeholder="url"
                style={{
                  paddingRight: pMeasure.width + 12,
                }}
                value={url}
                onChange={(e) => {
                  const value = e.target.value

                  const formatSpaces = value.replace(/\s/g, '-')

                  const removeSpecialCharacters = formatSpaces.replace(
                    /[^a-zA-Z0-9-]/g,
                    ''
                  )

                  const formatDashes = removeSpecialCharacters.replace(
                    /-+/g,
                    '-'
                  )
                  setUrl(formatDashes)
                }}
              />
              <p
                className="absolute text-xs -translate-y-1/2 top-1/2 right-3 text-white/50"
                ref={pRef}>
                .builder.baraa.app
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-xs text-white/80" htmlFor="team">
              Team
            </label>
            <p className="px-4 py-2 text-sm border rounded cursor-not-allowed border-border">
              {team.name}{' '}
              <span className="text-xs text-white/70">({team.url})</span>
            </p>
          </div>
        </div>
        <button
          className="w-full px-4 py-3 text-sm tracking-wide uppercase transition-colors duration-150 ease-in-out rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
          type="button"
          onClick={handleCreateProject}>
          {isLoading ? 'Creating Project...' : 'Create Project'}
        </button>
      </div>
    </div>
  )
}

export default CreateProjectPage
