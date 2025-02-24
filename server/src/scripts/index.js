// NOTE: CLI 'pnpm vscode-generate-index-standalone src/ scripts/' for generate index files

import { generateIndex } from 'vscode-generate-index-standalone'
import { join } from 'path'

// NOTE: command CLI for generates import router

const generateRouter = await generateIndex({
  filePath: join(__dirname, '../src/router/index.ts'),
  replaceFile: true,
})
