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

      <section className="pt-4">
        {article.categories.map((category) => (
          <>
            <Link href={`/${category.slug}`}>
              <a className="uppercase text-sm font-bold text-accent hover:underline">
                {category.title}
              </a>
            </Link>
            <span className="mx-3 text-accent">|</span>
          </>
        ))}
        {article.faculties.map((fax, index) => (
          <>
            <Link href={`/faculties/${fax.slug}`}>
              <a className="uppercase text-sm font-bold text-accent hover:underline">
                {fax.title}
              </a>
            </Link>
            {index !== article.faculties.length - 1 && (
              <span className="mx-3 text-accent">|</span>
            )}
          </>
        ))}

        <Link href={`/articles/${article.slug}`}>
          <a>
            <h3
              className={cn(
                s.title,
                'serif leading-tight overflow-hidden max-h-28 hover:underline'
              )}
            >
              {article.title}
            </h3>
          </a>
        </Link>
        <div className="text-sm mt-2">
          Аутор{' '}
          <Link href={`/contributors/${article.author.slug}`}>
            <a className="font-bold hover:underline">{article.author.name}</a>
          </Link>
        </div>
        <Date date={article.published_at as string} />
      </section>
    </article>
  )
}

export default ArticleCard
