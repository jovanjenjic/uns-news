import { ArticlesCarousel, ArticlesList } from '@components/article'
import { Hero } from '@components/common/Hero'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { fetchAPI, getMediaURL, getNavigation } from '@lib/api'
import { NextSeo } from 'next-seo'
import { Layout } from '@components/common/Layout'
import { useMediaQuery } from '@lib/hooks/use-media-queries'
import ArticlesHero from '@components/article/ArticlesHero/ArticlesHero'
import { startCase } from 'lodash'

export async function getStaticPaths() {
  const categories: TCategory[] = await fetchAPI('/categories')
  const faculties: TCategory[] = await fetchAPI('/faculties')

  return {
    paths: [...categories, ...faculties].map((val) => `/${val.slug}`),
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const category: TCategory =
    (await fetchAPI(`/categories?slug=${params?.slug}`))?.[0] || {}
  const faculty: TFaculty =
    (await fetchAPI(`/faculties?slug=${params?.slug}`))?.[0] || {}

  const articlesByCategory: TArticle[] = await fetchAPI(
    `/articles?categories.slug=${params?.slug}`
  )
  const articlesByFaculty: TArticle[] = await fetchAPI(
    `/articles?faculties.slug=${params?.slug}`
  )
  const navigation: TNavigation = await getNavigation()

  return {
    props: {
      category,
      faculty,
      navigation,
      articles: [...articlesByCategory, ...articlesByFaculty],
    },
  }
}

function CategoryPage({
  category,
  faculty,
  articles,
  navigation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isTablet = useMediaQuery(1023)

  if (articles.length === 0) {
    return (
      <div>
        <Layout navigation={navigation}>
          <Hero title={startCase(category.title) || startCase(faculty.title)} />
          <div className="text-center my-auto">
            <p>Ne postoje vesti.</p>
          </div>
        </Layout>
      </div>
    )
  }

  return (
    <div>
      <NextSeo
        title={category.title || faculty.title}
        description={category.description}
        openGraph={{
          title: category.title || faculty.title,
          description: category.description || faculty.description,
          // Only include OG image if exists
          // This will break disabling Strapi Image Optimization
          ...(category.cover && {
            images: Object.values(category?.cover?.formats || []).map(
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
      />

      <Layout navigation={navigation}>
        <Hero title={startCase(category.title) || startCase(faculty.title)} />
        {isTablet ? (
          //Tablet and smaller devices
          <ArticlesCarousel title="Top" articles={articles.slice(0, 4)} />
        ) : (
          <ArticlesHero articles={articles?.slice(0, 4)} />
        )}

        <ArticlesList articles={articles.slice(4, 10)} title="Najnovije" />

        <div className="lg:py-24 lg:flex lg:gap-28 lg:mx-auto">
          <ArticlesList
            articles={articles.slice(0, 5)}
            title="Istaknuto"
            variant="top"
            className="lg:w-1/2"
          />
          <ArticlesList
            articles={articles.slice(5, 10)}
            title="Popularno"
            variant="top"
            className="lg:w-1/2"
          />
        </div>

        <ArticlesList articles={articles.slice(10)} title="Više novosti" />
      </Layout>
    </div>
  )
}

export default CategoryPage
