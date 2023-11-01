import { InferGetStaticPropsType } from 'next'
import { ArticlesCarousel, ArticlesList } from '@components/article'
import { fetchAPI, getNavigation } from '@lib/api'
import { Layout } from '@components/common/Layout'
import { useMediaQuery } from '@lib/hooks/use-media-queries'
import ArticlesHero from '@components/article/ArticlesHero/ArticlesHero'

export async function getStaticProps() {
  const articles: TArticle[] = await fetchAPI('/articles')
  const navigation: TNavigation = await getNavigation()

  return { props: { articles, navigation } }
}

const resolvePopularArticles = (articles: TArticle[]) => {
  return articles.filter((article) => article.popular).slice(0, 4)
}
const resolveFeaturedArticles = (articles: TArticle[]) => {
  return articles.filter((article) => article.featured).slice(0, 4)
}

function Home({
  articles,
  navigation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isTablet = useMediaQuery(1023)

  const featuredArticles = resolveFeaturedArticles(articles)
  const popularArticles = resolvePopularArticles(articles)
  const mainArticle = articles.find((article) => article.main) || articles?.[0]

  return (
    <div>
      <Layout navigation={navigation}>
        {isTablet ? (
          //Tablet and smaller devices
          <ArticlesCarousel title="Топ вести" articles={articles.slice(0, 4)} />
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

export default Home
