import { useParams } from 'react-router-dom'
import { ViewIdeaRouteParams } from '../../lib/routes'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams

  return <div>{ideaNick}</div>
}
