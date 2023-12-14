import { useInteractionsStore } from '@/stores/interactions-store'

export const stateMapping = {
  hover: {
    color: '#923FDE',
    title: 'Hover State',
  },
  focus: {
    color: '#F97316',
    title: 'Focus State',
  },
  active: {
    color: '#EF4444',
    title: 'Active State',
  },
  visited: {
    color: '#10B981',
    title: 'Visited State',
  },
  disabled: {
    color: '#6B7280',
    title: 'Disabled State',
  },
}

const StateIndicator = () => {
  const selectedState = useInteractionsStore((s) => s.selectedState)

  if (selectedState === 'default') return null

  return (
    <div
      className="fixed right-[17.25rem] bottom-5 bg-accent text-sm flex items-center gap-2 px-3 py-1 rounded-md border"
      style={{
        borderColor: stateMapping[selectedState].color,
      }}>
      <p>{stateMapping[selectedState].title}</p>
    </div>
  )
}

export default StateIndicator
