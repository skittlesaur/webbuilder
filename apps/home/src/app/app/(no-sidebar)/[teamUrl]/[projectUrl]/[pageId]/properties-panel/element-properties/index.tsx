import { Fragment, useMemo, useState } from 'react'
import cn from 'classnames'
import type { Position } from './position'
import ElementPropertiesPosition from './position'
import ElementPropertiesSize from './size'
import ElementPropertiesFill from './fill'
import ElementPropertiesTypography from './typography'
import ElementPropertiesPaddingAndMargin from './padding-and-margin'
import LinkAttributes from './link'
import ElementPropertiesParent from './parent'
import ImageAttributes from './image'
import AccessibilityAttributes from './accessibility'
import MakeComponentButton from './make-component'
import ElementPropertiesDisplay from './display'
import { useInteractionsStore } from '@/stores/interactions-store'
import { findElementByIdArr } from '@/lib/find-element-by-id'
import { useCanvasStore } from '@/stores/canvas-store'
import ScrollableWrapper from '@/components/scrollable-wrapper'

enum PropertyPanel {
  STYLE,
  ATTRIBUTES,
}

const panels = [
  {
    title: 'Style',
    panel: PropertyPanel.STYLE,
  },
  {
    title: 'Attributes',
    panel: PropertyPanel.ATTRIBUTES,
  },
]

const ElementProperties = () => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const elements = useCanvasStore((s) => s.elements)
  const [activePanel, setActivePanel] = useState(PropertyPanel.STYLE)

  const activeElement = useMemo(() => {
    if (!selectedElementId) return null
    return findElementByIdArr(elements, selectedElementId)
  }, [elements, selectedElementId])

  if (!activeElement) return null

  const getStyleAttribute = (attribute: string) => {
    if (selectedMediaQuery !== null) {
      const queries = Object.keys(
        (activeElement.mediaQueries || {}) as Record<string, unknown>
      )
        .filter((mq) => Number(mq) <= (selectedMediaQuery || 0))
        .sort((a, b) => Number(a) - Number(b))

      const queryStyles = queries.reduce((acc, mq) => {
        return {
          ...acc,
          ...activeElement.mediaQueries?.[mq],
        }
      }, {})

      return queryStyles[attribute] || activeElement.style[attribute]
    }

    return activeElement.style[attribute]
  }

  return (
    <Fragment key={`${selectedElementId}-${selectedMediaQuery}`}>
      <div className="relative z-[1] bg-background flex items-center justify-between w-full px-2 border-b border-border">
        <div className="flex items-center">
          {panels.map((p) => (
            <button
              className={cn('text-xs px-2 py-2', {
                'text-white': activePanel === p.panel,
                'text-white/70': activePanel !== p.panel,
              })}
              key={p.panel}
              type="button"
              onClick={() => setActivePanel(p.panel)}>
              {p.title}
            </button>
          ))}
        </div>
        <MakeComponentButton />
      </div>
      <ScrollableWrapper>
        <ElementPropertiesParent />
        {activePanel === PropertyPanel.STYLE && (
          <>
            <ElementPropertiesPosition
              bottom={getStyleAttribute('bottom')}
              left={getStyleAttribute('left')}
              position={getStyleAttribute('position') as Position}
              right={getStyleAttribute('right')}
              top={getStyleAttribute('top')}
            />
            <ElementPropertiesDisplay
              alignItems={getStyleAttribute('alignItems')}
              display={getStyleAttribute('display')}
              flexDirection={getStyleAttribute('flexDirection')}
              flexWrap={getStyleAttribute('flexWrap')}
              gap={getStyleAttribute('gap')}
              justifyContent={getStyleAttribute('justifyContent')}
              visibility={getStyleAttribute('visibility')}
            />
            <ElementPropertiesSize
              height={getStyleAttribute('height')}
              maxHeight={getStyleAttribute('maxHeight')}
              maxWidth={getStyleAttribute('maxWidth')}
              minHeight={getStyleAttribute('minHeight')}
              minWidth={getStyleAttribute('minWidth')}
              width={getStyleAttribute('width')}
            />
            <ElementPropertiesPaddingAndMargin
              marginBottom={getStyleAttribute('marginBottom')}
              marginLeft={getStyleAttribute('marginLeft')}
              marginRight={getStyleAttribute('marginRight')}
              marginTop={getStyleAttribute('marginTop')}
              paddingBottom={getStyleAttribute('paddingBottom')}
              paddingLeft={getStyleAttribute('paddingLeft')}
              paddingRight={getStyleAttribute('paddingRight')}
              paddingTop={getStyleAttribute('paddingTop')}
            />
            <ElementPropertiesFill
              background={getStyleAttribute('background')}
            />
            <ElementPropertiesTypography
              fontFamily={getStyleAttribute('fontFamily')}
              fontSize={getStyleAttribute('fontSize')}
              fontWeight={getStyleAttribute('fontWeight')}
              letterSpacing={getStyleAttribute('letterSpacing')}
              lineHeight={getStyleAttribute('lineHeight')}
              textAlign={getStyleAttribute('textAlign')}
            />
          </>
        )}
        {activePanel === PropertyPanel.ATTRIBUTES && (
          <>
            <LinkAttributes
              href={activeElement.attributes?.href as string | undefined}
              isAnchor={activeElement.type === 'a'}
              target={activeElement.attributes?.target as string | undefined}
            />
            <ImageAttributes
              alt={activeElement.attributes?.alt as string | undefined}
              isImage={activeElement.type === 'img'}
              src={activeElement.attributes?.src as string | undefined}
            />
            <AccessibilityAttributes
              ariaLabel={
                activeElement.attributes?.['aria-label'] as string | undefined
              }
              ariaRole={
                activeElement.attributes?.['aria-role'] as string | undefined
              }
            />
          </>
        )}
      </ScrollableWrapper>
    </Fragment>
  )
}

export default ElementProperties
