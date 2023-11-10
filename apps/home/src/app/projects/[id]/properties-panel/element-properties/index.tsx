import { Fragment, useMemo } from 'react'
import type { Position } from './position'
import ElementPropertiesPosition from './position'
import ElementPropertiesSize from './size'
import ElementPropertiesFill from './fill'
import ElementPropertiesTypography from './typography'
import { findElementByIdArr } from '@/lib/find-element-by-id'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const ElementProperties = () => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const elements = useCanvasStore((s) => s.elements)

  const activeElement = useMemo(() => {
    if (!selectedElementId) return null
    return findElementByIdArr(elements, selectedElementId)
  }, [elements, selectedElementId])

  if (!activeElement) return null

  const getAttribute = (attribute: string) => {
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
      <ElementPropertiesPosition
        bottom={getAttribute('bottom')}
        left={getAttribute('left')}
        position={getAttribute('position') as Position}
        right={getAttribute('right')}
        top={getAttribute('top')}
      />
      <ElementPropertiesSize
        height={getAttribute('height')}
        maxHeight={getAttribute('maxHeight')}
        maxWidth={getAttribute('maxWidth')}
        minHeight={getAttribute('minHeight')}
        minWidth={getAttribute('minWidth')}
        width={getAttribute('width')}
      />
      <ElementPropertiesFill background={getAttribute('background')} />
      <ElementPropertiesTypography
        fontFamily={getAttribute('fontFamily')}
        fontSize={getAttribute('fontSize')}
        fontWeight={getAttribute('fontWeight')}
        letterSpacing={getAttribute('letterSpacing')}
        lineHeight={getAttribute('lineHeight')}
        textAlign={getAttribute('textAlign')}
      />
    </Fragment>
  )
}

export default ElementProperties
