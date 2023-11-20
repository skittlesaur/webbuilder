import useSWR from 'swr'
import type { AxiosResponse } from 'axios'
import { useParams } from 'next/navigation'
import api from '@/lib/api'

const useTeamProjects = () => {
  const { teamUrl } = useParams()
  const teamUrlString = Array.isArray(teamUrl) ? teamUrl[0] : teamUrl
  const res = useSWR<AxiosResponse>(
    `/team/${teamUrlString}/projects`,
    (url: string) => api.get(url)
  )

  return {
    teamProjects: res.data?.data,
    isTeamProjectsLoading: res.isLoading,
    isTeamProjectsError: res.error,
    mutateTeamProjects: res.mutate,
  }
}

export default useTeamProjects
