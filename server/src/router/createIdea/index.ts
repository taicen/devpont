// import * as R from 'ramda'
// import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaInput).mutation(async ({ ctx, input }) => {
  // if (ideas.find((idea) => idea.nick === input.nick)) {
  //   throw new Error(`Idea ${input.nick} already exists`)
  // }
  // ideas.unshift(input)
  const exIdea = await ctx.prisma.idea.findUnique({
    where: { nick: input.nick },
  })

  if (exIdea) {
    throw new Error(`Idea ${input.nick} already exists`)
  }

  await ctx.prisma.idea.create({
    data: input,
  })
  // ideas
  //   .map((idea) => R.pick(['nick', 'name', 'text'], idea))
  //   .find((idea) => idea.nick === input.ideaNick)
  // if (!idea) {
  //   throw new Error(`Idea ${input.ideaNick} not found`)
  // }
  return true
})
