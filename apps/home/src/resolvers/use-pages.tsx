import useSWR from 'swr'
import type { AxiosResponse } from 'axios'
import { useParams } from 'next/navigation'
import api from '@/lib/api'

const usePages = () => {
  const { teamUrl, projectUrl } = useParams()
  const teamUrlString = Array.isArray(teamUrl) ? teamUrl[0] : teamUrl
  const projectUrlString = Array.isArray(projectUrl)
    ? projectUrl[0]
    : projectUrl

  const res = useSWR<AxiosResponse>(
    `/team/${teamUrlString}/project/${projectUrlString}/pages`,
    (url: string) => api.get(url)
  )

  return {
    pages: res.data?.data,
    isPagesLoading: res.isLoading,
    isPagesError: res.error,
    mutatePages: res.mutate,
  }
}

export default usePages
