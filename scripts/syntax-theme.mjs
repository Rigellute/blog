import fs from 'node:fs'
import path, { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const sourceFile = resolve(__dirname, '../syntax-theme.json')

const theme = require(sourceFile)

const themeCopy = {
  ...theme,
  colors: {
    ...theme.colors,
    ['editor.background']: '#0E0E10',
  },
}

fs.writeFileSync(sourceFile, JSON.stringify(themeCopy, null, 2))
