import ActionPanelWrapper from '..'
import PagesPanelHeader from './header'
import PagesPanelPageItem from './page-item'
import { PanelsEnum } from '@/stores/panels-store'
import usePages from '@/resolvers/use-pages'
import ScrollableWrapper from '@/components/scrollable-wrapper'

const PagesPanel = () => {
  const { pages } = usePages()

  return (
    <ActionPanelWrapper self={PanelsEnum.PagesAndLayouts}>
      <div className="flex flex-col gap-4 px-5 pt-6 -mx-5 -mt-6 pb-6 border-b border-border bg-background relative z-[1]">
        <PagesPanelHeader />
      </div>
      <ScrollableWrapper>
        <div className="flex flex-col gap-2">
          {pages?.map((page) => (
            <PagesPanelPageItem
              depth={page.depth}
              key={page.id}
              page={{ id: page.id, path: page.path }}
            />
          ))}
        </div>
      </ScrollableWrapper>
    </ActionPanelWrapper>
  )
}

export default PagesPanel
