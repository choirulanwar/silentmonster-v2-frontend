// import { adminSSP } from '@/utils/redirects'
import { useSites, useDeleteSite } from '@/hooks/useSite'

import View from '@/views/Sites'

const Page = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }

  const pageInfo = {
    title: 'Sites',
    href: '/sites',
    activePage: props?.page || 1
  }
  const sitesQuery = useSites(variables)

  const deleteSiteMutation = useDeleteSite(variables)

  const queries = { sites: sitesQuery }
  const mutations = {
    deleteSite: async id => {
      try {
        await deleteSiteMutation.deleteSite({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

// export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
