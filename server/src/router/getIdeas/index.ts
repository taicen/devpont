import { trpc } from '../../lib/trpc'
// import { ideas } from '../../lib/ideas'

// export const getIdeasTrpcRoute = trpc.procedure.query(() => {
//   return { ideas }
// })

export const getIdeasTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { ideas }
})
