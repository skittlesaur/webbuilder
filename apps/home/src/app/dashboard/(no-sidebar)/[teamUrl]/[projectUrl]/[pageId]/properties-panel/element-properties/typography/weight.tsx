import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import FontsData from '../../../fonts-data.json'
import { useInteractionsStore } from '@/stores/interactions-store'
import { useCanvasStore } from '@/stores/canvas-store'

const weightMap = {
  100: 'Extra Thin',
  200: 'Thin',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semibold',
  700: 'Bold',
  800: 'Extrabold',
  900: 'Black',
}

const FontWeight = ({
  fontFamily,
  fontWeight,
}: {
  fontFamily?: string
  fontWeight?: string
}) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)

  const weights = FontsData.find((font) => font.family === fontFamily)?.variants

  const getSelectedWeight = () => {
    if (fontWeight && weightMap[fontWeight]) return fontWeight

    const keys = Object.keys(weightMap)

    for (const key of keys) {
      if (weightMap[key].toLowerCase() === fontWeight?.toLowerCase()) return key
    }

    return 400
  }

  if (!weights) return null

  return (
    <div className="relative grid grid-cols-[0.5fr_1fr] gap-2 items-center group">
      <p className="text-gray-400">Weight</p>
      <Select
        defaultValue={String(getSelectedWeight())}
        onValueChange={(val) => {
          if (selectedElementId === null) return
          updateElementAttribute(
            selectedElementId,
            'style',
            'fontWeight',
            val,
            selectedMediaQuery
          )
        }}>
        <SelectTrigger className="truncate">
          <SelectValue asChild placeholder="Select a weight">
            <p className="truncate text-left !text-sm !font-normal !font-sans">
              {weightMap[String(getSelectedWeight())]}
            </p>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[14.5rem] overflow-y-auto">
          {weights.map((weight) => (
            <SelectItem key={weight} value={String(weight)}>
              <p
                className="truncate w-full"
                style={{
                  fontFamily,
                  fontWeight: weight,
                }}>
                {weight} - {weightMap[weight]}
              </p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FontWeight
