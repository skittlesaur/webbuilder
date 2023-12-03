'use client'
import { useEffect, useRef, useState } from 'react'
import { Input } from 'ui'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import OnboardingHeader from '../header'
import useUser from '@/resolvers/use-user'
import api from '@/lib/api'
import getErrorMessage from '@/lib/get-error-message'

const OnboardingUsernamePage = () => {
  const { user, isUserLoading: userLoading } = useUser()
  const [username, setUsername] = useState(`@${user?.username ?? 'username'}`)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!userLoading) {
      setUsername(`@${user?.username ?? 'username'}`)
    }
  }, [user?.username, userLoading])

  const handleSubmit = async () => {
    if (user?.username && `@${user.username}` === username) {
      return router.push('/app')
    }

    const usernameWithoutAt = username.slice(1)

    if (!usernameWithoutAt) return toast.error('Username cannot be empty')

    if (usernameWithoutAt.length < 3)
      return toast.error('Username must be at least 3 characters')

    if (usernameWithoutAt.length > 16)
      return toast.error('Username cannot be longer than 15 characters')

    const startsWithDash = usernameWithoutAt.startsWith('-')
    if (startsWithDash) return toast.error('Username cannot start with a dash')

    const startsWithNumber = /^\d/.test(usernameWithoutAt)
    if (startsWithNumber)
      return toast.error('Username cannot start with a number')

    const hasSpecialCharacters = /[^a-zA-Z0-9-]/.test(usernameWithoutAt)
    if (hasSpecialCharacters)
      return toast.error(
        'Username can only contain letters, numbers, and dashes'
      )

    try {
      setIsLoading(true)
      await api.post('/user/username', { username: usernameWithoutAt.trim() })
      router.push('/app')
    } catch (err) {
      toast.error(getErrorMessage(err) as string)
      setIsLoading(false)
    }
  }

  return (
    <>
      <OnboardingHeader title="Choose a username" />
      <div className="flex flex-col items-center flex-1 w-full max-w-md gap-2 mx-auto">
        {userLoading ? (
          <div className="w-full h-14 bg-accent animate-pulse rounded-xl" />
        ) : (
          <Input
            className="!text-xl !text-center !h-14 !border-0 !ring-0 !font-light"
            ref={inputRef}
            value={username}
            onChange={(e) => {
              const value = e.target.value
              const atFormattedValue = value.startsWith('@')
                ? value.slice(1)
                : value

              const startsWithDash = atFormattedValue.startsWith('-')
              if (startsWithDash)
                return toast.warning('Username cannot start with a dash')

              const startsWithNumber = /^\d/.test(atFormattedValue)
              if (startsWithNumber)
                return toast.warning('Username cannot start with a number')

              const spaceFormattedValue = atFormattedValue.replace(/\s/g, '-')
              if (spaceFormattedValue.length > 16)
                return toast.warning(
                  'Username cannot be longer than 15 characters'
                )

              const hasSpecialCharacters = /[^a-zA-Z0-9-]/.test(
                spaceFormattedValue
              )

              if (hasSpecialCharacters)
                return toast.warning(
                  'Username can only contain letters, numbers, and dashes'
                )

              setUsername(`@${spaceFormattedValue}`)
            }}
          />
        )}
        <button
          className="text-primary-500"
          type="button"
          onClick={() => {
            inputRef.current?.focus()
            inputRef.current?.setSelectionRange(1, username.length)
          }}>
          Change your username
        </button>
      </div>
      <motion.button
        className="px-8 py-4 rounded-xl !bg-white w-full !text-black font-medium tracking-wide uppercase max-w-md mx-auto relative disabled:!scale-100 disabled:opacity-70"
        disabled={isLoading}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}>
        {isLoading ? 'Completing Signup...' : 'Complete'}
      </motion.button>
    </>
  )
}

export default OnboardingUsernamePage
