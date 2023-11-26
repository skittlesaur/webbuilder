import BackButton from './back-button'
import ExportButton from './export'
import ImportSite from './import-site'
import SaveButton from './save'
import useProject from '@/resolvers/use-project'

const TopActions = () => {
  const { project } = useProject()

  return (
    <div className="relative z-50 flex items-center justify-between w-full h-12 px-5 border-b select-none bg-background border-border">
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="text-sm font-medium">{project?.name}</h1>
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
