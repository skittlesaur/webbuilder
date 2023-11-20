import { motion, useMotionValue, useTransform } from 'framer-motion'
import cn from 'classnames'

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
}

const boxVariants = {
  hover: { scale: 1.05, strokeWidth: 60 },
  pressed: { scale: 0.95, strokeWidth: 35 },
  checked: { stroke: '#8844D6' },
  unchecked: { stroke: '#A3A3A3', strokeWidth: 50 },
}

const CheckboxAnimated = ({
  checked,
  className,
}: {
  checked: boolean
  className: string
}) => {
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])

  return (
    <motion.svg
      initial={false}
      animate={checked ? 'checked' : 'unchecked'}
      viewBox="0 0 440 440"
      className={cn('focus:outline-none', className)}>
      <motion.path
        d="M 72 136 C 72 100.654 100.654 72 136 72 L 304 72 C 339.346 72 368 100.654 368 136 L 368 304 C 368 339.346 339.346 368 304 368 L 136 368 C 100.654 368 72 339.346 72 304 Z"
        fill="transparent"
        strokeWidth="50"
        variants={boxVariants}
      />
      <motion.path
        d="M 0 128.666 L 128.658 257.373 L 341.808 0"
        transform="translate(54.917 88.332) rotate(-4 170.904 128.687)"
        fill="transparent"
        strokeWidth="65"
        stroke="#212936"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={tickVariants}
        style={{ pathLength, opacity }}
      />
      <motion.path
        d="M 0 128.666 L 128.658 257.373 L 341.808 0"
        transform="translate(54.917 68.947) rotate(-4 170.904 128.687)"
        fill="transparent"
        strokeWidth="65"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={tickVariants}
        style={{ pathLength, opacity }}
      />
    </motion.svg>
  )
}

export { CheckboxAnimated }
