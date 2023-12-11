import InputWithUnit from '../input-with-unit'
import AlignText from './align'
import TypographyFont from './font'
import FontWeight from './weight'

const ElementPropertiesTypography = ({
  fontFamily,
  fontWeight,
  fontSize,
  letterSpacing,
  lineHeight,
  textAlign,
  isBody,
}) => {
  const family = fontFamily?.split(',')[0]?.trim() || 'Inter'

  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border">
      <p className="font-medium">Typography</p>
      <div className="flex flex-col gap-3">
        <TypographyFont fontFamily={family} isBody={isBody} />
        <FontWeight
          fontFamily={family}
          fontWeight={fontWeight}
          isBody={isBody}
        />
        <div className="relative grid grid-cols-[0.5fr_1fr] gap-2 items-center group">
          <p className="text-gray-400">Size</p>
          <InputWithUnit
            showMeasure
            initial={fontSize || '1rem'}
            isBody={isBody}
            type="fontSize"
          />
        </div>
        <div className="relative grid grid-cols-[0.5fr_1fr] gap-2 items-center group">
          <p className="text-gray-400">Spacing</p>
          <InputWithUnit
            showMeasure
            initial={letterSpacing || '0px'}
            isBody={isBody}
            type="letterSpacing"
          />
        </div>
        <div className="relative grid grid-cols-[0.5fr_1fr] gap-2 items-center group">
          <p className="text-gray-400">Line</p>
          <InputWithUnit
            showMeasure
            initial={lineHeight || '1.5rem'}
            isBody={isBody}
            type="lineHeight"
          />
        </div>
        <AlignText isBody={isBody} textAlign={textAlign} />
      </div>
    </div>
  )
}

export default ElementPropertiesTypography
