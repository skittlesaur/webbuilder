import Link from 'next/link'
import { useParams } from 'next/navigation'
import cn from 'classnames'

const PagesPanelPageItem = ({
  page,
  depth = 0,
}: {
  page: { id: string; path: string }
  depth?: number
}) => {
  const { teamUrl, projectUrl, pageId } = useParams()

  const isActive = page.id === pageId

  return (
    <div className="relative">
      <Link
        className={cn('block px-3 py-1 text-sm rounded hover:bg-secondary/40', {
          'bg-accent pointer-events-none': isActive,
        })}
        href={`/dashboard/${teamUrl as string}/${projectUrl as string}/${
          page.id
        }`}
        style={{
          marginLeft: `${depth * 0.75}rem`,
          width: `calc(100%-${depth * 0.75}rem*2)`,
        }}>
        {page.path}
        {page.path === '/' && (
          <span className="ml-1 text-xs text-white/50">(home)</span>
        )}
      </Link>
      {depth > 1 && (
        <div
          className="absolute bottom-0 w-px rounded bg-border -top-2"
          style={{
            left: `calc(${depth * 0.75}rem - 0.35rem)`,
          }}
        />
      )}
    </div>
  )
}

export default PagesPanelPageItem
