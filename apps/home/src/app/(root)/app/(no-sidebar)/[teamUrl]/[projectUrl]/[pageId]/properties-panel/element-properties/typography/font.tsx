import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import FontsData from '@/lib/fonts-data.json'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'

const TypographyFont = ({
  fontFamily,
  isBody,
}: {
  fontFamily?: string
  isBody?: boolean
}) => {
  const selectedElementId = useInteractionsStore((s) => s.selectedElementId)
  const selectedMediaQuery = useInteractionsStore((s) => s.selectedMediaQuery)
  const updateElementAttribute = useCanvasStore((s) => s.updateElementAttribute)
  const customFonts = useCanvasStore((s) => s.customFonts)?.map((f) => ({
    family: f.fontFamily,
    variants: f.fontWeights,
  }))
  const updateBodyStyle = useCanvasStore((s) => s.updateBodyStyle)

  return (
    <div className="relative grid grid-cols-[0.5fr_1fr] gap-2 items-center group">
      <p className="text-gray-400">Font</p>
      <Select
        defaultValue={fontFamily || 'Inter'}
        onValueChange={(val) => {
          if (isBody) {
            updateBodyStyle('fontFamily', val, selectedMediaQuery)
            return
          }

          const font = FontsData.find((f) => f.family === val)
          if (!font) return

          if (selectedElementId === null) return

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
          {[...customFonts, ...FontsData].map((font) => (
            <SelectItem key={font.family} value={font.family}>
              <p
                className="w-full truncate"
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
