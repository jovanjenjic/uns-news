import { useIsOffline } from '@lib/hooks/use-is-offline'
import { useToast } from '@lib/hooks/use-toast'
import { useEffect } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Nav } from '../Nav'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  navigation: TNavigation
  isMarkdown?: boolean
}

const Layout = ({ children, navigation, isMarkdown = false }: Props) => {
  const { isOffline } = useIsOffline()
  const { addToast } = useToast()

  useEffect(() => {
    if (isOffline) {
      addToast('No Internet Connection')
    }
  }, [addToast, isOffline])

  return (
    <>
      <Header />
      {navigation && (
        <Nav
          list={navigation.faculties}
          isFaculty={true}
          allText="SVI FAKULTET"
        />
      )}
      {navigation && (
        <Nav
          list={navigation.categories}
          isFaculty={false}
          allText="СВЕ КАТЕГОРИЈЕ"
        />
      )}
      <main
        className={cn(
          'min-h-screen px-4 pt-40 pb-20 flex flex-col mx-auto md:w-3/4',
          isMarkdown ? 'lg:w-7/12' : 'lg:w-2/3 xl:w-8/12'
        )}
      >
        {children}
      </main>

      <Footer navigation={navigation} />
    </>
  )
}

export default Layout
