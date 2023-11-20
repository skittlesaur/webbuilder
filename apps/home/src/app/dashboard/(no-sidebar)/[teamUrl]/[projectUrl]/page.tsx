'use client'

import { useParams, useRouter } from 'next/navigation'

const ProjectPage = () => {
  const { teamUrl } = useParams()
  const router = useRouter()

  if (teamUrl) router.push(`/dashboard/${teamUrl as string}`)

  return null
}

export default ProjectPage
