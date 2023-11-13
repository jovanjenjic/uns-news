import { ArticleCard } from '..'
import { useRef } from 'react'

import ScrollIndicator from './ScrollIndicator'

type Props = {
  articles: TArticle[]
}

const ArticlesCarousel = ({ articles }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  return (
    <section className="mb-6">
      <div
        ref={carouselRef}
        className="flex overflow-hidden overflow-x-scroll scroll-snap-x-mandatory scrollbar-none mt-4"
      >
        {articles.map((article) => (
          <ArticleCard
            article={article}
            key={article.slug}
            variant="carousel"
          />
        ))}
      </div>

      <ScrollIndicator carouselRef={carouselRef} count={articles.length} />
    </section>
  )
}

export default ArticlesCarousel
