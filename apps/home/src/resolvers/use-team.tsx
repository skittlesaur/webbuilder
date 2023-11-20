import useSWR from 'swr'
import type { AxiosResponse } from 'axios'
import { useParams } from 'next/navigation'
import api from '@/lib/api'

const useTeam = () => {
  const { teamUrl } = useParams()
  const teamUrlString = Array.isArray(teamUrl) ? teamUrl[0] : teamUrl
  const res = useSWR<AxiosResponse>(`/team/${teamUrlString}`, (url: string) =>
    api.get(url)
  )

  return {
    team: res.data?.data,
    isTeamLoading: res.isLoading,
    isTeamError: res.error,
    mutateTeam: res.mutate,
  }
}

export default useTeam
