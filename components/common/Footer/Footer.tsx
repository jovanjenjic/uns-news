import Link from 'next/link'
import SocialUrls from './SocialUrls'
import ThemeSwitch from '../ThemeSwitch'
import s from './Footer.module.css'
import { SOCIAL_USERNAMES } from '@lib/constants'

const Footer = ({ categories, faculties }: TNavigation) => {
  const { instagram } = SOCIAL_USERNAMES

  return (
    <footer className="block bottom-0 left-0 right-0 bg-primary-05 px-6 py-6 md:px-32 lg:px-48 xl:px-1/5">
      <nav
        className="flex flex-col  mt-6 mb-6 flex-wrap md:flex-row md:justify-between"
        aria-label="Footer Nav"
      >
        <div>
          <h3 className={s.heading}>Kategorije</h3>
          <ul className={s.ul}>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/${category.slug}`}>
                  <a className={s.link}>{category.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={s.heading}>Fakulteti</h3>
          <ul className={s.ul}>
            {faculties.map((fax) => (
              <li key={fax.slug}>
                <Link href={`/faculties/${fax.slug}`}>
                  <a className={s.link}>{fax.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={s.heading}>O nama</h3>
          <ul className={s.ul}>
            <li>
              <Link href="/contributors">
                <a className={s.link}>Autori</a>
              </Link>
            </li>

            <li>
              <Link href={`https://instagram.com/${instagram}`}>
                <a className={s.link}>Kontakt</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <SocialUrls />

      <ThemeSwitch />
    </footer>
  )
}

export default Footer
