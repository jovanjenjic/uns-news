import { Date } from '@components/ui/Date'
import { getMediaURL } from '@lib/api'
import Link from 'next/link'
import s from '../ArticleCard/ArticleCard.module.css'
import cn from 'classnames'
import Image from 'next/image'
import ArticleCardTop from '../ArticleCard/ArticleCardTop'
import ActionButtons from '../Article/ActionButtons'

const ArticlesHero = ({
  articles,
  mainArticle,
}: {
  articles: TArticle[]
  mainArticle?: TArticle
}) => {
  return (
    <section className="mb-4 flex justify-between items-center">
      <div style={{ width: '45%' }}>
        <article className={s.hero}>
          <Link href={`/articles/${articles?.[0]?.slug}`}>
            <a aria-label={`Link to ${articles?.[0]?.title}`}>
              <div className={s.cover}>
                {(mainArticle?.cover?.formats?.medium?.url ||
                  mainArticle?.cover?.url ||
                  mainArticle?.cover.url) && (
                  <Image
                    src={getMediaURL(
                      mainArticle?.cover?.formats?.medium?.url ||
                        mainArticle?.cover?.url
                    )}
                    alt={mainArticle?.cover?.alternativeText || ''}
                    layout="fill"
                    className="object-cover"
                  />
                )}
              </div>
            </a>
          </Link>

          <section className="pt-8">
            {mainArticle?.categories.map((category) => (
              <div key={category?.slug}>
                <Link href={`/${category.slug}`}>
                  <a className="uppercase text-sm font-bold px-2 py-1 bg-accent text-secondary border border-secondary rounded-sm hover:underline">
                    {category.title}
                  </a>
                </Link>
                <span className="mx-3 text-accent">|</span>
              </div>
            ))}
            {mainArticle?.faculties.map((fax, index) => (
              <div key={fax?.slug}>
                <Link href={`/faculties/${fax.slug}`}>
                  <a className="uppercase text-sm font-bold px-2 py-1 bg-accent text-secondary border border-secondary rounded-sm hover:underline">
                    {fax?.shortTitle || fax.title}
                  </a>
                </Link>
                {index !== mainArticle?.faculties?.length - 1 && (
                  <span className="mx-3 text-accent">|</span>
                )}
              </div>
            ))}
            <Link href={`/articles/${mainArticle?.slug}`}>
              <a>
                <h3
                  className={cn(
                    s.title,
                    'serif leading-tight overflow-hidden max-h-28 mt-4 mb-2 hover:underline'
                  )}
                >
                  {mainArticle?.title}
                </h3>
              </a>
            </Link>
            <div className="flex text-sm">
              Аутор
              <Link href={`/contributors/${mainArticle?.author.slug}`}>
                <a className="pl-1 pr-2 font-bold hover:underline">
                  {mainArticle?.author?.name}
                </a>
              </Link>
              {' | '}
              <Date
                className="px-2"
                date={mainArticle?.published_at as string}
              />
            </div>
          </section>
          <ActionButtons article={mainArticle} />
        </article>
      </div>

      <div style={{ width: '45%' }}>
        {articles.map((article, index) => (
          <ArticleCardTop article={article} index={index} key={article.slug} />
        ))}
      </div>
    </section>
  )
}

export default ArticlesHero
