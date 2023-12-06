import useSWR from 'swr'
import type { AxiosResponse } from 'axios'
import { useParams } from 'next/navigation'
import api from '@/lib/api'

const useFeedback = () => {
  const { feedbackId } = useParams()
  const feedbackString = Array.isArray(feedbackId) ? feedbackId[0] : feedbackId
  const res = useSWR<AxiosResponse>(
    `/feedback/${feedbackString}`,
    (url: string) => api.get(url)
  )

  return {
    feedback: res.data?.data,
    isFeedbackLoading: res.isLoading,
    isFeedbackError: res.error,
    mutateFeedback: res.mutate,
  }
}

export default useFeedback
