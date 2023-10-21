import { ArticlesList } from '@components/article'
import { Layout } from '@components/common/Layout'
import Bookmark from '@components/icons/Bookmark'
import { getNavigation } from '@lib/api'
import { useList } from '@lib/hooks/use-list'

export async function getStaticProps() {

  const navigation: TNavigation = await getNavigation()

  return {
    props: {
      navigation,
    },
  }
}

const ListsPage = ({ navigation }: { navigation: TNavigation }) => {
  const { list } = useList()

  return (
    <Layout navigation={navigation}>
      {list && list?.length !== 0 ? (
        <ArticlesList
          articles={list}
          title={
            list?.length === 1
              ? `${list?.length} Сачувана вест`
              : `${list?.length} Сачеване вести`
          }
          variant="lists"
        />
      ) : (
        <div className="text-center my-auto">
          <p>Још увек нисте сачували ништа.</p>
          <p>
            Додирните{' '}
            <span>
              <Bookmark className="inline-block" />
            </span>{' '}
            икону да новост сачувате за касније.
          </p>
        </div>
      )}
    </Layout>
  )
}

export default ListsPage
