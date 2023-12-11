import ElementPropertiesBorder from './border'
import TypographyColor from './color'
import ElementPropertiesFill from './fill'

const ElementPropertiesColors = ({
  color,
  background,
  borderColor,
  borderWidth,
  isBody,
}) => {
  return (
    <div className="relative flex flex-col gap-4 p-4 border-b border-border">
      <p className="font-medium">Colors</p>
      <TypographyColor color={color} isBody={isBody} />
      <div className="relative flex flex-col gap-3 px-4 -mx-4">
        <ElementPropertiesFill background={background} isBody={isBody} />
      </div>
      {!isBody && (
        <div className="relative flex flex-col gap-3 px-4 -mx-4">
          <ElementPropertiesBorder
            borderColor={borderColor}
            borderWidth={borderWidth}
          />
        </div>
      )}
    </div>
  )
}

export default ElementPropertiesColors
