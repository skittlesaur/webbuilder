import useSWR from 'swr'
import type { AxiosResponse } from 'axios'
import api from '@/lib/api'

const useUserTeams = () => {
  const res = useSWR<AxiosResponse>('/user/teams', (url: string) => api.get(url))

  return {
    userTeams: res.data?.data,
    isUserTeamsLoading: res.isLoading,
    isUserTeamsError: res.error,
    mutateUserTeams: res.mutate,
  }
}

export default useUserTeams
