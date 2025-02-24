// import * as R from 'ramda'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaInput).mutation(({ input }) => {
  if (ideas.find((idea) => idea.nick === input.nick)) {
    throw new Error(`Idea ${input.nick} already exists`)
  }
  ideas.unshift(input)
  // ideas
  //   .map((idea) => R.pick(['nick', 'name', 'text'], idea))
  //   .find((idea) => idea.nick === input.ideaNick)
  // if (!idea) {
  //   throw new Error(`Idea ${input.ideaNick} not found`)
  // }
  return true
})
