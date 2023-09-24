import { ArticlesCarousel, ArticlesList } from '@components/article'
import { Hero } from '@components/common/Hero'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { fetchAPI, getMediaURL, getNavigation } from '@lib/api'
import { NextSeo } from 'next-seo'
import { Layout } from '@components/common/Layout'
import { useMediaQuery } from '@lib/hooks/use-media-queries'
import ArticlesHero from '@components/article/ArticlesHero/ArticlesHero'

export async function getStaticPaths() {
  const categories: TCategory[] = await fetchAPI('/categories')
  const faculties: TFaculty[] = await fetchAPI('/faculties')

  const paths = []

  categories.forEach((category) => {
    faculties.forEach((fac) => {
      paths.push(`/${fac.slug}/${category.slug}`)
    })
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string; subSlug: string }>) {
  const category: TCategory = (
    await fetchAPI(`/categories?slug=${params?.subSlug}`)
  )[0]
  const faculty: TFaculty = (
    await fetchAPI(`/faculties?slug=${params?.slug}`)
  )[0]

  const articles: TArticle[] = await fetchAPI(
    `/articles?category.slug=${params?.subSlug}&faculty.slug=${params?.slug}`
  )
  const navigation: TNavigation = await getNavigation()

  return {
    props: {
      category,
      faculty,
      navigation,
      articles,
    },
  }
}

function CategoryPage({
  category,
  articles,
  navigation,
  faculty,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isTablet = useMediaQuery(1023)

  if (articles.length === 0) {
    return (
      <div>
        <Layout navigation={navigation}>
          <Hero title={`${faculty.title} / ${category.title}`} />
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
        title={category.title}
        description={category.description}
        openGraph={{
          title: category.title,
          description: category.description,
          // Only include OG image if exists
          // This will break disabling Strapi Image Optimization
          ...(category.cover && {
            images: Object.values(category.cover.formats).map((image) => {
              return {
                url: getMediaURL(image?.url),
                width: image?.width,
                height: image?.height,
              }
            }),
          }),
        }}
      />

      <Layout navigation={navigation}>
        <Hero title={`${faculty.title} / ${category.title}`} />
        {isTablet ? (
          //Tablet and smaller devices
          <ArticlesCarousel title="Top stories" articles={articles} />
        ) : (
          <ArticlesHero articles={articles} />
        )}

        <ArticlesList articles={articles} title="Najnovije" />

        <div className="lg:py-24 lg:flex lg:gap-28 lg:mx-auto">
          <ArticlesList
            articles={articles}
            title="Istaknuto"
            variant="top"
            className="lg:w-1/2"
          />
          <ArticlesList
            articles={articles}
            title="Popularno"
            variant="top"
            className="lg:w-1/2"
          />
        </div>

        <ArticlesList articles={articles} title="Vise novosti" />
      </Layout>
    </div>
  )
}

export default CategoryPage
