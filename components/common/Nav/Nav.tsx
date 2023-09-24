import { useRouter } from 'next/router'
import cn from 'classnames'
import { useHideOnScroll } from '@lib/hooks/use-hide-on-scroll'

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
    return !!list.map((item) => item.slug).find((val) => val === slugOrSubSlug)
  }

  const navigateOnNewPage = (val: string): void => {
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

    router.push(`/${url}`)
  }

  return (
    <nav
      aria-label="Categories Nav"
      className={cn(
        'bg-secondary overflow-x-scroll sticky flex whitespace-nowrap px-4 z-10 scrollbar-none transform transition-transform duration-300',
        'md:justify-center',
        isFaculty ? 'top-14' : 'top-90px',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <button
        onClick={() => navigateOnNewPage('')}
        className={cn(
          'uppercase px-6 py-2 text-xs font-bold text-primary-90',
          (isFaculty
            ? !findElementInCurrentList(slug as string)
            : !findElementInCurrentList(slug as string) &&
              !findElementInCurrentList(subSlug as string)) &&
            'border-b-2 border-primary'
        )}
      >
        {allText}
      </button>
      {list.map((item) => (
        <button
          onClick={() => navigateOnNewPage(item.slug)}
          key={item.slug}
          className={cn(
            'uppercase py-2 px-4 text-xs font-bold text-primary-90',
            (slug === item.slug || subSlug === item.slug) &&
              'border-b-2 border-primary'
          )}
        >
          {item.title}
        </button>
      ))}
    </nav>
  )
}

export default Nav
