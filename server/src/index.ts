import express from 'express'
import cors from 'cors'

import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

const expressApp = express()

expressApp.use(cors())
applyTrpcToExpressApp(expressApp, trpcRouter)

expressApp.get('/', (req, res) => {
  res.send('Hello, World!')
})

expressApp.get('/ideas', (req, res) => {
  res.send('...any ideas here?')
})

expressApp.listen(3000, () => {
  console.info('Server started on port http://localhost:3000')
})
