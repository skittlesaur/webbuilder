import InputWithUnit from '../input-with-unit'
import { useInteractionsStore } from '@/stores/interactions-store'

const Gap = ({ display, gap }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)

  if (!selectedElementId || !['flex', 'inline-flex'].includes(display))
    return null

  return (
    <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
      <p className="text-gray-400">Gap</p>
      <InputWithUnit showMeasure autoValue="0px" initial={gap} type="gap" />
    </div>
  )
}

export default Gap