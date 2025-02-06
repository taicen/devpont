import { initTRPC } from '@trpc/server'

// --- fake data ---

import * as R from 'ramda'
import Chance from 'chance'

const chance = new Chance()

const ideas = R.times(
  (i) => ({
    nick: `cool-idea-nick-${chance.hash({ length: 3 })}`,
    name: `Idea-${i + 1}: ` + chance.string({ length: 10, symbols: false, alpha: true }),
    description: chance.paragraph({ sentences: 1 }),
  }),
  100
)

// --- end fake data ---

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter
