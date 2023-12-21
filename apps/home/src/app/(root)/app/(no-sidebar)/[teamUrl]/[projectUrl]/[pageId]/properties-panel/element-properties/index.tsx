import { Fragment, useMemo, useState } from 'react'
import cn from 'classnames'
import type { Position } from './position'
import ElementPropertiesPosition from './position'
import ElementPropertiesSize from './size'
import ElementPropertiesTypography from './typography'
import ElementPropertiesPaddingAndMargin from './padding-and-margin'
import LinkAttributes from './link'
import ElementPropertiesParent from './parent'
import ImageAttributes from './image'
import AccessibilityAttributes from './accessibility'
import MakeComponentButton from './make-component'
import ElementPropertiesDisplay from './display'
import InputAttributes from './input'
import ElementPropertiesColors from './colors'
import StateSelector from './state-selector'
import EventsPanel from './events'
import { useInteractionsStore } from '@/stores/interactions-store'
import { findElementByIdArr } from '@/lib/find-element-by-id'
import { useCanvasStore } from '@/stores/canvas-store'
import ScrollableWrapper from '@/components/scrollable-wrapper'

enum PropertyPanel {
  STYLE = 'style',
  ATTRIBUTES = 'attributes',
  EVENTS = 'events',
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
  {
    title: 'Events',
    panel: PropertyPanel.EVENTS,
  },
]

const ElementProperties = ({ isBody }: { isBody?: boolean }) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const bodyStyles = useCanvasStore((s) => s.bodyStyles)
  const elements = useCanvasStore((s) => s.elements)
  const [activePanel, setActivePanel] = useState(PropertyPanel.STYLE)
  const selectedState = useInteractionsStore((s) => s.selectedState)

  const activeElement = useMemo(() => {
    if (isBody) return null
    return findElementByIdArr(elements, selectedElementId)
  }, [elements, isBody, selectedElementId])

  if (!isBody && !activeElement) return null

  const formatViewportValues = (data = {}) => {
    return Object.keys(data).reduce((a, key) => {
      const value = data[key]

      if (value === undefined || value === null) return a

      if (String(value).endsWith('vh')) {
        const num = Number(value.replace('vh', ''))
        return {
          ...a,
          [key]: `calc(var(--vh) * ${num / 100})`,
        }
      }

      if (String(value).endsWith('vw')) {
        const num = Number(value.replace('vw', ''))
        return {
          ...a,
          [key]: `calc(var(--vw) * ${num / 100})`,
        }
      }

      return {
        ...a,
        [key]: value,
      }
    }, {})
  }

  const getStyleAttribute = (attribute: string) => {
    if (isBody) {
      if (selectedMediaQuery !== null) {
        const queries = Object.keys(
          (bodyStyles.mediaQueries || {}) as Record<string, unknown>
        )
          .filter((mq) => Number(mq) <= (selectedMediaQuery || 0))
          .sort((a, b) => Number(a) - Number(b))

        const queryStyles = queries.reduce((acc, mq) => {
          return {
            ...acc,
            ...bodyStyles.mediaQueries?.[mq],
          }
        }, {})

        return queryStyles[attribute] || bodyStyles[attribute]
      }

      return bodyStyles[attribute]
    }

    if (!activeElement) return null

    const queries = Object.keys(
      (activeElement.mediaQueries || {}) as Record<string, unknown>
    )
      .filter((mq) => Number(mq) <= (selectedMediaQuery || Infinity))
      .sort((a, b) => Number(a) - Number(b))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO
    const queryStyles = queries.reduce<any>((acc, mq) => {
      const defaultQuery = activeElement.mediaQueries?.[mq]?.default || {}
      const selectedQuery =
        activeElement.mediaQueries?.[mq]?.[selectedState] || {}

      const formattedDefaultQuery = formatViewportValues(defaultQuery)
      const formattedSelectedQuery = formatViewportValues(selectedQuery)

      return {
        default: {
          ...acc.default,
          ...formattedDefaultQuery,
        },
        [selectedState]: {
          ...acc[selectedState],
          ...formattedSelectedQuery,
        },
      }
    }, {})

    const defaultStyles = formatViewportValues(activeElement.style?.default)
    const selectedStyles = formatViewportValues(
      activeElement.style?.[selectedState]
    )

    const elementStyles =
      selectedMediaQuery === null
        ? {
            ...queryStyles.default,
            ...defaultStyles,
            ...queryStyles[selectedState],
            ...selectedStyles,
          }
        : {
            ...defaultStyles,
            ...queryStyles.default,
            ...selectedStyles,
            ...queryStyles[selectedState],
          }

    return elementStyles[attribute]
  }

  return (
    <Fragment
      key={`${selectedElementId}-${selectedMediaQuery}-${selectedState}`}>
      {!isBody && (
        <div className="relative z-[1] bg-background flex items-center w-full px-2 border-b border-border">
          {panels.map((p) => (
            <button
              className={cn('text-xs px-2 py-2', {
                'text-white': activePanel === p.panel,
                'text-white/70': activePanel !== p.panel,
              })}
              id={`properties-panel-tab-${p.panel}`}
              key={p.panel}
              type="button"
              onClick={() => setActivePanel(p.panel)}>
              {p.title}
            </button>
          ))}
        </div>
      )}
      <ScrollableWrapper>
        {activePanel !== PropertyPanel.EVENTS && (
          <>
            <ElementPropertiesParent />
            {!isBody && <MakeComponentButton />}
          </>
        )}
        {activePanel === PropertyPanel.STYLE && (
          <>
            {!isBody && <StateSelector />}
            {!isBody && (
              <ElementPropertiesPosition
                bottom={getStyleAttribute('bottom')}
                left={getStyleAttribute('left')}
                position={getStyleAttribute('position') as Position}
                right={getStyleAttribute('right')}
                top={getStyleAttribute('top')}
              />
            )}
            <ElementPropertiesDisplay
              alignItems={getStyleAttribute('alignItems')}
              display={getStyleAttribute('display')}
              flexDirection={getStyleAttribute('flexDirection')}
              flexWrap={getStyleAttribute('flexWrap')}
              gap={getStyleAttribute('gap')}
              isBody={isBody}
              justifyContent={getStyleAttribute('justifyContent')}
              visibility={getStyleAttribute('visibility')}
            />
            {!isBody && (
              <ElementPropertiesSize
                height={getStyleAttribute('height')}
                maxHeight={getStyleAttribute('maxHeight')}
                maxWidth={getStyleAttribute('maxWidth')}
                minHeight={getStyleAttribute('minHeight')}
                minWidth={getStyleAttribute('minWidth')}
                width={getStyleAttribute('width')}
              />
            )}
            <ElementPropertiesPaddingAndMargin
              isBody={isBody}
              marginBottom={getStyleAttribute('marginBottom')}
              marginLeft={getStyleAttribute('marginLeft')}
              marginRight={getStyleAttribute('marginRight')}
              marginTop={getStyleAttribute('marginTop')}
              paddingBottom={getStyleAttribute('paddingBottom')}
              paddingLeft={getStyleAttribute('paddingLeft')}
              paddingRight={getStyleAttribute('paddingRight')}
              paddingTop={getStyleAttribute('paddingTop')}
            />
            <ElementPropertiesColors
              background={getStyleAttribute('background')}
              borderColor={getStyleAttribute('borderColor')}
              borderWidth={getStyleAttribute('borderWidth')}
              color={getStyleAttribute('color')}
              isBody={isBody}
            />
            <ElementPropertiesTypography
              fontFamily={getStyleAttribute('fontFamily')}
              fontSize={getStyleAttribute('fontSize')}
              fontWeight={getStyleAttribute('fontWeight')}
              isBody={isBody}
              letterSpacing={getStyleAttribute('letterSpacing')}
              lineHeight={getStyleAttribute('lineHeight')}
              textAlign={getStyleAttribute('textAlign')}
            />
          </>
        )}
        {!isBody &&
        activeElement &&
        activePanel === PropertyPanel.ATTRIBUTES ? (
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
            <InputAttributes
              disabled={activeElement.attributes?.disabled as boolean}
              isInput={activeElement.type === 'input'}
              placeholder={
                activeElement.attributes?.placeholder as string | undefined
              }
              type={activeElement.attributes?.type as string | undefined}
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
        ) : null}
        {activePanel === PropertyPanel.EVENTS && <EventsPanel />}
      </ScrollableWrapper>
    </Fragment>
  )
}

export default ElementProperties
