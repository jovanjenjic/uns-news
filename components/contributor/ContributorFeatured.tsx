import Link from 'next/link'
import s from './Contributor.module.css'

const ContributorFeatured = ({
  contributor,
}: {
  contributor: TContributor
}) => {
  return (
    <li>
      <Link href={`/contributors/${contributor.slug}`}>
        <a className={s.featuredContributor}>
          <div className="ml-5">
            <h3 className="serif ">{contributor.name}</h3>
            <p className="text-xs uppercase text-primary-60">
              {contributor.role}
            </p>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default ContributorFeatured
