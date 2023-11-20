'use client'
import { useEffect, useState } from 'react'
import { Input } from 'ui'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import OnboardingHeader from '../header'
import useUser from '@/resolvers/use-user'
import api from '@/lib/api'
import getErrorMessage from '@/lib/get-error-message'

const resendTimeouts = {
  0: 30,
  1: 60,
  2: 120,
  3: 240,
  4: 480,
}

const OnboardingVerifyPage = () => {
  const [values, setValues] = useState<(number | null)[]>(Array(6).fill(null))
  const [isLoading, setIsLoading] = useState(false)
  const { user, isUserLoading: userLoading } = useUser()
  const router = useRouter()
  const [resend, setResend] = useState({
    isResending: false,
    seconds: 0,
    retries: 0,
  })

  if (!userLoading) {
    if (!user) {
      router.push('/onboarding')
    }

    if (user?.isVerified) {
      router.push('/onboarding/username')
    }
  }

  const focusInput = (index: number) => {
    const input = document.getElementById(`verification-code-${index}`)
    input?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    const index = Number(event.currentTarget.id.split('-')[2])

    if (key === 'Backspace') {
      event.preventDefault()

      if (index > 0) {
        focusInput(index - 1)
        setValues((v) => {
          const newValues = [...v]
          newValues[index - 1] = null
          return newValues
        })
      } else {
        setValues((v) => {
          const newValues = [...v]
          newValues[0] = null
          return newValues
        })
      }
    } else if (key === 'ArrowLeft') {
      event.preventDefault()

      if (index > 0) {
        focusInput(index - 1)
      }
    } else if (key === 'ArrowRight') {
      event.preventDefault()

      if (index < 5) {
        focusInput(index + 1)
      }
    } else if (key === 'Enter') {
      event.preventDefault()

      if (index < 5) {
        focusInput(index + 1)
      }
    } else if (/^[0-9]$/.test(key)) {
      event.preventDefault()

      setValues((v) => {
        const newValues = [...v]
        newValues[index] = Number(key)
        return newValues
      })

      if (index < 5) {
        focusInput(index + 1)
      }
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const { clipboardData } = event
    const pastedData = clipboardData.getData('text')

    if (/^[0-9]{6}$/.test(pastedData)) {
      event.preventDefault()

      const newValues = pastedData.split('').map((value) => Number(value))
      setValues(newValues)
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select()
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.currentTarget.selectionStart = 0
    event.currentTarget.selectionEnd = 0
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const index = Number(event.currentTarget.id.split('-')[2])

    if (/^[0-9]$/.test(value)) {
      setValues((v) => {
        const newValues = [...v]
        newValues[index] = Number(value)
        return newValues
      })

      if (index < 5) {
        focusInput(index + 1)
      }
    }
  }

  const handleSubmit = async () => {
    const isFull = values.every((value) => value !== null)

    if (!isFull) return toast.error('Please enter the verification code')

    try {
      setIsLoading(true)
      await api.post('/auth/verify', {
        token: values.join(''),
      })
      router.push('/onboarding/username')
    } catch (error) {
      setIsLoading(false)
      const message = getErrorMessage(error)
      toast.error(message as string)
    }
  }

  const handleResend = async () => {
    try {
      if (resend.isResending) return
      if (resend.seconds > 0) return

      setResend((r) => ({ ...r, isResending: true }))

      await api.post('/auth/verify/resend')
      toast.success('Verification code sent')
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message as string)
    } finally {
      setResend((r) => ({
        isResending: false,
        seconds: resendTimeouts[r.retries],
        retries: r.retries + 1,
      }))
    }
  }

  useEffect(() => {
    if (resend.seconds === 0) {
      return
    }

    const interval = setInterval(() => {
      setResend((r) => ({ ...r, seconds: r.seconds - 1 }))
    }, 1000)

    return () => clearInterval(interval)
  })

  return (
    <>
      <OnboardingHeader title="Enter the code we just sent you" />
      <div className="flex flex-col items-center max-w-md mx-auto w-full flex-1 gap-6">
        <div className="flex items-center gap-3">
          {values.map((value, index) => (
            <Input
              className="!w-12 !h-12 !text-2xl !text-center"
              id={`verification-code-${index}`}
              key={index}
              value={String(value ?? '')}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-neutral-400">
          <p>Didn&apos;t get the code?</p>
          <button
            className="text-white disabled:text-neutral-300"
            disabled={resend.isResending || resend.seconds !== 0}
            type="button"
            onClick={handleResend}>
            {resend.isResending ? 'Resending...' : null}
            {resend.seconds !== 0 ? `Resend again in ${resend.seconds}` : null}
            {!resend.isResending && resend.seconds === 0 ? 'Resend' : null}
          </button>
        </div>
      </div>
      <motion.button
        className="px-8 py-4 rounded-xl !bg-white w-full !text-black font-medium tracking-wide uppercase max-w-md mx-auto relative disabled:!scale-100 disabled:opacity-70"
        disabled={isLoading}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}>
        {isLoading ? 'Verifying Your Account' : 'Verify'}
      </motion.button>
    </>
  )
}

export default OnboardingVerifyPage
