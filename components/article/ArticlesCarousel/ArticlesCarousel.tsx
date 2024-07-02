import { ArticleCard } from '..'
import { useRef } from 'react'

import ScrollIndicator from './ScrollIndicator'

type Props = {
  articles: TArticle[]
}

const ArticlesCarousel = ({ articles }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col">
      <div className="mb-4 text-center pb-8 font-serif border-b border-primary-0 uppercase">
        <h1 className="text-base sm:text-xl md:text-2xl">Студентски информативни сервис Универзитета у Новом Саду</h1>
      </div>
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
    </div>
  )
}

export default ArticlesCarousel
