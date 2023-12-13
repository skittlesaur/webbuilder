import { useParams } from 'next/navigation'
import Link from 'next/link'
import BackButton from './back-button'
import ExportButton from './export'
import ImportSite from './import-site'
import SaveButton from './save'
import AiButton from './ai'
import useProject from '@/resolvers/use-project'

const TopActions = () => {
  const { projectUrl, pageId } = useParams()
  const { project } = useProject()
  const activePagePath = project?.pages.find((page) => page.id === pageId)?.path

  const previewUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/p/${
    projectUrl as string
  }${activePagePath || '/'}`

  return (
    <div className="relative z-50 flex items-center justify-between w-full h-12 px-5 border-b select-none bg-background border-border">
      <div className="flex items-center gap-2">
        <BackButton />
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-white">{project?.name}</p>
          <Link
            className="px-2 text-xs font-normal rounded-md bg-accent text-white/70"
            href={previewUrl}
            rel="noopener noreferrer"
            target="_blank">
            {previewUrl.replace(/https?:\/\//, '')}
          </Link>
        </div>
      </div>
      <div className="flex flex-row-reverse items-center gap-4">
        <ExportButton />
        <div className="flex flex-row-reverse items-center gap-1">
          <SaveButton />
          <ImportSite />
          <AiButton />
        </div>
      </div>
    </div>
  )
}

export default TopActions
