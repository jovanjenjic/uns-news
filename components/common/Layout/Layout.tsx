import { useIsOffline } from '@lib/hooks/use-is-offline'
import { useToast } from '@lib/hooks/use-toast'
import { useEffect } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Nav } from '../Nav'
import cn from 'classnames'
import { useIsMobile } from '@lib/hooks/use-media-queries'

type Props = {
  children: React.ReactNode
  navigation: TNavigation
  isMarkdown?: boolean
}

const Layout = ({ children, navigation, isMarkdown = false }: Props) => {
  const { isOffline } = useIsOffline()
  const { addToast } = useToast()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isOffline) {
      addToast('No Internet Connection')
    }
  }, [addToast, isOffline])

  return (
    <>
      <Header menuList={navigation ? navigation.categories : []} />
      {navigation && !isMobile && (
        <Nav
          list={navigation.categories}
          isFaculty={false}
          allText="СВЕ КАТЕГОРИЈЕ"
        />
      )}
      <main
        className={cn(
          'min-h-screen px-3 pt-28 sm:pt-40 pb-20 flex flex-col mx-auto w-full  md:px-8 lg:px-12 xl:px-16 2xl:px-20',
          isMarkdown ? 'max-w-screen-lg' : 'max-w-screen-2xl'
        )}
      >
        {children}
      </main>

      <Footer navigation={navigation} />
    </>
  )
}

export default Layout
