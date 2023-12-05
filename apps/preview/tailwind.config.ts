// tailwind config is required for editor support

import type { Config } from "tailwindcss"
import sharedConfig from "tailwind-config/tailwind.config"

const config: Pick<Config, "presets"> = {
  presets: [sharedConfig as Partial<Config>],
}

export default config
