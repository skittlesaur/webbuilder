import ActionPanelWrapper from '..'
import ActionPanelSeparator from '../separator'
import PagesPanelHeader from './header'
import PagesPanelPageItem from './page-item'
import { PanelsEnum } from '@/stores/panels-store'
import usePages from '@/resolvers/use-pages'

const PagesPanel = () => {
  const { pages } = usePages()

  return (
    <ActionPanelWrapper self={PanelsEnum.PagesAndLayouts}>
      <div className="flex flex-col gap-4">
        <PagesPanelHeader />
      </div>
      <ActionPanelSeparator />
      <div className="flex flex-col gap-2">
        {pages?.map((page) => (
          <PagesPanelPageItem
            depth={page.depth}
            key={page.id}
            page={{ id: page.id, path: page.path }}
          />
        ))}
      </div>
    </ActionPanelWrapper>
  )
}

export default PagesPanel
