import BackButton from './back-button'
import ExportButton from './export'
import ImportSite from './import-site'
import SaveButton from './save'

const TopActions = () => {
  return (
    <div className="select-none bg-background relative z-50 w-full h-12 border-b border-border flex items-center justify-between px-5">
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="font-medium text-sm">Project name</h1>
      </div>
      <div className="flex flex-row-reverse items-center gap-4">
        <ExportButton />
        <div className="flex flex-row-reverse items-center gap-1">
          <SaveButton />
          <ImportSite />
        </div>
      </div>
    </div>
  )
}

export default TopActions
