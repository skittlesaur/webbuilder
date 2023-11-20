import { memo} from 'react'
import {  } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import {} from 'sonner'

const GradientEditor = () => {
  const gradientEditor = useInteractionsStore((s) => s.gradientEditor)

  if (!gradientEditor) return null

  const { value } = gradientEditor
  const degree = 0

  return (
    <div className="w-full h-full absolute">
      <div className="relative  w-full h-full">
        {value.map((item, index) => {
          // calculate item top and left based on degree
          const top =
            100 -
            Math.round(
              Math.sin(((90 - degree) * Math.PI) / 180) * item.position
            )
          const left = Math.round(
            Math.cos(((90 - degree) * Math.PI) / 180) * item.position
          )

          return (
            <div
              className="text-3xl text-primary absolute w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 border border-border shadow-lg"
              key={index}
              style={{
                background: item.color,
                top: `${top}%`,
                left: `${left}%`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default memo(GradientEditor, () => true)
