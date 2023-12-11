'use client'
import { Input } from 'ui'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import getErrorMessage from '@/lib/get-error-message'
import useUser from '@/resolvers/use-user'

const LoginPAge = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user, isUserValidating, mutateUser } = useUser()

  if (user && !isUserValidating) router.push('/app')

  const handleSubmit = async () => {
    const email = emailRef.current?.value.trim()

    try {
      setIsLoading(true)

      await api.post('/auth/login', {
        email,
        password,
      })

      await mutateUser()

      router.push('/app')
    } catch (error) {
      setIsLoading(false)
      const message = getErrorMessage(error)
      toast.error(message as string)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center w-full h-[100dvh] flex-1 max-w-xl mx-auto px-8">
      <div className="h-[60dvh] max-h-[35rem] w-full flex flex-col items-center justify-between gap-10">
        <h1 className="text-2xl font-medium tracking-tight text-center">
          Login to your account
        </h1>
        <div className="flex flex-col items-center flex-1 w-full max-w-md gap-6 mx-auto">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="email">Email</label>
            <Input
              className="!text-lg !bg-accent/40 !h-14 !rounded-xl"
              id="email"
              placeholder="hey@baraa.app"
              ref={emailRef}
              type="email"
            />
          </div>
          <div className="relative flex flex-col w-full gap-2">
            <label htmlFor="password">Password</label>
            <div className="relative w-full h-full">
              <Input
                className="!text-lg !bg-accent/40 !h-14 !rounded-xl"
                id="password"
                placeholder="Password"
                type={isPasswordHidden ? 'password' : 'text'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute p-2 -translate-y-1/2 rounded top-1/2 right-4 hover:bg-secondary"
                type="button"
                onClick={() => setIsPasswordHidden((prev) => !prev)}>
                {isPasswordHidden ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-3">
          <motion.button
            className="px-8 py-4 rounded-xl !bg-white w-full !text-black font-medium tracking-wide uppercase max-w-md mx-auto relative disabled:!scale-100 disabled:opacity-70"
            disabled={isLoading}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}>
            {isLoading ? 'Logging you in...' : 'Login'}
          </motion.button>
          <Link
            className="text-sm transition-colors duration-200 text-neutral-400 hover:text-white"
            href="/onboarding">
            Create an account
          </Link>
        </div>
      </div>
    </main>
  )
}

export default LoginPAge
