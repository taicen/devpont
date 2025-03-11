import express from 'express'
import cors from 'cors'
import { type AppContext, createAppContext } from './lib/ctx'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors())
    expressApp.get('/', (req, res) => {
      res.send('Hello, World!')
    })

    expressApp.get('/ideas', (req, res) => {
      res.send('...any ideas here?')
    })

    // NOTE: этот вызов функции равен маршруту expressApp.get('/trpc') со всеми промежуточными маршрутами из trpc роутера с работающим контекстом данных из нашей БД через prisma адаптер
    applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(3000, () => {
      console.info('Listening at http://localhost:3000')
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()

// const expressApp = express()

// expressApp.use(cors())
// applyTrpcToExpressApp(expressApp, trpcRouter)

// expressApp.get('/', (req, res) => {
//   res.send('Hello, World!')
// })

// expressApp.get('/ideas', (req, res) => {
//   res.send('...any ideas here?')
// })

// expressApp.listen(3000, () => {
//   console.info('Server started on port http://localhost:3000')
// })
