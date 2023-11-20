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
      <div className="flex flex-col items-center max-w-md mx-auto w-full flex-1 gap-6">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email">Email</label>
          <Input
            className="!text-lg !bg-accent/40 !h-14 !rounded-xl"
            id="email"
            placeholder="hey@baraa.app"
            ref={emailRef}
            type="email"
          />
        </div>
        <div className="relative flex flex-col gap-2 w-full">
          <label htmlFor="password">Password</label>
          <div className="relative w-full h-full">
            <Input
              className="!text-lg !bg-accent/40 !h-14 !rounded-xl"
              id="password"
              placeholder="wubba@lubba#dub1dub2"
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
              className="absolute top-1/2 -translate-y-1/2 right-4 hover:bg-secondary p-2 rounded"
              type="button"
              onClick={() => setIsPasswordHidden((prev) => !prev)}>
              {isPasswordHidden ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          </div>
          <AnimatePresence mode="wait">
            {isPasswordFocused ? (
              <motion.div
                animate={{ opacity: 1, y: 20, height: 'auto' }}
                className="absolute top-full text-xs text-neutral-400 overflow-hidden flex flex-col gap-1"
                exit={{ opacity: 0, y: 20, height: 0 }}
                initial={{ opacity: 0, y: 20, height: 0 }}
                key="focused"
                transition={{ duration: 0.2, ease: 'easeInOut' }}>
                <div className="flex gap-2 items-center">
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
                <div className="flex gap-2 items-center">
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
                <div className="flex gap-2 items-center">
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
                <div className="flex gap-2 items-center">
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
                <div className="flex gap-2 items-center">
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
      <div className="flex flex-col items-center w-full gap-3">
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
          className="text-neutral-400 text-sm hover:text-white transition-colors duration-200"
          href="/login">
          Login instead
        </Link>
      </div>
    </>
  )
}

export default OnboardingPage
