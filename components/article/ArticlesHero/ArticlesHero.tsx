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
    <div className="flex flex-col">
      <div className="mb-4 text-center pb-8 font-serif border-b border-primary-0 uppercase">
        <h1 className="text-base sm:text-xl md:text-2xl">
          Студентски информативни сервис Универзитета у Новом Саду
        </h1>
      </div>
      <section className="mb-4 flex justify-between items-start gap-x-12">
        <div className="flex flex-col flex-1 py-2">
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

            <section className="pt-8 flex flex-wrap gap-y-1 gap-x-2">
              {mainArticle?.categories.map((category) => (
                <div key={category?.slug} className="flex gap-x-2">
                  <Link href={`/${category.slug}`}>
                    <a className="uppercase text-sm font-bold px-2 py-1 leading-4 bg-accent text-secondary rounded-sm hover:underline">
                      {category.title}
                    </a>
                  </Link>
                  <span className="text-accent mt-1 leading-4">|</span>
                </div>
              ))}
              {mainArticle?.faculties.map((fax, index) => (
                <div key={fax?.slug} className="flex gap-x-2">
                  <Link href={`/faculties/${fax.slug}`}>
                    <a className="uppercase text-sm font-bold px-2 py-1 leading-4 bg-accent text-secondary rounded-sm hover:underline">
                      {fax?.shortTitle || fax.title}
                    </a>
                  </Link>
                  {index !== mainArticle?.faculties?.length - 1 && (
                    <span className="text-accent mt-1 leading-4">|</span>
                  )}
                </div>
              ))}
              <Link href={`/articles/${mainArticle?.slug}`}>
                <a className="min-w-full">
                  <h2
                    className={cn(
                      s.title,
                      'serif leading-tight overflow-hidden max-h-28 mt-4 mb-2 hover:underline'
                    )}
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {mainArticle?.title}
                  </h2>
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
                  date={mainArticle?.createdDate as string}
                  style={{ lineHeight: `unset` }}
                />
              </div>
            </section>
            <ActionButtons article={mainArticle} />
          </article>
        </div>

        <div className="flex flex-col flex-1">
          {articles.map((article, index) => (
            <ArticleCardTop
              article={article}
              index={index}
              key={article.slug}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ArticlesHero
