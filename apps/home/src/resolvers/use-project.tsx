import useSWR from 'swr'
import type { AxiosResponse } from 'axios'
import { useParams } from 'next/navigation'
import api from '@/lib/api'

const useProject = () => {
  const { teamUrl, projectUrl } = useParams()
  const teamUrlString = Array.isArray(teamUrl) ? teamUrl[0] : teamUrl
  const projectUrlString = Array.isArray(projectUrl)
    ? projectUrl[0]
    : projectUrl

  const res = useSWR<AxiosResponse>(
    `/team/${teamUrlString}/project/${projectUrlString}`,
    (url: string) => api.get(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    project: res.data?.data,
    isProjectLoading: res.isLoading,
    isProjectError: res.error,
    mutateProject: res.mutate,
  }
}

export default useProject
