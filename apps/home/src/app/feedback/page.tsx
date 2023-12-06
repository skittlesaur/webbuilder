'use client'
import { useRouter } from 'next/navigation'
import { TextArea } from 'ui'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import type { StarRatingRef } from '@/components/star-rating'
import StarRating from '@/components/star-rating'
import EnsureLoggedIn from '@/components/ensure-logged-in'
import getErrorMessage from '@/lib/get-error-message'
import api from '@/lib/api'

const OptionalLabel = () => {
  return (
    <span className="px-2 py-1 mx-1 text-xs rounded-full bg-accent text-white/70">
      Optional
    </span>
  )
}

const FeedbackPage = () => {
  const router = useRouter()
  const overallExperienceRef = useRef<StarRatingRef>(null)
  const easyToNavigateRef = useRef<StarRatingRef>(null)
  const designAndLayoutRef = useRef<StarRatingRef>(null)
  const interfaceClearRef = useRef<StarRatingRef>(null)
  const codeQualityRef = useRef<StarRatingRef>(null)
  const codeIntegrationRef = useRef<StarRatingRef>(null)
  const codeIssuesRef = useRef<HTMLTextAreaElement>(null)
  const usefulFeaturesRef = useRef<HTMLTextAreaElement>(null)
  const missingFeaturesRef = useRef<HTMLTextAreaElement>(null)
  const performanceRef = useRef<StarRatingRef>(null)
  const performanceIssuesRef = useRef<HTMLTextAreaElement>(null)
  const learningCurveRef = useRef<StarRatingRef>(null)
  const suggestionsRef = useRef<HTMLTextAreaElement>(null)
  const additionalFeaturesRef = useRef<HTMLTextAreaElement>(null)
  const recommendRef = useRef<StarRatingRef>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    const overallExperience = overallExperienceRef.current?.value
    const easyToNavigate = easyToNavigateRef.current?.value
    const designAndLayout = designAndLayoutRef.current?.value
    const interfaceClear = interfaceClearRef.current?.value
    const codeQuality = codeQualityRef.current?.value
    const codeIntegration = codeIntegrationRef.current?.value
    const codeIssues = codeIssuesRef.current?.value
    const usefulFeatures = usefulFeaturesRef.current?.value
    const missingFeatures = missingFeaturesRef.current?.value
    const performance = performanceRef.current?.value
    const performanceIssues = performanceIssuesRef.current?.value
    const learningCurve = learningCurveRef.current?.value
    const suggestions = suggestionsRef.current?.value
    const additionalFeatures = additionalFeaturesRef.current?.value
    const recommend = recommendRef.current?.value

    const requiredFields = [
      overallExperience,
      easyToNavigate,
      designAndLayout,
      interfaceClear,
      codeQuality,
      codeIntegration,
      performance,
      learningCurve,
      recommend,
    ]

    for (const value of requiredFields) {
      if (value === null) {
        toast.error('Please fill out all required fields.')
        return
      }
    }

    try {
      setIsSubmitting(true)
      const { data: feedback } = await api.post('/feedback', {
        experience: overallExperience,
        easyNavigation: easyToNavigate,
        design: designAndLayout,
        clearInterface: interfaceClear,
        exportQuality: codeQuality,
        integrationRating: codeIntegration,
        issuesWithExports: codeIssues,
        mostBeneficialFeature: usefulFeatures,
        missingFeature: missingFeatures,
        performanceRating: performance,
        performanceLag: performanceIssues,
        learningCurve,
        improvements: suggestions,
        additionalFeatures,
        recommendationLikelihood: recommend,
      })

      const { id } = feedback
      router.push(`/feedback/${id}`)
    } catch (err) {
      setIsSubmitting(false)
      toast.error(getErrorMessage(err))
    }
  }

  return (
    <div className="flex flex-col max-w-screen-md gap-8 py-10 mx-auto md:py-20">
      <EnsureLoggedIn />
      <div className="flex flex-col gap-1 pb-10 border-b border-border">
        <button
          className="self-start px-2 py-1 mb-2 -ml-2 text-xs rounded hover:bg-accent text-neutral-400"
          type="button"
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              router.back()
            } else {
              router.push('/app')
            }
          }}>
          Back
        </button>
        <h1 className="text-2xl">Feedback</h1>
      </div>
      <h2 className="text-xs font-medium text-white/50">User Experience</h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          How would you rate the overall user experience on a scale of 1 to 5?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            leastLabel="Poor"
            mostLabel="Excellent"
            ref={overallExperienceRef}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          How would you rate the ease of navigation in the application, and your
          ability to find the necessary features?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            leastLabel="Very Difficult"
            mostLabel="Very Easy"
            ref={easyToNavigateRef}
          />
        </div>
      </div>
      <h2 className="text-xs font-medium text-white/50">
        Design and Interface
      </h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          How would you rate the design and layout of the application?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            leastLabel="Unappealing"
            mostLabel="Excellent"
            ref={designAndLayoutRef}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Did the interface make it clear how to perform different actions?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            leastLabel="Very Unclear"
            mostLabel="Very Clear"
            ref={interfaceClearRef}
          />
        </div>
      </div>
      <h2 className="text-xs font-medium text-white/50">Code Quality</h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          How satisfied are you with the exported HTML and CSS code quality?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            leastLabel="Very Dissatisfied"
            mostLabel="Very Satisfied"
            ref={codeQualityRef}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Were you able to easily integrate the exported HTML and CSS into your
          preferred web development environment or framework?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            leastLabel="Very Difficult"
            mostLabel="Very Easy"
            ref={codeIntegrationRef}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Were there any issues or discrepancies between the design in the
          application and the exported code? <OptionalLabel />
        </p>
        <TextArea
          className="min-h-[7rem] max-h-[13rem]"
          placeholder="Type any issues or discrepancies here, or leave blank if none."
          ref={codeIssuesRef}
        />
      </div>
      <h2 className="text-xs font-medium text-white/50">
        Feature Satisfaction
      </h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Which specific features did you find most useful or beneficial?{' '}
          <OptionalLabel />
        </p>
        <TextArea
          className="min-h-[7rem] max-h-[13rem]"
          placeholder="Type any features here, or leave blank if none."
          ref={usefulFeaturesRef}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Is there any feature you felt was missing or could be improved?{' '}
          <OptionalLabel />
        </p>
        <TextArea
          className="min-h-[7rem] max-h-[13rem]"
          placeholder="Type any features here, or leave blank if none."
          ref={missingFeaturesRef}
        />
      </div>
      <h2 className="text-xs font-medium text-white/50">
        Performance and Stability
      </h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          How would you rate the performance of the application, especially when
          working on larger design projects?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            leastLabel="Very Poor"
            mostLabel="Excellent"
            ref={performanceRef}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Did you experience any lag or delays during your usage? If so, please
          describe the situation. <OptionalLabel />
        </p>
        <TextArea
          className="min-h-[7rem] max-h-[13rem]"
          placeholder="Type any issues here, or leave blank if none."
          ref={performanceIssuesRef}
        />
      </div>
      <h2 className="text-xs font-medium text-white/50">Learning Curve</h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          How easy was it for you to learn how to use the application,
          especially if you are familiar with other design tools?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            leastLabel="Very Difficult"
            mostLabel="Very Easy"
            ref={learningCurveRef}
          />
        </div>
      </div>
      <h2 className="text-xs font-medium text-white/50">
        Suggestions for Improvement
      </h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          What improvements would you like to see in future updates?{' '}
          <OptionalLabel />
        </p>
        <TextArea
          className="min-h-[7rem] max-h-[13rem]"
          placeholder="Type any suggestions here, or leave blank if none."
          ref={suggestionsRef}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Are there any additional features you believe would enhance the
          application? <OptionalLabel />
        </p>
        <TextArea
          className="min-h-[7rem] max-h-[13rem]"
          placeholder="Type any suggestions here, or leave blank if none."
          ref={additionalFeaturesRef}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          How likely are you to recommend the application to a friend or
          colleague?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            leastLabel="Not at all likely"
            mostLabel="Very likely"
            ref={recommendRef}
          />
        </div>
      </div>
      <button
        className="h-10 mt-10 text-sm font-medium tracking-wider uppercase rounded-md bg-primary hover:bg-primary-700 disabled:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSubmitting}
        type="button"
        onClick={handleSubmit}>
        {isSubmitting ? 'Sending Your Feedback...' : 'Send Feedback'}
      </button>
    </div>
  )
}

export default FeedbackPage
