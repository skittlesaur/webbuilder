import BackButton from './back-button'
import ExportButton from './export'

const TopActions = () => {
  return (
    <div className="select-none bg-background/60 backdrop-blur relative z-50 w-full h-12 border-b border-border flex items-center justify-between px-5">
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="font-medium text-sm">Project name</h1>
      </div>
      <div className="flex items-center gap-2">
        <ExportButton />
      </div>
    </div>
  )
}

export default TopActions
