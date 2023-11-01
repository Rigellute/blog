import { formatDate } from '../../utils'
import { Card } from '../Card'

interface Article {
  title: string
  description: string
  date: Date
}

export interface ArticleWithSlug extends Article {
  slug: string
}

export function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date.toISOString()} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}
