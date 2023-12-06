import { useParams } from 'next/navigation'
import BackButton from './back-button'
import ExportButton from './export'
import ImportSite from './import-site'
import SaveButton from './save'
import useProject from '@/resolvers/use-project'

const TopActions = () => {
  const { projectUrl, pageId } = useParams()
  const { project } = useProject()
  const activePagePath = project?.pages.find((page) => page.id === pageId)?.path

  return (
    <div className="relative z-50 flex items-center justify-between w-full h-12 px-5 border-b select-none bg-background border-border">
      <div className="flex items-center gap-2">
        <BackButton />
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-white">{project?.name}</p>
          <p className="px-2 rounded-md bg-accent">
            <span className="text-xs font-normal text-white/70">
              {projectUrl}.builder.baraa.app
            </span>
            <span className="text-sm font-medium text-white">
              {activePagePath || '/'}
            </span>
          </p>
        </div>
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
