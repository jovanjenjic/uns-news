import { Date } from '@components/ui/Date'
import { getMediaURL } from '@lib/api'
import Link from 'next/link'
import s from './ArticleCard.module.css'
import cn from 'classnames'
import Image from 'next/image'
import ActionButtons from '../Article/ActionButtons'

const ArticleCardList = ({ article }: { article: TArticle }) => {
  return (
    <article className={s.lists}>
      <Link href={`/lists/${article.slug}`}>
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
              <a className="uppercase text-sm font-italic text-accent hover:underline">
                {category.title}
              </a>
            </Link>
            <span className="mx-3 text-accent">|</span>
          </>
        ))}

        {article.faculties.map((fax, index) => (
          <>
            <Link href={`/${fax.slug}`}>
              <a className="uppercase text-sm font-bold text-accent hover:underline">
                {fax?.shortTitle || fax.title}
              </a>
            </Link>
            {index !== article.faculties.length - 1 && (
              <span className="mx-3 text-accent">|</span>
            )}
          </>
        ))}

        <Link href={`/lists/${article.slug}`}>
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
        {article.author && (
          <div className="serif text-s">
            Аутор{' '}
            <Link href={`/contributors/${article.author.slug}`}>
              <a className="hover:underline">{article.author.name}</a>
            </Link>
          </div>
        )}
        <Date date={article?.createdDate as string} />
      </section>

      <ActionButtons article={article} />
    </article>
  )
}

export default ArticleCardList
