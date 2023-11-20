import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'ui'
import { CheckIcon } from '@radix-ui/react-icons'
import cn from 'classnames'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import capitalizeFirstLetter from '@/lib/capitalize-first-letter'

const ARIA_ROLES = [
  'alert',
  'alertdialog',
  'application',
  'article',
  'banner',
  'button',
  'cell',
  'checkbox',
  'columnheader',
  'combobox',
  'complementary',
  'contentinfo',
  'definition',
  'dialog',
  'directory',
  'document',
  'feed',
  'figure',
  'form',
  'grid',
  'gridcell',
  'group',
  'heading',
  'img',
  'link',
  'list',
  'listbox',
  'listitem',
  'log',
  'main',
  'marquee',
  'math',
  'menu',
  'menubar',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'navigation',
  'none',
  'note',
  'option',
  'presentation',
  'progressbar',
  'radio',
  'radiogroup',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'scrollbar',
  'search',
  'searchbox',
  'separator',
  'slider',
  'spinbutton',
  'status',
  'switch',
  'tab',
  'table',
  'tablist',
  'tabpanel',
  'term',
  'textbox',
  'timer',
  'toolbar',
  'tooltip',
  'tree',
  'treegrid',
  'treeitem',
] as const

const AccessibilityAttributes = ({
  ariaLabel,
  ariaRole,
}: {
  ariaLabel?: string
  ariaRole?: string
}) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  return (
    <div className="p-4 border-b border-border flex flex-col gap-4">
      <p className="font-medium">Accessibility</p>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
          <p className="text-gray-400">Label</p>
          <Input
            defaultValue={ariaLabel}
            placeholder="ARIA Label"
            onChange={(e) => {
              const value = e.target.value
              if (selectedElementId === null) return
              updateElementAttribute(
                selectedElementId,
                'attributes',
                'aria-label',
                value || null,
                null
              )
            }}
          />
        </div>
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
          <p className="text-gray-400">Role</p>
          <Popover>
            <PopoverTrigger className="border border-border rounded h-9 px-3 py-1 text-sm shadow-sm text-left">
              {ariaRole ? (
                capitalizeFirstLetter(ariaRole)
              ) : (
                <span className="text-neutral-400">Select ARIA role</span>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 mr-4">
              <Command>
                <CommandInput placeholder="Search ARIA role..." />
                <CommandEmpty>No ARIA role found.</CommandEmpty>
                <CommandGroup className="max-h-[20rem] overflow-y-auto">
                  <CommandItem
                    onSelect={() => {
                      if (selectedElementId === null) return
                      updateElementAttribute(
                        selectedElementId,
                        'attributes',
                        'aria-role',
                        null,
                        null
                      )
                    }}>
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        ariaRole === null ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    None
                  </CommandItem>
                  {ARIA_ROLES.map((role) => (
                    <CommandItem
                      key={role}
                      value={role}
                      onSelect={(currentValue) => {
                        if (selectedElementId === null) return
                        updateElementAttribute(
                          selectedElementId,
                          'attributes',
                          'aria-role',
                          currentValue || null,
                          null
                        )
                      }}>
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          ariaRole === role ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {capitalizeFirstLetter(role)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-[0.5fr_1fr] gap-2 items-center">
          <p className="text-gray-400">Tab Index</p>
          <Input
            type="number"
            defaultValue={0}
            onChange={(e) => {
              const value = e.target.value
              if (selectedElementId === null) return
              updateElementAttribute(
                selectedElementId,
                'attributes',
                'tabindex',
                value || null,
                null
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AccessibilityAttributes
