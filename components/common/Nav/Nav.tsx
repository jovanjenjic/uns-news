import { useRouter } from 'next/router'
import cn from 'classnames'
import { useHideOnScroll } from '@lib/hooks/use-hide-on-scroll'
import Link from 'next/link'

const Nav = ({
  list,
  isFaculty,
  allText = 'SVI',
}: {
  list: TCategory[]
  isFaculty: boolean
  allText?: string
}) => {
  const router = useRouter()
  const { isHidden } = useHideOnScroll()
  const { slug, subSlug } = router.query

  const findElementInCurrentList = (slugOrSubSlug: string): boolean => {
    return (
      list.length &&
      !!list?.map((item) => item.slug).find((val) => val === slugOrSubSlug)
    )
  }

  const navigateOnNewPage = (val: string): string => {
    let url = ''

    if (isFaculty) {
      url = subSlug
        ? val
          ? `${val}/${subSlug}`
          : `${subSlug}`
        : !findElementInCurrentList(slug as string)
        ? `${val}/${slug || ''}`
        : val
    } else {
      url =
        !findElementInCurrentList(slug as string) && slug
          ? `${slug}/${val}`
          : val
    }

    return `/${url === '/' ? '' : url}`
  }

  return (
    <nav
      aria-label="Categories Nav"
      className={cn(
        'bg-blue-primary overflow-x-scroll fixed w-full flex whitespace-nowrap px-4 z-10 scrollbar-none transform transition-transform duration-300',
        isFaculty ? 'top-20' : 'top-112px',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <Link href={navigateOnNewPage('')}>
        <p
          className={cn(
            'cursor-pointer uppercase px-6 py-2 text-xs font-bold',
            (
              isFaculty
                ? !findElementInCurrentList(slug as string)
                : !findElementInCurrentList(slug as string) &&
                  !findElementInCurrentList(subSlug as string)
            )
              ? 'text-accent'
              : 'text-white-primary'
          )}
        >
          {allText}
        </p>
      </Link>
      {list.length &&
        list?.map((item) => (
          <Link href={navigateOnNewPage(item.slug)} key={item.slug}>
            <p
              className={cn(
                'cursor-pointer uppercase py-2 px-4 text-xs font-bold',
                slug === item.slug || subSlug === item?.slug
                  ? 'text-accent'
                  : 'text-white-primary'
              )}
            >
              {item.title}
            </p>
          </Link>
        ))}
    </nav>
  )
}

export default Nav
