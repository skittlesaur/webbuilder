import { ChevronLeftIcon } from '@radix-ui/react-icons'
import cn from 'classnames'

const OnboardingHeader = ({
  title,
  backHref,
}: {
  title: string
  backHref?: string
}) => {
  return (
    <div
      className={cn('w-full items-center', {
        'grid grid-cols-[0.5fr_3fr_0.5fr]': backHref,
      })}>
      {backHref ? (
        <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-secondary">
          <ChevronLeftIcon className="w-full h=full" />
        </div>
      ) : null}
      <h1 className="text-2xl text-center tracking-tight font-medium">
        {title}
      </h1>
    </div>
  )
}

export default OnboardingHeader
