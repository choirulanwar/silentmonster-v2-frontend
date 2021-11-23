import { adminSSP } from '@/utils/redirects'

import { useJobs } from '@/hooks/useJob'

import View from '@/views/Sites/Tasks'

const Page = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }

  const pageInfo = {
    title: 'Tasks',
    href: `/sites/${props.id}/tasks`,
    activePage: props?.page || 1
  }

  const jobsQuery = useJobs({ siteId: props?.id, ...variables })

  const queries = { jobs: jobsQuery }

  return <View pageInfo={pageInfo} queries={queries} />
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
