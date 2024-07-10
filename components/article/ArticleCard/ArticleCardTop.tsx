import { Date } from '@components/ui/Date'
import Link from 'next/link'
import s from './ArticleCard.module.css'
import cn from 'classnames'
import Image from 'next/future/image'
import { getMediaURL } from '@lib/api'

type Props = {
  article: TArticle
  index: number
}

const ArticleCardTop = ({ article, index }: Props) => {
  return (
    <article className={s.top}>
      <div className={s.topNumber}>{index + 1}</div>
      <div className="lg:flex mr-4 w-32">
        <Link href={`/articles/${article.slug}`}>
          <a
            aria-label={`Link to ${article.title}`}
            className={`flex ${s.cover}`}
          >
            {(article?.cover?.formats?.medium?.url || article?.cover?.url) && (
              <Image
                src={getMediaURL(
                  article?.cover?.formats?.medium?.url || article?.cover?.url
                )}
                alt={article.cover.alternativeText || ''}
                className="object-cover"
                style={{aspectRatio: '1'}}
                width={720}
                height={720}
              />
            )}
          </a>
        </Link>
      </div>
      <section>
        <div className="flex w-full text-xs leading-3">
          <Link href={`/contributors/${article.author.slug}`}>
            <a className="pl-0.5 font-semibold hover:underline">
              {article.author.name}
            </a>
          </Link>
          <span className="mx-1 font-normal">|</span>
          <Date date={article.published_at as string} className="leading-3" />
        </div>
        <Link href={`/articles/${article.slug}`}>
          <a>
            <h3
              className={cn(
                s.title,
                'serif leading-tight overflow-hidden max-h-28 mt-1 mb-2 hover:underline text-xl'
              )}
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {article.title}
            </h3>
          </a>
        </Link>

        <div className="text-xs flex flex-wrap">
          {article.categories.map((category) => (
            <div key={category?.slug}>
              <Link href={`/${category.slug}`}>
                <a className="text-accent hover:underline">{category.title}</a>
              </Link>
              <span className="mx-2 text-accent">|</span>
            </div>
          ))}
          {article.faculties.map((fax) => (
            <div key={fax?.slug}>
              <Link href={`/faculties/${fax.slug}`}>
                <a className="text-accent hover:underline">
                  {fax?.shortTitle || fax.title}
                </a>
              </Link>
              <span className="mx-2 text-accent">|</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

export default ArticleCardTop
