import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'

const expressApp = express()

expressApp.use(cors())

expressApp.get('/', (req, res) => {
  res.send('Hello, World!')
})

expressApp.get('/ideas', (req, res) => {
  res.send('...any ideas here?')
})

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
)

expressApp.listen(3000, () => {
  console.info('Server started on port http://localhost:3000')
})
