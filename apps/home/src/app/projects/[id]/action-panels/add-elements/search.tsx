import { useRef } from 'react'
import SearchIcon from '@/icons/search-outline.svg'

const AddElementsPanelSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className="flex items-center gap-2 px-2 py-1 rounded bg-black/20 border border-border"
      role="button"
      tabIndex={0}
      onClick={() => {
        inputRef.current?.focus()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          inputRef.current?.focus()
        }
      }}>
      <SearchIcon className="w-4 h-4" />
      <input
        className="w-full bg-transparent outline-none text-sm text-text placeholder:text-text/50"
        placeholder="Find an element"
        ref={inputRef}
        type="text"
      />
    </div>
  )
}

export default AddElementsPanelSearch
