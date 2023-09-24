import Facebook from '@components/icons/Facebook'
import Instagram from '@components/icons/Instagram'
import Linkedin from '@components/icons/Linkedin'
import Twitter from '@components/icons/Twitter'
import ExternalLink from '@components/ui/Link/ExternalLink'

function AuthorSocialMedia({ urls }: { urls: TContributor['urls'] }) {
  if (!urls) return null
  const { linkedin, twitter, instagram, facebook } = urls

  // only return one social media

  return (
    <>
      {twitter && (
        <ExternalLink
          className="text-primary-60 flex items-center pt-1"
          to={`${twitter}`}
          ariaLabel="Author's twitter"
        >
          <Twitter width="20" height="20" />
          <span className="ml-1 text-sm">{twitter}</span>
        </ExternalLink>
      )}
      {linkedin && (
        <ExternalLink
          className="text-primary-60 flex items-center pt-1"
          to={`${linkedin}`}
          ariaLabel="Author's linkedin"
        >
          <Linkedin width="20" height="20" />
          <span className="ml-1 text-sm">{linkedin}</span>
        </ExternalLink>
      )}
      {instagram && (
        <ExternalLink
          className="text-primary-60 flex items-center pt-1"
          to={`${instagram}`}
          ariaLabel="Author's instagram"
        >
          <Instagram width="20" height="20" />
          <span className="ml-1 text-sm">{instagram}</span>
        </ExternalLink>
      )}
      {facebook && (
        <ExternalLink
          className="text-primary-60 flex items-center pt-1"
          to={`${facebook}`}
          ariaLabel="Author's facebook"
        >
          <Facebook width="20" height="20" />
          <span className="ml-1 text-sm">{facebook}</span>
        </ExternalLink>
      )}
    </>
  )

  return null
}

export default AuthorSocialMedia
