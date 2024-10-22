'use client'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { FontBoldIcon, FontItalicIcon } from '@radix-ui/react-icons'
import cn from 'classnames'
import { Typography } from '@tiptap/extension-typography'
import { Superscript } from '@tiptap/extension-superscript'
import { Subscript } from '@tiptap/extension-subscript'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { createId } from '@paralleldrive/cuid2'
import { useEffect, type CSSProperties } from 'react'
import { useCanvasStore } from '@/stores/canvas-store'
import type { Element } from '@/stores/canvas-store'
import SubscriptIcon from '@/icons/subscript.svg'
import SuperscriptIcon from '@/icons/superscript.svg'
import { findElementByIdArr } from '@/lib/find-element-by-id'
import { useInteractionsStore } from '@/stores/interactions-store'

interface BubbleMenuButton {
  type: string
  text: string
  fn: string
  icon: React.ReactNode
}

const bubbleMenuButtons: BubbleMenuButton[] = [
  {
    type: 'bold',
    text: 'Bold',
    fn: 'toggleBold',
    icon: <FontBoldIcon className="w-5 h-5" />,
  },
  {
    type: 'italic',
    text: 'Italic',
    fn: 'toggleItalic',
    icon: <FontItalicIcon className="w-5 h-5" />,
  },
  {
    type: 'superscript',
    text: 'Superscript',
    fn: 'toggleSuperscript',
    icon: <SuperscriptIcon className="w-5 h-5" />,
  },
  {
    type: 'subscript',
    text: 'Subscript',
    fn: 'toggleSubscript',
    icon: <SubscriptIcon className="w-5 h-5" />,
  },
]

const TypographyElement = ({ element }: { element: Element }) => {
  const updateElement = useCanvasStore((s) => s.updateElement)
  const draggedElement = useCanvasStore((s) => s.draggedElement)
  const elements = useCanvasStore((s) => s.elements)
  const selectedState = useInteractionsStore((s) => s.selectedState)

  const generateContent = (el: Element) => {
    return el.children.map((child) => {
      const getContent = (e: Element | string) => {
        if (typeof e === 'string')
          return {
            type: 'text',
            text: e,
          }

        return {
          type: 'text',
          text: e.children
            .map((c) => {
              return getContent(c).text
            })
            .join(''),
          marks: [
            {
              type: 'textStyle',
              attrs: {
                color:
                  e.style?.[selectedState]?.color || e.style?.default?.color,
                fontSize:
                  e.style?.[selectedState]?.fontSize ||
                  e.style?.default?.fontSize,
                fontWeight:
                  e.style?.[selectedState]?.fontWeight ||
                  e.style?.default?.fontWeight,
                fontStyle:
                  e.style?.[selectedState]?.fontStyle ||
                  e.style?.default?.fontStyle,
                textDecoration:
                  e.style?.[selectedState]?.textDecoration ||
                  e.style?.default?.textDecoration,
              },
            },
            ...(e.type === 'sup' ? [{ type: 'superscript' }] : []),
            ...(e.type === 'sub' ? [{ type: 'subscript' }] : []),
            ...((e.style?.[selectedState]?.fontWeight ||
              e.style?.default?.fontWeight) === 'bold'
              ? [{ type: 'bold' }]
              : []),
            ...((e.style?.[selectedState]?.fontStyle ||
              e.style?.default?.fontStyle) === 'italic'
              ? [{ type: 'italic' }]
              : []),
            // filter out undefined values
          ].filter((mark) => mark.attrs || mark.type !== 'textStyle'),
        }
      }

      return getContent(child)
    })
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Superscript,
      Subscript,
      TextStyle,
      Color,
    ],
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: generateContent(element),
        },
      ],
    },
    onUpdate: ({ editor: updateEditor }) => {
      const { content } = updateEditor.getJSON()

      const newChildren = content?.[0].content?.map((child) => {
        const { marks, text } = child
        if (!text) return ''
        if (marks?.length === 0) return text

        const newElement: Element = {
          id: createId(),
          type: 'span',
          children: [text],
          style: {
            default: {},
            hover: {},
            focus: {},
            active: {},
            visited: {},
            disabled: {},
          },
        }

        marks?.forEach((mark) => {
          if (mark.type === 'textStyle' && mark.attrs) {
            const styles: CSSProperties = {
              ...(newElement.style?.[selectedState] || {}),
              color: mark.attrs.color,
              fontSize: mark.attrs.fontSize,
              fontWeight: mark.attrs.fontWeight,
              fontStyle: mark.attrs.fontStyle,
              textDecoration: mark.attrs.textDecoration,
            }
            newElement.style[selectedState] = styles
          } else if (mark.type === 'bold') {
            ;(newElement.style[selectedState] as CSSProperties).fontWeight =
              'bold'
          } else if (mark.type === 'italic') {
            ;(newElement.style[selectedState] as CSSProperties).fontStyle =
              'italic'
          } else if (mark.type === 'superscript') {
            newElement.type = 'sup'
          } else if (mark.type === 'subscript') {
            newElement.type = 'sub'
          }
        })

        // filter out undefined values
        Object.keys(newElement.style as CSSProperties).forEach(
          (key) =>
            (newElement.style[key] === undefined ||
              newElement.style[key] === null) &&
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- dynamic delete is needed here
            delete newElement.style[key]
        )

        if (
          Object.keys(newElement.style as CSSProperties).length === 0 &&
          newElement.children.length === 1
        ) {
          return newElement.children[0]
        }

        return newElement
      })

      updateElement(element.id, {
        children: newChildren || [],
      })
    },
  })

  useEffect(() => {
    const newElement = findElementByIdArr(elements, element.id)
    if (!newElement) return

    const newContent = generateContent(newElement)
    editor
      ?.chain()
      .setContent({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: newContent,
          },
        ],
      })
      .run()
  }, [editor, element.id, elements])

  // @todo: wrap in span
  // const handleWrapInSpan = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()
  //   e.stopPropagation()

  //   const selection = editor?.state.selection
  //   if (!selection) return

  //   const { from, to } = selection
  //   if (from === to) return

  //   const content = editor.getJSON().content?.[0].content
  //   if (!content) return

  //
  // }

  return (
    <>
      {editor && draggedElement === null ? (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="mb-2 flex gap-0.5 bg-accent/80 backdrop-blur px-1 py-0.5 rounded-md border border-border shadow-md">
            {bubbleMenuButtons.map((button) => (
              <button
                className={cn(
                  'p-1 rounded transition-all duration-100 ease-in-out',
                  {
                    'text-white hover:bg-secondary': editor.isActive(
                      button.type
                    ),
                    'text-neutral-400/80 hover:text-white/90 hover:bg-secondary':
                      !editor.isActive(button.type),
                  }
                )}
                key={button.type}
                type="button"
                onClick={() => editor.chain().focus()[button.fn]?.().run()}>
                <span className="sr-only">{button.text}</span>
                {button.icon}
              </button>
            ))}
            {/* <button
              className="p-1 transition-all duration-100 ease-in-out rounded text-neutral-400/80 hover:text-white/90 hover:bg-secondary"
              type="button"
              onClick={handleWrapInSpan}>
              <span className="sr-only">Wrap in span</span>
              <WrapInSpanIcon className="w-5 h-5" />
            </button> */}
          </div>
        </BubbleMenu>
      ) : null}
      <EditorContent
        className="w-full h-full [&_*]:w-full [&_*]:h-full"
        editor={editor}
        onBlur={() => {
          // clear selection
          window.getSelection()?.removeAllRanges()
        }}
      />
    </>
  )
}

export default TypographyElement
