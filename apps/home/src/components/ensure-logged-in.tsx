'use client'
import { useRouter } from 'next/navigation'
import useUser from '@/resolvers/use-user'
import { useEffect } from 'react'

const EnsureLoggedIn = () => {
  const { user, isUserLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login')
    }
  }, [isUserLoading, router, user])

  return null
}

export default EnsureLoggedIn
