import { getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Link } from 'react-router-dom'
import css from './styles.module.scss'

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
      <h1 className={css.title}>Idea List</h1>
      <div className={css.ideas}>
        {data.ideas.map((idea, idx) => (
          <div className={css.idea} key={idea.nick + `${idx}`}>
            <h2 className={css.ideaName}>
              <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                {idea.name}
              </Link>
            </h2>
            <p className={css.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
