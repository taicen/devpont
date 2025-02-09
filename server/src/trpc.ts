import { initTRPC } from '@trpc/server'
import { z } from 'zod'

// --- fake data ---

import * as R from 'ramda'
import Chance from 'chance'

const chance = new Chance()

const ideas = R.times(
  (i) => ({
    nick: `cool-idea-nick-${chance.hash({ length: 3 })}`,
    name: `Idea-${i + 1}: ` + chance.string({ length: 10, symbols: false, alpha: true }),
    description: chance.paragraph({ sentences: 1 }),
    text: chance.paragraph({ sentences: 10 }),
  }),
  100
)

// --- end fake data ---

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas }
  }),
  getIdea: trpc.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas
        .map((idea) => R.pick(['nick', 'name', 'text'], idea))
        .find((idea) => idea.nick === input.ideaNick)
      // if (!idea) {
      //   throw new Error(`Idea ${input.ideaNick} not found`)
      // }
      return { idea: idea || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
