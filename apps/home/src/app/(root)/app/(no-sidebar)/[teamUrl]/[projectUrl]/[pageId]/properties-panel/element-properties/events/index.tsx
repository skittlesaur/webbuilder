import { Fragment, useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from 'ui'
import Link from 'next/link'
import cn from 'classnames'
import type { EditorRef } from './editor'
import Editor from './editor'
import { findElementByIdArr } from '@/lib/find-element-by-id'
import type { ElementEvent } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import capitalizeFirstLetter from '@/lib/capitalize-first-letter'

const events: {
  category: string
  types: {
    type: ElementEvent
    title: string
    docs?: string
  }[]
}[] = [
  {
    category: 'Mouse Events',
    types: [
      {
        type: 'click',
        title: 'Click',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event',
      },
      {
        type: 'dblclick',
        title: 'Double Click',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event',
      },
      {
        type: 'mousedown',
        title: 'Mouse Down',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event',
      },
      {
        type: 'mouseenter',
        title: 'Mouse Enter',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event',
      },
      {
        type: 'mouseleave',
        title: 'Mouse Leave',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event',
      },
      {
        type: 'mousemove',
        title: 'Mouse Move',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event',
      },
      {
        type: 'mouseover',
        title: 'Mouse Over',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event',
      },
      {
        type: 'mouseout',
        title: 'Mouse Out',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event',
      },
      {
        type: 'mouseup',
        title: 'Mouse Up',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event',
      },
      {
        type: 'wheel',
        title: 'Wheel',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event',
      },
    ],
  },
  {
    category: 'Keyboard Events',
    types: [
      {
        type: 'keydown',
        title: 'Key Down',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event',
      },
      {
        type: 'keypress',
        title: 'Key Press',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event',
      },
      {
        type: 'keyup',
        title: 'Key Up',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event',
      },
    ],
  },
  {
    category: 'Form Events',
    types: [
      {
        type: 'blur',
        title: 'Blur',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event',
      },
      {
        type: 'change',
        title: 'Change',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/change_event',
      },
      {
        type: 'focus',
        title: 'Focus',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event',
      },
      {
        type: 'focusin',
        title: 'Focus In',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event',
      },
      {
        type: 'focusout',
        title: 'Focus Out',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event',
      },
      {
        type: 'input',
        title: 'Input',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event',
      },
      {
        type: 'invalid',
        title: 'Invalid',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/invalid_event',
      },
      {
        type: 'reset',
        title: 'Reset',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/reset_event',
      },
      {
        type: 'search',
        title: 'Search',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/search_event',
      },
      {
        type: 'select',
        title: 'Select',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event',
      },
      {
        type: 'submit',
        title: 'Submit',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/submit_event',
      },
    ],
  },
]

const EventsPanel = () => {
  const [activeEvent, setActiveEvent] = useState<
    null | (typeof events)[0]['types'][0]
  >(null)
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  const elements = useCanvasStore((s) => s.elements)
  const editorRef = useRef<EditorRef>(null)

  if (!selectedElementId) return null

  const activeElement = findElementByIdArr(elements, selectedElementId)

  if (!activeElement) return null

  return (
    <AlertDialog open={activeEvent !== null}>
      <div className="flex flex-col gap-4 p-4 border-b border-border">
        {events.map((category) => (
          <Fragment key={category.category}>
            <p className="font-medium">
              {category.category}
            </p>
            <div className="flex flex-col gap-3">
              {category.types.map((event) => (
                <div
                  className="grid grid-cols-[0.5fr_1fr] gap-2 items-center"
                  key={event.type}>
                  <TooltipProvider disableHoverableContent delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-gray-400 truncate">{event.title}</p>
                      </TooltipTrigger>
                      <TooltipContent
                        className="h-8"
                        side="left"
                        sideOffset={8}>
                        {event.title}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <AlertDialogTrigger asChild>
                    <button
                      className={cn(
                        'w-full px-3 py-1 text-sm text-left truncate transition-colors border rounded-md shadow-sm bg-background hover:bg-accent h-9 border-border',
                        {
                          'text-white': activeElement.events?.[event.type],
                          'text-neutral-400':
                            !activeElement.events?.[event.type],
                        }
                      )}
                      type="button"
                      onClick={() => setActiveEvent(event)}>
                      {activeElement.events?.[event.type] ? 'Edit' : 'Add'}{' '}
                      Event
                    </button>
                  </AlertDialogTrigger>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
      <AlertDialogContent className="!max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{activeEvent?.title} Event</AlertDialogTitle>
          <AlertDialogDescription>
            Write below the code that will be executed when the event is
            triggered.{' '}
            {activeEvent?.docs ? (
              <Link
                className="inline-block font-medium underline text-neutral-400 hover:text-white underline-offset-4"
                href={activeEvent?.docs}
                rel="noopener noreferrer"
                target="_blank"
                onClick={(e) => {
                  e.stopPropagation()
                }}>
                Learn more about {activeEvent?.type} events.
              </Link>
            ) : null}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full min-h-[14rem] max-h-[20rem] rounded-md border border-border bg-accent overflow-clip">
          <Editor
            initialValue={
              activeElement.events?.[activeEvent?.type || ''] ||
              `function handle${capitalizeFirstLetter(
                activeEvent?.type || ''
              )}(event) {
  // Write your code here
  
}`
            }
            ref={editorRef}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setActiveEvent(null)
            }}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (!editorRef.current) return
              const value = editorRef.current.getValue()

              updateElementAttribute(
                selectedElementId,
                'events',
                activeEvent?.type || '',
                value,
                null
              )
              setActiveEvent(null)
            }}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EventsPanel
