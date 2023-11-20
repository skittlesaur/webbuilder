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

  if (!team && !isTeamLoading) return router.push('/dashboard')

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
        `/dashboard/${team.url}/${project.url}/${project.defaultPageId}`
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
            className="px-4 py-2 rounded hover:bg-accent text-white/80 hover:text-white transition-colors ease-in-out duration-150"
            href={redirect}>
            Return to {redirectTitle}
          </Link>
        ) : (
          <div />
        )}
        {user ? (
          <div className="flex flex-col px-4">
            <p className="text-white/50 text-xs">Logged in as:</p>
            <p className="text-white">
              {user?.username} ({user?.email})
            </p>
          </div>
        ) : null}
      </div>
      <div className="max-w-md mx-auto flex-1 w-full flex flex-col gap-8 items-center justify-center pb-[4rem]">
        <div className="w-full p-6 bg-accent border border-border shadow-lg rounded-xl flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="block text-white/80 text-xs"
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
              className="block text-white/80 text-xs"
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
                className="text-xs absolute top-1/2 -translate-y-1/2 right-3 text-white/50"
                ref={pRef}>
                .builder.baraa.app
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-white/80 text-xs" htmlFor="team">
              Team
            </label>
            <p className="px-4 border border-border rounded py-2 text-sm cursor-not-allowed">
              {team.name}{' '}
              <span className="text-white/70 text-xs">({team.url})</span>
            </p>
          </div>
        </div>
        <button
          className="text-sm w-full px-4 py-3 rounded-lg bg-primary uppercase tracking-wide hover:bg-primary/90 transition-colors ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
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
