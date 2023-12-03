import FlexDirection from './flex-direction'
import FlexWrap from './flex-wrap'
import Gap from './gap'
import AlignItems from './align'
import DisplayType from './type'
import { useInteractionsStore } from '@/stores/interactions-store'
import JustifyContent from './justify'
import Visible from './visible'

const ElementPropertiesDisplay = ({
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
        <Visible visibility={visibility} />
        <DisplayType display={display} />
        <FlexDirection display={display} flexDirection={flexDirection} />
        <AlignItems display={display} alignItems={alignItems} />
        <JustifyContent display={display} justifyContent={justifyContent} />
        <FlexWrap display={display} flexWrap={flexWrap} />
        <Gap display={display} gap={gap} />
      </div>
    </div>
  )
}

export default ElementPropertiesDisplay
