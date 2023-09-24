import { ArticlesList } from '@components/article'
import { fetchAPI, getMediaURL } from '@lib/api'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import ExternalLink from '@components/ui/Link/ExternalLink'
import Image from 'next/image'
import { Layout } from '@components/common/Layout'
import Custom404 from 'pages/404'
import Twitter from '@components/icons/Twitter'
import { BreadcrumbJsonLd, SocialProfileJsonLd } from 'next-seo'
import { SITE_URL } from '@lib/constants'
import Linkedin from '@components/icons/Linkedin'
import Facebook from '@components/icons/Facebook'
import Instagram from '@components/icons/Instagram'

export async function getStaticPaths() {
  const slugs: TContributor[] = await fetchAPI('/contributors')

  return {
    paths: slugs.map((contributor) => `/contributors/${contributor.slug}`),
    fallback: false,
  }

  // If you have too many contributors you can pass no paths at all an generate all the pages at request time.
  // Read more on https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation

  // return {
  //   paths: [],
  //   fallback: 'blocking',
  // }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const contributor: TContributor = (
    await fetchAPI(`/contributors?slug=${params?.slug}`)
  )[0]

  const articles: TArticle[] = await fetchAPI(
    `/articles?author.slug=${params?.slug}`
  )

  // No props will trigger a 404
  if (!contributor) return { props: {} }
  return { props: { contributor, articles } }
}

function ContributorPage({
  contributor,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback } = useRouter()

  if (!isFallback && !contributor) {
    return <Custom404 />
  }

  // if featuared is diferent than undefined it will be true
  const isFeatured = !!contributor?.featured

  const thumbnailUrl = getMediaURL(
    contributor?.featured?.profile_image.formats.thumbnail?.url
  )

  const contributorSocialMedia = (urls: TContributor['urls']) => {
    if (!urls) return []

    const { facebook, twitter, instagram, linkedin } = urls

    return [
      facebook && `${facebook}`,
      instagram && `${instagram}`,
      linkedin && `${linkedin}`,
      twitter && `${twitter}`,
    ].filter((elem) => elem !== null)
  }

  return (
    <Layout>
      <SocialProfileJsonLd
        type="Person"
        name={contributor?.name as string}
        url={`${SITE_URL}/contributors/${contributor?.slug}`}
        sameAs={contributorSocialMedia(contributor?.urls) as []}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Contributors',
            item: `${SITE_URL}/contributors`,
          },
          {
            position: 2,
            name: contributor?.name as string,
            item: `${SITE_URL}/contributors/${contributor?.name}`,
          },
        ]}
      />

      <section className="text-center py-4">
        {isFeatured && (
          <figure className="relative w-24 h-24 mx-auto my-6">
            <Image
              src={thumbnailUrl}
              className="rounded-full"
              alt={`${contributor?.name} profile`}
              layout="fill"
            />
          </figure>
        )}
        <h1 className="serif mt-0 text-2xl">{contributor?.name}</h1>
        <p className="text-sm font-serif uppercase  mb-2">
          {contributor?.role}
        </p>
        {contributor?.urls?.twitter && (
          <ExternalLink
            to={`${contributor.urls.twitter}`}
            ariaLabel="Contributor's twitter"
            className="flex w-max mx-auto items-center opacity-60 hover:opacity-100"
          >
            <span className="mr-2">
              <Twitter width="18" height="18" />
            </span>
            {contributor?.urls.twitter}
          </ExternalLink>
        )}
        {contributor?.urls?.linkedin && (
          <ExternalLink
            to={`${contributor.urls.linkedin}`}
            ariaLabel="Contributor's linkedin"
            className="flex w-max mx-auto items-center opacity-60 hover:opacity-100"
          >
            <span className="mr-2">
              <Linkedin width="18" height="18" />
            </span>
            {contributor?.urls.linkedin}
          </ExternalLink>
        )}
        {contributor?.urls?.facebook && (
          <ExternalLink
            to={`${contributor?.urls.facebook}`}
            ariaLabel="Contributor's facebook"
            className="flex w-max mx-auto items-center opacity-60 hover:opacity-100"
          >
            <span className="mr-2">
              <Facebook width="18" height="18" />
            </span>
            {contributor?.urls.facebook}
          </ExternalLink>
        )}
        {contributor?.urls?.instagram && (
          <ExternalLink
            to={`${contributor?.urls.instagram}`}
            ariaLabel="Contributor's instagram"
            className="flex w-max mx-auto items-center opacity-60 hover:opacity-100"
          >
            <span className="mr-2">
              <Instagram width="18" height="18" />
            </span>
            {contributor?.urls.instagram}
          </ExternalLink>
        )}
        {isFeatured && (
          <p className="text-center py-2 leading-tight mt-8 lg:w-4/6 lg:mx-auto">
            {contributor?.featured?.description}
          </p>
        )}
      </section>
      <ArticlesList articles={articles || []} title="Sve vesti ovog autora" />
    </Layout>
  )
}

export default ContributorPage
