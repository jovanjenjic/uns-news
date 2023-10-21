import { Date } from '@components/ui/Date'
import { getMediaURL } from '@lib/api'
import Link from 'next/link'
import s from '../ArticleCard/ArticleCard.module.css'
import cn from 'classnames'
import Image from 'next/image'
import ArticleCardTop from '../ArticleCard/ArticleCardTop'
import ActionButtons from '../Article/ActionButtons'

const ArticlesHero = ({ articles }: { articles: TArticle[] }) => {
  return (
    <section className="mb-4 flex justify-between items-center">
      <div style={{ width: '45%' }}>
        <article className={s.hero}>
          <Link href={`/articles/${articles?.[0]?.slug}`}>
            <a aria-label={`Link to ${articles?.[0]?.title}`}>
              <div className={s.cover}>
                {(articles?.[0]?.cover?.formats?.medium?.url ||
                  articles?.[0]?.cover?.url ||
                  articles?.[0]?.cover.url) && (
                  <Image
                    src={getMediaURL(
                      articles?.[0]?.cover?.formats?.medium?.url ||
                        articles?.[0]?.cover?.url
                    )}
                    alt={articles?.[0]?.cover?.alternativeText || ''}
                    layout="fill"
                    className="object-cover"
                  />
                )}
              </div>
            </a>
          </Link>

          <section className="pt-8">
            {articles?.[0]?.categories.map((category) => (
              <>
                <Link href={`/${category.slug}`}>
                  <a className="uppercase text-sm font-bold px-2 py-1 bg-accent text-secondary border border-secondary rounded-sm hover:underline">
                    {category.title}
                  </a>
                </Link>
                <span className="mx-3 text-accent">|</span>
              </>
            ))}
            {articles?.[0]?.faculties.map((fax, index) => (
              <>
                <Link href={`/faculties/${fax.slug}`}>
                  <a className="uppercase text-sm font-bold px-2 py-1 bg-accent text-secondary border border-secondary rounded-sm hover:underline">
                    {fax?.shortTitle || fax.title}
                  </a>
                </Link>
                {index !== articles?.[0]?.faculties?.length - 1 && (
                  <span className="mx-3 text-accent">|</span>
                )}
              </>
            ))}
            <Link href={`/articles/${articles?.[0]?.slug}`}>
              <a>
                <h3
                  className={cn(
                    s.title,
                    'serif leading-tight overflow-hidden max-h-28 mt-4 mb-2 hover:underline'
                  )}
                >
                  {articles?.[0]?.title}
                </h3>
              </a>
            </Link>
            <div className="flex text-sm">
              Аутор
              <Link href={`/contributors/${articles?.[0]?.author.slug}`}>
                <a className="pl-1 pr-2 font-bold hover:underline">
                  {articles?.[0]?.author?.name}
                </a>
              </Link>
              {' | '}
              <Date
                className="px-2"
                date={articles?.[0]?.published_at as string}
              />
            </div>
          </section>
          <ActionButtons article={articles?.[0]} />
        </article>
      </div>

      <div style={{ width: '45%' }}>
        {articles.slice(0, 4).map((article, index) => (
          <ArticleCardTop
            article={article}
            index={index}
            key={article.slug}
          />
        ))}
      </div>
    </section>
  )
}

export default ArticlesHero
