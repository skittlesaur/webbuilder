import Spinner from './spinner'

const FullLoader = ({
  title,
  paragraph,
}: {
  title?: string
  paragraph?: string
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-background">
      <Spinner />
      {title || paragraph ? (
        <div className="flex flex-col">
          {title ? <h1>{title}</h1> : null}
          {paragraph ? (
            <p className="text-sm text-neutral-400">{paragraph}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default FullLoader
