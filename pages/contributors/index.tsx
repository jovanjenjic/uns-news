import Contributor from '@components/contributor/Contributor'
import ContributorFeatured from '@components/contributor/ContributorFeatured'
import { Layout } from '@components/common/Layout'
import Hero from '@components/common/Hero/Hero'
import { fetchAPI, getNavigation } from '@lib/api'
import { partition } from '@lib/partition'
import { InferGetStaticPropsType } from 'next'

export async function getStaticProps() {
  const contributors: TContributor[] = await fetchAPI('/contributors')
  const navigation: TNavigation = await getNavigation()

  return { props: { contributors, navigation } }
}

export function ContributorsPage({
  contributors,
  navigation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Create 2 differents arrays based on the condition
  const [featured, others] = partition<TContributor>(
    contributors,
    (i) => !!i.featured
  )

  return (
    <Layout navigation={navigation}>
      <Hero title="Аутори" />
      <ul className="flex flex-col flex-wrap justify-between md:flex-row md:py-6">
        {featured.map((contributor) => (
          <ContributorFeatured
            contributor={contributor}
            key={contributor.slug}
          />
        ))}
      </ul>
      <ul>
        {others.map((contributor) => (
          <Contributor contributor={contributor} key={contributor.slug} />
        ))}
      </ul>
    </Layout>
  )
}

export default ContributorsPage
