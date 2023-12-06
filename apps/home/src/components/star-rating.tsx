import { motion } from 'framer-motion'
import { forwardRef, useImperativeHandle, useState } from 'react'
import cn from 'classnames'
import StarOutline from '@/icons/star-outline.svg'
import Star from '@/icons/star.svg'

interface StarRatingProps {
  maxRating?: number
  leastLabel?: string
  mostLabel?: string
  disabled?: boolean
  initialRating?: number
}

export interface StarRatingRef {
  value: number | null
}

const StarRating = forwardRef<StarRatingRef, StarRatingProps>(
  (
    { maxRating = 5, initialRating, leastLabel, mostLabel, disabled = false },
    ref
  ) => {
    const [selectedStar, setSelectedStar] = useState<number | null>(
      initialRating ?? null
    )
    const [hoveredStar, setHoveredStar] = useState<number | null>(null)

    useImperativeHandle(ref, () => ({
      value: selectedStar,
    }))

    return (
      <div
        className="relative flex items-center justify-center w-fit"
        onMouseLeave={() => setHoveredStar(null)}>
        {Array.from({ length: maxRating }).map((_, i) => (
          <motion.button
            animate={{
              scale: i <= (hoveredStar ?? -1) ? 1.1 : 1,
            }}
            className="w-12 h-12 p-1"
            disabled={disabled}
            key={`star-${i + 1}`}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ duration: 0.1 }}
            type="button"
            whileTap={{ scale: disabled ? undefined : 0.9 }}
            onClick={() => setSelectedStar((prev) => (prev === i ? null : i))}
            onMouseEnter={() => setHoveredStar(i)}>
            {i <= (hoveredStar ?? selectedStar ?? -1) ? (
              <Star
                className={cn('w-full h-full', {
                  'fill-amber-600': selectedStar !== null && i <= selectedStar,
                  'fill-amber-500/60':
                    selectedStar !== null ? i > selectedStar : true,
                })}
              />
            ) : (
              <StarOutline
                className={cn('w-full h-full', {
                  'text-amber-600/50':
                    selectedStar !== null && i <= selectedStar,
                  'text-white/60': selectedStar !== null && i > selectedStar,
                })}
              />
            )}
          </motion.button>
        ))}
        {leastLabel ? (
          <p className="absolute text-xs -translate-x-3 -translate-y-1/2 whitespace-nowrap right-full top-1/2 text-neutral-400">
            {leastLabel}
          </p>
        ) : null}
        {mostLabel ? (
          <p className="absolute text-xs translate-x-3 -translate-y-1/2 whitespace-nowrap left-full top-1/2 text-neutral-400">
            {mostLabel}
          </p>
        ) : null}
      </div>
    )
  }
)

StarRating.displayName = 'StarRating'

export default StarRating
