import { Layout } from '@components/common/Layout'
import { getNavigation } from '@lib/api'

export async function getStaticProps() {

  const navigation: TNavigation = await getNavigation()

  return {
    props: {
      navigation,
    },
  }
}

export default function Custom404({ navigation }: { navigation?: TNavigation}) {
  return (
    <Layout navigation={navigation}>
      <div className="text-center my-auto">
        <h4 className="my-1">404. Page not found</h4>
        <p>Sorry, we couldn&apos;t find this page.</p>
      </div>
    </Layout>
  )
}
