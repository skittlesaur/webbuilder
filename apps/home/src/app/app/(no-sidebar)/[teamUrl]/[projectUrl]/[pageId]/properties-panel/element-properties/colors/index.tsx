import ElementPropertiesBorder from './border'
import TypographyColor from './color'
import ElementPropertiesFill from './fill'

const ElementPropertiesColors = ({
  color,
  background,
  borderColor,
  borderWidth,
}) => {
  return (
    <div className="relative flex flex-col gap-4 p-4 border-b border-border">
      <p className="font-medium">Colors</p>
      <TypographyColor color={color} />
      <div className="relative flex flex-col gap-3 px-4 -mx-4">
        <ElementPropertiesFill background={background} />
      </div>
      <div className="relative flex flex-col gap-3 px-4 -mx-4">
        <ElementPropertiesBorder
          borderColor={borderColor}
          borderWidth={borderWidth}
        />
      </div>
    </div>
  )
}

export default ElementPropertiesColors
