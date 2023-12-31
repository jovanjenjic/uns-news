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

const resolvePopularArticles = (articles: TArticle[]) => {
  return articles.filter((article) => article.popular).slice(0, 4)
}
const resolveFeaturedArticles = (articles: TArticle[]) => {
  return articles.filter((article) => article.featured).slice(0, 4)
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
          <Hero title={category.title || faculty.title} />
          <div className="text-center my-auto">
            <p>Не постоје вести.</p>
          </div>
        </Layout>
      </div>
    )
  }

  const featuredArticles = resolveFeaturedArticles(articles)
  const popularArticles = resolvePopularArticles(articles)
  const mainArticle = articles.find((article) => article.main) || articles?.[0]

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
        {isTablet ? (
          //Tablet and smaller devices
          <ArticlesCarousel articles={articles.slice(0, 4)} />
        ) : (
          <ArticlesHero
            articles={articles.slice(0, 4)}
            mainArticle={mainArticle}
          />
        )}

        <ArticlesList articles={articles.slice(4, 10)} title="НАЈНОВИЈЕ" />

        <div className="lg:py-24 lg:flex lg:w-full lg:gap-28 lg:mx-auto">
          <ArticlesList
            articles={featuredArticles}
            title="ИСТАКНУТО"
            variant="top"
            className="lg:w-1/2"
          />
          <ArticlesList
            articles={popularArticles}
            title="Популарно"
            variant="top"
            className="lg:w-1/2"
          />
        </div>

        <ArticlesList
          articles={articles
            .slice(10)
            .filter(
              (article) =>
                !featuredArticles.map((fa) => fa.id).includes(article.id) &&
                !popularArticles.map((pa) => pa.id).includes(article.id) &&
                mainArticle?.id !== article.id
            )}
          title="ВИШЕ НОВОСТИ"
        />
      </Layout>
    </div>
  )
}

export default CategoryPage
