'use client'
import { TextArea } from 'ui'
import { useRouter } from 'next/navigation'
import EnsureLoggedIn from '@/components/ensure-logged-in'
import useFeedback from '@/resolvers/use-feedback'
import FullLoader from '@/components/full-loader'
import StarRating from '@/components/star-rating'

const FeedbackPage = () => {
  const router = useRouter()
  const { feedback, isFeedbackLoading } = useFeedback()

  if (isFeedbackLoading) return <FullLoader title="Loading Feedback..." />

  return (
    <div className="flex flex-col max-w-screen-md gap-8 py-10 mx-auto md:py-20">
      <EnsureLoggedIn />
      <div className="flex flex-col gap-1 pb-10 border-b border-border">
        <button
          className="self-start px-2 py-1 mb-2 -ml-2 text-xs rounded hover:bg-accent text-neutral-400"
          type="button"
          onClick={() => {
            router.push('/app')
          }}>
          Go to app
        </button>
        <h1 className="text-2xl">Feedback Received</h1>
        <p className="text-sm text-neutral-400">
          {new Date(feedback?.createdAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          at{' '}
          {new Date(feedback?.createdAt).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </p>
      </div>
      <h2 className="text-xs font-medium text-white/50">User Experience</h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          How would you rate the overall user experience on a scale of 1 to 5?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            disabled
            initialRating={feedback.experience}
            leastLabel="Poor"
            mostLabel="Excellent"
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
            disabled
            initialRating={feedback.easyNavigation}
            leastLabel="Very Difficult"
            mostLabel="Very Easy"
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
            disabled
            initialRating={feedback.design}
            leastLabel="Unappealing"
            mostLabel="Excellent"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Did the interface make it clear how to perform different actions?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            disabled
            initialRating={feedback.clearInterface}
            leastLabel="Very Unclear"
            mostLabel="Very Clear"
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
            disabled
            initialRating={feedback.exportQuality}
            leastLabel="Very Dissatisfied"
            mostLabel="Very Satisfied"
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
            disabled
            initialRating={feedback.integrationRating}
            leastLabel="Very Difficult"
            mostLabel="Very Easy"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Were there any issues or discrepancies between the design in the
          application and the exported code?
        </p>
        <TextArea
          disabled
          className="min-h-[7rem] max-h-[13rem]"
          value={feedback.issuesWithExports || 'Left blank.'}
        />
      </div>
      <h2 className="text-xs font-medium text-white/50">
        Feature Satisfaction
      </h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Which specific features did you find most useful or beneficial?
        </p>
        <TextArea
          disabled
          className="min-h-[7rem] max-h-[13rem]"
          value={feedback.mostBeneficialFeature || 'Left blank.'}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Is there any feature you felt was missing or could be improved?
        </p>
        <TextArea
          disabled
          className="min-h-[7rem] max-h-[13rem]"
          value={feedback.missingFeature || 'Left blank.'}
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
            disabled
            initialRating={feedback.performanceRating}
            leastLabel="Very Poor"
            mostLabel="Excellent"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Did you experience any lag or delays during your usage? If so, please
          describe the situation.
        </p>
        <TextArea
          disabled
          className="min-h-[7rem] max-h-[13rem]"
          value={feedback.performanceLag || 'Left blank.'}
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
            disabled
            initialRating={feedback.learningCurve}
            leastLabel="Very Difficult"
            mostLabel="Very Easy"
          />
        </div>
      </div>
      <h2 className="text-xs font-medium text-white/50">
        Suggestions for Improvement
      </h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          What improvements would you like to see in future updates?
        </p>
        <TextArea
          disabled
          className="min-h-[7rem] max-h-[13rem]"
          value={feedback.improvements || 'Left blank.'}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Are there any additional features you believe would enhance the
          application?
        </p>
        <TextArea
          disabled
          className="min-h-[7rem] max-h-[13rem]"
          value={feedback.additionalFeatures || 'Left blank.'}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          How likely are you to recommend the application to a friend or
          colleague?
        </p>
        <div className="flex items-center justify-center">
          <StarRating
            disabled
            initialRating={feedback.recommendationLikelihood}
            leastLabel="Not at all likely"
            mostLabel="Very likely"
          />
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
