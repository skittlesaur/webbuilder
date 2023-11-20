import useSWR from 'swr'
import type { AxiosResponse } from 'axios'
import { useParams } from 'next/navigation'
import api from '@/lib/api'

const useProjectPage = () => {
  const { teamUrl, projectUrl, pageId } = useParams()
  const teamUrlString = Array.isArray(teamUrl) ? teamUrl[0] : teamUrl
  const projectUrlString = Array.isArray(projectUrl)
    ? projectUrl[0]
    : projectUrl
  const pageIdString = Array.isArray(pageId) ? pageId[0] : pageId

  const res = useSWR<AxiosResponse>(
    `/team/${teamUrlString}/project/${projectUrlString}/page/${pageIdString}`,
    (url: string) => api.get(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      refreshInterval: 0,
    }
  )

  return {
    projectPage: res.data?.data,
    isProjectPageLoading: res.isLoading,
    isProjectPageError: res.error,
    mutateProjectPage: res.mutate,
  }
}

export default useProjectPage
