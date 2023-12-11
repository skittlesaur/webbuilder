'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useUser from '@/resolvers/use-user'

interface EnsureLoggedInProps {
  ensureVerified?: boolean
}

const EnsureLoggedIn = ({ ensureVerified }: EnsureLoggedInProps) => {
  const { user, isUserLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isUserLoading) return

    if (!user) {
      router.push('/login')
    }

    if (ensureVerified && user && !user.isVerified) {
      router.push('/onboarding/verify')
    }
  }, [ensureVerified, isUserLoading, router, user])

  return null
}

export default EnsureLoggedIn
