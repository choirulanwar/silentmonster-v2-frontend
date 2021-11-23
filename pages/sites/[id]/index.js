import { useState, useEffect } from 'react'
import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useSite, useUpdateSite } from '@/hooks/useSite'
import { useJobs, useJobLazy } from '@/hooks/useJob'
import View from '@/views/Sites/Details'

const Page = props => {
  const pageInfo = {
    title: 'Site',
    href: `/site/${props?.id}`
  }
  const variables = {
    id: props?.id
  }
  const [jobId, setJobId] = useState(null)

  const siteQuery = useSite(variables)
  const jobsQuery = useJobs({
    siteId: props?.id,
    page: 1,
    limit: 1,
    orderType: 'CREATED_AT_DESC'
  })
  const jobQuery = useJobLazy()

  useEffect(() => {
    if (jobsQuery?.datas?.edges?.[0]?.node?._id) {
      setJobId(jobsQuery?.datas?.edges?.[0]?.node?._id)
      // jobQuery.getJobLazy({ id: jobsQuery?.datas?.edges?.[0]?.node?._id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobsQuery])

  useEffect(() => {
    if (jobId) {
      jobQuery.getJobLazy({ id: jobId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId])

  const queries = { site: siteQuery, job: jobQuery }

  return <View pageInfo={pageInfo} variables={variables} queries={queries} />
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
