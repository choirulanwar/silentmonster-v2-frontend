import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { GET_JOBS_QUERIES, GET_JOB_QUERIES } from '@/graphql/Job'
import { toast } from 'react-toastify'

export const useJobs = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_JOBS_QUERIES, {
    variables
  })

  return {
    datas: data?.jobs || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useJob = (variables = { id: null }) => {
  const initState = {
    job: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_JOB_QUERIES, {
    variables
  })

  return {
    data: data?.job || initState,
    isLoading: loading,
    error: error?.graphQLErrors,
    currentStep:
      data?.job?.node?.steps?.reduce(
        (acc, cur, idx) => (cur.status === 'COMPLETED' ? idx : acc),
        0
      ) || 0
  }
}

export const useJobLazy = (variables = { id: null }) => {
  const initState = {
    job: {
      node: null
    }
  }

  const [getJobLazy, { data, loading, error }] = useLazyQuery(GET_JOB_QUERIES)

  return {
    getJobLazy: async variables => {
      getJobLazy({ variables })
    },
    data: data?.job || initState,
    isLoading: loading,
    error: error?.graphQLErrors,
    currentStep:
      data?.job?.node?.steps?.reduce(
        (acc, cur, idx) => (cur.status === 'COMPLETED' ? idx : acc),
        0
      ) || 0
  }
}
