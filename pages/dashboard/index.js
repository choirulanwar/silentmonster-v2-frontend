// import { adminSSP } from '@/utils/redirects'

import { useDomains } from '@/hooks/useDomain'
import { useProjectTemplates } from '@/hooks/useProjectTemplate'
import { useSites } from '@/hooks/useSite'
import { useUrls } from '@/hooks/useUrl'

import View from '@/views/Dashboard'

const Page = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }

  const pageInfo = {
    title: 'Dashboard',
    href: '/dashboard',
    activePage: props?.page || 1
  }

  const domainsQuery = useDomains(variables)
  const projectTemplatesQuery = useProjectTemplates(variables)
  const sitesQuery = useSites(variables)
  const urlsQuery = useUrls(variables)

  const queries = {
    domains: domainsQuery,
    projectTemplates: projectTemplatesQuery,
    sites: sitesQuery,
    urls: urlsQuery
  }

  return <View pageInfo={pageInfo} queries={queries} />
}

// export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
