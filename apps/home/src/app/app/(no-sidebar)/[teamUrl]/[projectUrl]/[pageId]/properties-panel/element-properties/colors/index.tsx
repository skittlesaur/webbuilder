import ElementPropertiesBorder from './border'
import ElementPropertiesFill from './fill'

const ElementPropertiesColors = ({
  background,
  borderColor,
  borderWidth,
}) => {
  return (
    <div className="relative flex flex-col gap-4 p-4 border-b border-border">
      <p className="font-medium">Colors</p>
      <div className="relative flex flex-col gap-3">
        <ElementPropertiesFill background={background} />
      </div>
      <div className="relative flex flex-col gap-3">
        <ElementPropertiesBorder
          borderColor={borderColor}
          borderWidth={borderWidth}
        />
      </div>
    </div>
  )
}

export default ElementPropertiesColors
