import { ArticlesList } from '@components/article'
import { fetchAPI, getMediaURL, getNavigation } from '@lib/api'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import ExternalLink from '@components/ui/Link/ExternalLink'
import Image from 'next/future/image'
import { Layout } from '@components/common/Layout'
import Custom404 from 'pages/404'
import { Markdown } from '@components/common/Markdown'
import Web from '@components/icons/Web'
import { Button } from '@components/ui/Button'
import ArrowLeft from '@components/icons/ArrowLeft'
import { SITE_LOGO, SITE_NAME, SITE_URL } from '@lib/constants'

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
    `/articles?faculties.slug=${params?.slug}`
  )
  const navigation: TNavigation = await getNavigation()

  // No props will trigger a 404
  if (!faculty) return { props: { navigation } }
  return { props: { faculty, articles, navigation } }
}

function FacultyPage({
  faculty,
  articles,
  navigation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback, back } = useRouter()

  const fullURL = `${SITE_URL}/faculties/${faculty?.slug}`

  const handleGoBack = () => {
    back()
  }

  if (!isFallback && !faculty) {
    return <Custom404 />
  }

  return (
    <div>
      <Layout navigation={navigation}>
        <NextSeo
          title={faculty?.title}
          description={faculty?.description}
          canonical={fullURL}
          openGraph={{
            title: faculty?.title,
            description: faculty?.description,
            url: fullURL,
            type: 'article',
            article: {
              publishedTime: faculty?.published_at as string,
              modifiedTime: faculty?.updated_at as string,
              authors: [`Уредник`],
            },
            // Only include OG image if exists
            // This will break disabling Strapi Image Optimization
            ...(faculty?.cover && {
              images: Object.values(faculty?.cover?.formats || []).map(
                (image) => {
                  return {
                    url: getMediaURL(image?.url),
                    width: image?.width,
                    height: image?.height,
                  }
                }
              ),
            }),
          }}
          twitter={{
            site: '@studentskifokus',
            cardType: 'summary_large_image',
          }}
        />
        <ArticleJsonLd
          url={fullURL}
          title={faculty?.title as string}
          datePublished={faculty?.published_at as string}
          dateModified={faculty?.updated_at as string}
          authorName="Уредник"
          publisherName={SITE_NAME}
          publisherLogo={SITE_LOGO}
          description={faculty?.description as string}
          // Only include images if exists
          // This will break disabling Strapi Image Optimization
          images={
            faculty?.cover
              ? Object.values(faculty?.cover?.formats || []).map((image) => {
                  return getMediaURL(image?.url)
                })
              : []
          }
        />
        <Button ariaLabel="Go back" onClick={handleGoBack} className="-ml-2">
          <ArrowLeft />
        </Button>
        <section className="text-center py-4">
          <figure className="relative w-full mx-auto mb-6">
            <Image
              src={getMediaURL(faculty.cover.url)}
              className="object-cover"
              alt={`${faculty?.title} profile`}
              width={1920}
              height={1080}
              style={{ aspectRatio: '21/9' }}
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
              <Web width="18" height="18" />
            </span>
            <p className="w-min">{faculty?.url}</p>
          </ExternalLink>
        </section>
        <Markdown content={faculty.description} />
        <ArticlesList
          articles={articles || []}
          title="СВЕ ВЕСТИ ОВОГ ФАКУЛТЕТА"
        />
      </Layout>
    </div>
  )
}

export default FacultyPage
