import { getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Link } from 'react-router-dom'

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
            <h2>
              <Link to={getViewIdeaRoute({ ideaNick: idea.nick })}>{idea.name}</Link>
            </h2>
            <p>{idea.description}</p>
          </div>
        ))}
    </div>
  )
}
