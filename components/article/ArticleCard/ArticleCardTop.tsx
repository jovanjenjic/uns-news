import { Date } from '@components/ui/Date'
import Link from 'next/link'
import s from './ArticleCard.module.css'
import cn from 'classnames'
import Image from 'next/image'
import { getMediaURL } from '@lib/api'

type Props = {
  article: TArticle
  index: number
}

const ArticleCardTop = ({ article, index }: Props) => {
  return (
    <article className={s.top}>
      <div className={s.topNumber}>{index + 1}</div>
      <div className="lg:flex hidden mr-4">
        <Link href={`/articles/${article.slug}`}>
          <a aria-label={`Link to ${article.title}`} className={s.cover}>
            {(article?.cover?.formats?.medium?.url || article?.cover?.url) && (
              <Image
                src={getMediaURL(
                  article?.cover?.formats?.medium?.url || article?.cover?.url
                )}
                alt={article.cover.alternativeText || ''}
                className="object-cover"
                width={100}
                height={90}
              />
            )}
          </a>
        </Link>
      </div>
      <section>
        <Link href={`/articles/${article.slug}`}>
          <a>
            <h3
              className={cn(
                s.title,
                'serif leading-tight overflow-hidden max-h-28 mb-3 hover:underline text-xl'
              )}
            >
              {article.title}
            </h3>
          </a>
        </Link>

        <div className="text-sm flex flex-wrap">
          <p>
            Аутор
            <Link href={`/contributors/${article.author.slug}`}>
              <a className="pl-1 font-bold hover:underline">
                {article.author.name}
              </a>
            </Link>
          </p>
          <span className="mx-3 text-accent">|</span>
          {article.categories.map((category) => (
            <>
              <Link href={`/${category.slug}`}>
                <a className="text-accent hover:underline">{category.title}</a>
              </Link>
              <span className="mx-3 text-accent">|</span>
            </>
          ))}
          {article.faculties.map((fax) => (
            <>
              <Link href={`/faculties/${fax.slug}`}>
                <a className="text-accent hover:underline">{fax.title}</a>
              </Link>
              <span className="mx-3 text-accent">|</span>
            </>
          ))}
          <Date date={article.published_at as string} />
        </div>
      </section>
    </article>
  )
}

export default ArticleCardTop
