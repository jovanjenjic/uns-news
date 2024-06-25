import { Date } from '@components/ui/Date'
import { getMediaURL } from '@lib/api'
import Link from 'next/link'
import s from './ArticleCard.module.css'
import cn from 'classnames'
import Image from 'next/image'

type Props = {
  article: TArticle
  variant?: 'default' | 'carousel'
}

const ArticleCard = ({ article, variant = 'default' }: Props) => {
  const rootClassName = cn({
    [s.default]: variant === 'default',
    [s.carousel]: variant === 'carousel',
  })

  return (
    <article className={rootClassName}>
      <Link href={`/articles/${article.slug}`}>
        <a aria-label={`Link to ${article.title}`} className={s.cover}>
          {(article?.cover?.formats?.medium?.url || article?.cover?.url) && (
            <Image
              src={getMediaURL(
                article?.cover?.formats?.medium?.url || article?.cover?.url
              )}
              alt={article.cover.alternativeText || ''}
              layout="fill"
              className="object-cover"
            />
          )}
        </a>
      </Link>

      <section className="pt-4 flex flex-wrap gap-y-1 gap-x-2">
        {article.categories.map((category) => (
          <div key={category?.slug} className="flex gap-x-2">
            <Link href={`/${category.slug}`}>
              <a className="uppercase text-xs md:text-sm font-bold text-accent hover:underline">
                {category.title}
              </a>
            </Link>
            <span className="text-accent mt-0.5 md:mt-1 leading-4">|</span>
          </div>
        ))}
        {article.faculties.map((fax, index) => (
          <div key={fax?.slug} className="flex gap-x-2">
            <Link href={`/faculties/${fax.slug}`}>
              <a className="uppercase text-xs md:text-sm font-bold text-accent hover:underline">
                {fax.title}
              </a>
            </Link>
            {index !== article.faculties.length - 1 && (
              <span className="text-accent sm:mt-0.5 md:mt-1 leading-4">|</span>
            )}
          </div>
        ))}

        <Link href={`/articles/${article.slug}`}>
          <a className="min-w-full">
            <h3
              className={cn(
                s.title,
                'serif leading-tight overflow-hidden max-h-28 hover:underline'
              )}
              style={{ display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis'}}
            >
              {article.title}
            </h3>
          </a>
        </Link>
        <div className="text-sm leading-3 mt-2">
          Аутор{' '}
          <Link href={`/contributors/${article.author.slug}`}>
            <a className="font-bold hover:underline">{article.author.name}</a>
          </Link>
        </div>
        <Date className="leading-3 mt-2" date={article.published_at as string} />
      </section>
    </article>
  )
}

export default ArticleCard
