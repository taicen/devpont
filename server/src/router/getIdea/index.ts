import { z } from 'zod'
import * as R from 'ramda'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

export const getIdeaTrpcRoute = trpc.procedure
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
  })
