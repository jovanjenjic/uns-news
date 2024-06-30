import Link from 'next/link'
import { Markdown } from '@components/common/Markdown'
import AuthorCard from './AuthorCard'
import { Date } from '@components/ui/Date'
import ActionButtons from './ActionButtons'
import { getMediaURL } from '@lib/api'
import Image from 'next/image'

function Article({ article }: { article: TArticle | undefined }) {
  if (!article) return <p>Something went wrong</p>

  return (
    <article>
      <header className="pb-10 pt-4">
        {article.categories.map((category) => (
          <>
            <Link href={`/${category.slug}`}>
              <a className="uppercase text-sm font-bold text-accent">
                {category.title}
              </a>
            </Link>
            <span className="mx-3 text-accent">|</span>
          </>
        ))}

        {article.faculties.map((fax, index) => (
          <>
            <Link href={`/faculties/${fax.slug}`}>
              <a className="uppercase text-sm font-bold text-accent">
                {fax?.shortTitle || fax.title}
              </a>
            </Link>
            {index !== article.faculties.length - 1 && (
              <span className="mx-3 text-accent">|</span>
            )}
          </>
        ))}

        <h1 className="serif pb-4 text-3xl md:text-4xl">{article.title}</h1>

        <p className="mb-2">
          Аутор{' '}
          <Link href={`/contributors/${article.author.slug}`}>
            <a className="font-bold">{article.author.name}</a>
          </Link>
        </p>

        <Date date={article.published_at as string} />

        <ActionButtons article={article} />

        <div className="flex my-8" style={{maxHeight: '25svh', minHeight: '180px'}}>
          {(article?.cover?.formats?.medium?.url || article?.cover?.url) && (
            <Image
              src={getMediaURL(
                article?.cover?.formats?.medium?.url || article?.cover?.url
              )}
              alt={article.cover.alternativeText || ''}
              width={1920}
              height={1080}
              objectFit='cover'
            />
          )}
        </div>
      </header>

      <Markdown content={article.content} />

      <footer className="border-t py-6 mt-24">
        <AuthorCard author={article.author} />
        <ActionButtons article={article} />
      </footer>
    </article>
  )
}

export default Article
