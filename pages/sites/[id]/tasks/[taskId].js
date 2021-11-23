import { adminSSP } from '@/utils/redirects'

import { useJob } from '@/hooks/useJob'

import View from '@/views/Sites/Tasks/Details'

const Page = props => {
  const pageInfo = {
    title: 'Task',
    href: `/sites/${props?.id}/tasks/${props?.taskId}`,
    activePage: props?.page || 1
  }

  const jobQuery = useJob({ siteId: props?.id, id: props?.taskId })

  const queries = { job: jobQuery }

  return <View pageInfo={pageInfo} queries={queries} />
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
