import { useParams } from 'react-router-dom'
import { ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './styles.module.scss'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams

  const { data, isLoading, isError, error, isFetching } = trpc.getIdea.useQuery({
    ideaNick,
  })

  if (isLoading || isFetching) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (!data.idea) {
    return <p>Idea not found</p>
  }

  return (
    <div>
      <h1 className={css.title}>{data.idea.name}</h1>
      <p className={css.description}>{data.idea.nick}</p>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </div>
  )
}
