import cn from 'classnames'
import { useEffect, useContext, createContext } from 'react'
import { osName, BrowserView } from 'react-device-detect'

const shortcutContext = createContext({
  shortcut: '',
})

export const useShortcut = () => useContext(shortcutContext)

export const ShortcutDisplay = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  const { shortcut } = useShortcut()

  if (!shortcut)
    throw new Error('ShortcutDisplay must be used inside ShortcutProvider')

  return (
    <BrowserView>
      <span
        className={cn('text-xs tracking-widest text-text/60', className)}
        {...props}>
        {shortcut}
      </span>
    </BrowserView>
  )
}
ShortcutDisplay.displayname = 'ShortcutDisplay'

interface ShortcutProviderProps {
  children?: React.ReactNode
  windowsShortcut: string
  macShortcut: string
  isEnabled?: boolean
  onClick: () => void
}

export const ShortcutProvider = ({
  children,
  windowsShortcut,
  macShortcut,
  isEnabled = true,
  onClick,
}: ShortcutProviderProps) => {
  useEffect(() => {
    if (!isEnabled) return

    const pressedKeys = new Set<string>()

    const eventHandler = (event: KeyboardEvent) => {
      pressedKeys.add(event.key.toLowerCase())

      const isMac = osName === 'Mac OS'

      const shortcutKeys = isMac ? macShortcut : windowsShortcut
      const shortcutKeysArray = shortcutKeys.split('+').map((key) => key.trim())

      const isShortcutPressed = shortcutKeysArray.every((key) =>
        pressedKeys.has(key.toLowerCase())
      )

      if (isShortcutPressed) {
        onClick()
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      pressedKeys.delete(key)
    }

    window.addEventListener('keydown', eventHandler)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', eventHandler)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isEnabled, macShortcut, onClick, windowsShortcut])

  const getShortcut = () => {
    if (osName === 'Mac OS') return macShortcut
    if (osName === 'Windows') return windowsShortcut
    return ''
  }

  return (
    <shortcutContext.Provider value={{ shortcut: getShortcut() }}>
      <button onClick={onClick} type="button">
        {children}
      </button>
    </shortcutContext.Provider>
  )
}
