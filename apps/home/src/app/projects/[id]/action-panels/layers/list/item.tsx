import { useInteractionsStore } from '@/stores/interactions-store'

interface ListItemProps {
  item: {
    id: string
    text: string
  }
}

const ListItem = ({ item }: ListItemProps) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const setHoveredElementId = useInteractionsStore((s) => s.setHoveredElementId)
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )

  return (
    <button
      className="text-sm flex items-center gap-2 p-0.5 h-7 w-full cursor-default"
      id={`layer-${item.id}`}
      type="button"
      onClick={() => {
        if (selectedElementId === item.id) {
          setSelectedElementId(null)
        } else {
          setSelectedElementId(item.id)
        }
      }}
      onMouseEnter={(e) => {
        e.stopPropagation()
        setHoveredElementId(item.id)
      }}
      onMouseLeave={(e) => {
        e.stopPropagation()
        setHoveredElementId(null)
      }}>
      <div className="min-w-[0.875rem] max-w-[0.875rem] min-h-[0.875rem] max-h-[0.875rem] rounded bg-primary/50" />
      <div className="absolute left-[calc(0.4375rem+3px)] top-8 bottom-2 bg-accent z-[-2] w-px" />
      <p className="truncate">{item.text}</p>
    </button>
  )
}

export default ListItem
