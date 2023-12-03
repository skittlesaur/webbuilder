'use client'
import { Input, CheckboxAnimated } from 'ui'
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import OnboardingHeader from './header'
import api from '@/lib/api'
import getErrorMessage from '@/lib/get-error-message'

const OnboardingPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    const email = emailRef.current?.value.trim()

    if (!email) return toast.error('Please enter your email')
    if (!password) return toast.error('Please enter your password')

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValidEmail) return toast.error('Please enter a valid email')

    const isEightCharacters = password.length >= 8
    if (!isEightCharacters)
      return toast.error('Password must be at least 8 characters long')

    const isOneUppercase = /[A-Z]/.test(password)
    if (!isOneUppercase)
      return toast.error('Password must have at least 1 uppercase letter')

    const isOneLowercase = /[a-z]/.test(password)
    if (!isOneLowercase)
      return toast.error('Password must have at least 1 lowercase letter')

    const isOneNumber = /[0-9]/.test(password)
    if (!isOneNumber) return toast.error('Password must have at least 1 number')

    const isOneSpecialCharacter = /[^A-Za-z0-9]/.test(password)
    if (!isOneSpecialCharacter)
      return toast.error('Password must have at least 1 special character')

    try {
      setIsLoading(true)

      await api.post('/auth/signup', {
        email,
        password,
      })

      router.push('/onboarding/verify')
    } catch (error) {
      setIsLoading(false)
      const message = getErrorMessage(error)
      toast.error(message as string)
    }
  }

  return (
    <>
      <OnboardingHeader title="Let's make your account" />
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
              onBlur={() => {
                const isEmpty = password.length === 0
                if (isEmpty) setIsPasswordFocused(false)
                else setIsPasswordFocused(true)
              }}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
            />
            <button
              className="absolute p-2 -translate-y-1/2 rounded top-1/2 right-4 hover:bg-secondary"
              type="button"
              onClick={() => setIsPasswordHidden((prev) => !prev)}>
              {isPasswordHidden ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          </div>
          <AnimatePresence mode="wait">
            {isPasswordFocused ? (
              <motion.div
                animate={{ opacity: 1, y: 20, height: 'auto' }}
                className="absolute flex flex-col gap-1 overflow-hidden text-xs top-full text-neutral-400"
                exit={{ opacity: 0, y: 20, height: 0 }}
                initial={{ opacity: 0, y: 20, height: 0 }}
                key="focused"
                transition={{ duration: 0.2, ease: 'easeInOut' }}>
                <div className="flex items-center gap-2">
                  <CheckboxAnimated
                    checked={password.length >= 8}
                    className="w-4 h-4"
                  />
                  <p>
                    At least 8 characters{' '}
                    <span className="text-neutral-300">
                      (you have {password.length})
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckboxAnimated
                    checked={/[A-Z]/.test(password)}
                    className="w-4 h-4"
                  />
                  <p>
                    At least 1 uppercase letter{' '}
                    <span className="text-neutral-300">
                      (you have {password.replace(/[^A-Z]/g, '').length})
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckboxAnimated
                    checked={/[a-z]/.test(password)}
                    className="w-4 h-4"
                  />
                  <p>
                    At least 1 lowercase letter{' '}
                    <span className="text-neutral-300">
                      (you have {password.replace(/[^a-z]/g, '').length})
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckboxAnimated
                    checked={/[0-9]/.test(password)}
                    className="w-4 h-4"
                  />
                  <p>
                    At least 1 number{' '}
                    <span className="text-neutral-300">
                      (you have {password.replace(/[^0-9]/g, '').length})
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckboxAnimated
                    checked={/[^A-Za-z0-9]/.test(password)}
                    className="w-4 h-4"
                  />
                  <p>
                    At least 1 special character{' '}
                    <span className="text-neutral-300">
                      (you have {password.replace(/[A-Za-z0-9]/g, '').length})
                    </span>
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-3 translate-y-4">
        <motion.button
          className="px-8 py-4 rounded-xl !bg-white w-full !text-black font-medium tracking-wide uppercase max-w-md mx-auto relative disabled:!scale-100 disabled:opacity-70"
          disabled={isLoading}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}>
          {isLoading ? 'Creating Your Account' : 'Continue'}
        </motion.button>
        <Link
          className="text-sm transition-colors duration-200 text-neutral-400 hover:text-white"
          href="/login">
          Login instead
        </Link>
      </div>
    </>
  )
}

export default OnboardingPage
