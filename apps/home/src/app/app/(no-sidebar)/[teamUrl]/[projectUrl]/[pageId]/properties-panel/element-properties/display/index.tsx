import FlexDirection from './flex-direction'
import FlexWrap from './flex-wrap'
import Gap from './gap'
import AlignItems from './align'
import DisplayType from './type'
import JustifyContent from './justify'
import Visible from './visible'
import { useInteractionsStore } from '@/stores/interactions-store'

const ElementPropertiesDisplay = ({
  isBody,
  display,
  flexDirection,
  flexWrap,
  gap,
  alignItems,
  justifyContent,
  visibility,
}) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)

  if (!selectedElementId) return null

  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border">
      <p className="font-medium">Display</p>
      <div className="flex flex-col gap-3">
        {!isBody && <Visible visibility={visibility} />}
        <DisplayType display={display} isBody={isBody} />
        <FlexDirection
          display={display}
          flexDirection={flexDirection}
          isBody={isBody}
        />
        <AlignItems alignItems={alignItems} display={display} isBody={isBody} />
        <JustifyContent
          display={display}
          isBody={isBody}
          justifyContent={justifyContent}
        />
        <FlexWrap display={display} flexWrap={flexWrap} isBody={isBody} />
        <Gap display={display} gap={gap} isBody={isBody} />
      </div>
    </div>
  )
}

export default ElementPropertiesDisplay
