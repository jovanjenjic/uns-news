import { fetchAPI, getMediaURL, getNavigation } from '@lib/api'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Article } from '@components/article'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import ExitPreviewButton from '@components/common/ExitPreviewButton'
import { Layout } from '@components/common/Layout'
import { SITE_LOGO, SITE_NAME, SITE_URL } from '@lib/constants'

export async function getStaticPaths() {
  const articles: TArticle[] = await fetchAPI('/articles')

  return {
    paths: articles?.map((article) => `/articles/${article.slug}`),
    fallback: true, // Needs to be `true` to enable preview mode
  }

  // If you have too many articles you can pass no paths at all an generate all the pages at request time.
  // Read more on https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation

  // return {
  //   paths: [],
  //   fallback: 'blocking', `blocking` insted of `true` for better SEO https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
  // }
}

export async function getStaticProps({
  params,
  preview = false,
}: GetStaticPropsContext<{ slug: string }>) {
  const navigation: TNavigation = await getNavigation()

  // if is preview it will search on to the unpublished entries as well
  const article: TArticle = (
    await fetchAPI(
      `/articles?slug=${params?.slug}${
        preview ? '&_publicationState=preview' : ''
      }`
    )
  )[0]

  // No props will trigger a 404
  if (!article) return { props: { navigation } }
  return { props: { preview, article, navigation } }
}

function ArticlePage({
  article,
  preview,
  navigation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const fullURL = `${SITE_URL}/articles/${article?.slug}`

  return (
    <div>
      <Layout isMarkdown navigation={navigation}>
        <NextSeo
          title={article?.title}
          description={article?.description}
          canonical={fullURL}
          openGraph={{
            title: article?.title,
            description: article?.description,
            url: fullURL,
            type: 'article',
            article: {
              publishedTime: article?.createdDate as string,
              modifiedTime: article?.createdDate as string,
              section: `${article?.categories.map((cat) => cat.title)}`,
              authors: [
                `'https://www.studentski-fokus.rs/contributors/'${
                  article?.author?.slug || ''
                }`,
              ],
              tags: [`${article?.categories.map((cat) => cat.title)}`],
            },
            // Only include OG image if exists
            // This will break disabling Strapi Image Optimization
            ...(article?.cover && {
              images: Object.values(article?.cover?.formats || []).map(
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
          title={article?.title as string}
          datePublished={article?.createdDate as string}
          dateModified={article?.createdDate as string}
          authorName={[article?.author?.name || ('' as string)]}
          publisherName={SITE_NAME}
          publisherLogo={SITE_LOGO}
          description={article?.description as string}
          // Only include images if exists
          // This will break disabling Strapi Image Optimization
          images={
            article?.cover
              ? Object.values(article?.cover?.formats || []).map((image) => {
                  return getMediaURL(image?.url)
                })
              : []
          }
        />

        {/* <Button ariaLabel="Go back" onClick={handleGoBack} className="-ml-2">
          <ArrowLeft />
        </Button> */}
        <Article article={article} />
        {preview && <ExitPreviewButton />}
      </Layout>
    </div>
  )
}

export default ArticlePage
