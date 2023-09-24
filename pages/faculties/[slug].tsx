import { ArticlesList } from '@components/article'
import { fetchAPI, getMediaURL } from '@lib/api'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import ExternalLink from '@components/ui/Link/ExternalLink'
import Image from 'next/image'
import { Layout } from '@components/common/Layout'
import Custom404 from 'pages/404'
import Twitter from '@components/icons/Twitter'
import { Markdown } from '@components/common/Markdown'

export async function getStaticPaths() {
  const slugs: TFaculty[] = await fetchAPI('/faculties')

  return {
    paths: slugs.map((fax) => `/faculties/${fax.slug}`),
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const faculty: TFaculty = (
    await fetchAPI(`/faculties?slug=${params?.slug}`)
  )[0]

  const articles: TArticle[] = await fetchAPI(
    `/articles?faculty.slug=${params?.slug}`
  )

  // No props will trigger a 404
  if (!faculty) return { props: {} }
  return { props: { faculty, articles } }
}

function FacultyPage({
  faculty,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback } = useRouter()

  if (!isFallback && !faculty) {
    return <Custom404 />
  }

  return (
    <div style={{ background: faculty.bgColor }}>
      <Layout>
        <section className="text-center py-4">
          <figure className="relative w-full h-96 mx-auto mb-6">
            <Image
              src={getMediaURL(faculty.cover.url)}
              className="object-cover"
              alt={`${faculty?.title} profile`}
              layout="fill"
            />
          </figure>
          <h1 className="serif mt-0 text-2xl">{faculty?.title}</h1>
          <p className="text-sm font-serif uppercase mb-2">
            {faculty?.address}
          </p>
          <ExternalLink
            to={`${faculty.url}`}
            ariaLabel="Faculty's url"
            className="flex w-max mx-auto items-center opacity-60 hover:opacity-100 my-4"
          >
            <span className="mr-2">
              <Twitter width="18" height="18" />
            </span>
            {faculty?.url}
          </ExternalLink>
        </section>
        <Markdown content={faculty.description} />
        <ArticlesList
          articles={articles || []}
          title="Sve vesti ovog fakulteta"
        />
      </Layout>
    </div>
  )
}

export default FacultyPage
