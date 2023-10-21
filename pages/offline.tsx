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

const offline = ({ navigation }: { navigation: TNavigation}) => {
  return (
    <Layout navigation={navigation}>
      <div className="text-center my-auto">
        <h4 className="my-1">You are offline</h4>
        <p>
          This page can&apos;t be displayed because you are not connected to the
          internet
        </p>
      </div>
    </Layout>
  )
}

export default offline
