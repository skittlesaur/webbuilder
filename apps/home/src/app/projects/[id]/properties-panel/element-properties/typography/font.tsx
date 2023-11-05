import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import FontsData from '../../../fonts-data.json'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const TypographyFont = ({ fontFamily }: { fontFamily?: string }) => {
  const { selectedElementId, selectedMediaQuery } = useInteractionsStore()
  const { updateElementAttribute } = useCanvasStore()

  return (
    <div className="relative grid grid-cols-[0.5fr_1fr] gap-2 items-center group">
      <p className="text-gray-400">Font</p>
      <Select
        defaultValue={fontFamily || 'Inter'}
        onValueChange={(val) => {
          if (selectedElementId === null) return

          const font = FontsData.find((f) => f.family === val)
          if (!font) return

          updateElementAttribute(
            selectedElementId,
            'style',
            'fontFamily',
            `${font.family}, Inter, sans-serif`,
            selectedMediaQuery
          )
        }}>
        <SelectTrigger className="truncate">
          <SelectValue asChild placeholder="Select a font">
            <p className="truncate text-left !text-sm !font-normal !font-sans">
              {fontFamily || 'Inter'}
            </p>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="h-[20rem] w-[14.5rem] overflow-y-auto">
          {FontsData.map((font) => (
            <SelectItem key={font.family} value={font.family}>
              <p
                className="truncate w-full"
                style={{
                  fontFamily: `${font.family}, Inter, sans-serif`,
                }}>
                {font.family}
              </p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default TypographyFont
