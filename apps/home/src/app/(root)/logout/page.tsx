'use client'
import { useEffect } from 'react'
import useUser from '@/resolvers/use-user'
import FullLoader from '@/components/full-loader'
import api from '@/lib/api'

const LogoutPage = () => {
  const { mutateUser } = useUser()

  useEffect(() => {
    const logout = async () => {
      await api.post('/auth/logout')
      await mutateUser()
      window.location.href = '/login'
    }

    void logout()
  }, [mutateUser])

  return <FullLoader title="Logging you out..." />
}

export default LogoutPage
