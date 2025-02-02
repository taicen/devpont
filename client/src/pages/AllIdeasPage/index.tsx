import { trpc } from '../../lib/trpc'

export const AllIdeasPage = () => {
  const { data, isLoading, isError, error, isFetching } = trpc.getIdeas.useQuery()

  if (isLoading || isFetching) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <h1>Idea List</h1>
      {data &&
        data.ideas.map((idea) => (
          <div key={idea.nick}>
            <h2>{idea.name}</h2>
            <p>{idea.description}</p>
          </div>
        ))}
    </div>
  )
}
