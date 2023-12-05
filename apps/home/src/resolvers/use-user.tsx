import useSWR from 'swr'
import type { AxiosResponse } from 'axios'
import api from '@/lib/api'

const useUser = () => {
  const res = useSWR<AxiosResponse>('/user', (url: string) => api.get(url))

  return {
    user: res.data?.data,
    isUserLoading: res.isLoading,
    isUserError: res.error,
    isUserValidating: res.isValidating,
    mutateUser: res.mutate,
  }
}

export default useUser
