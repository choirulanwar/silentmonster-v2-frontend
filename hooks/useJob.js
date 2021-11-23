import { useEffect } from 'react'
import {
  useQuery,
  useLazyQuery,
  useMutation,
  useSubscription
} from '@apollo/client'
import {
  GET_JOBS_QUERIES,
  GET_JOB_QUERIES,
  ON_JOB_UPDATE_SUBSCRIPTION,
  ON_STEP_UPDATE_SUBSCRIPTION,
  ON_STEP_PROGRESS_SUBSCRIPTION
} from '@/graphql/Job'
import { toast } from 'react-toastify'

export const useJobs = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error, subscribeToMore, refetch } = useQuery(
    GET_JOBS_QUERIES,
    {
      variables
    }
  )

  return {
    datas: data?.jobs || initState,
    isLoading: loading,
    error: error?.graphQLErrors,
    subscribeToMore,
    refetch
  }
}

export const useJob = (variables = { siteId: null, id: null }) => {
  const initState = {
    job: {
      node: null
    }
  }

  const { data, loading, error, subscribeToMore, refetch } = useQuery(
    GET_JOB_QUERIES,
    {
      variables
    }
  )

  const subsVariables = { siteId: variables.siteId, jobId: variables.id }

  useEffect(() => {
    const onJobUpdate = subscribeToMore({
      document: ON_JOB_UPDATE_SUBSCRIPTION,
      variables: subsVariables,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        refetch(subsVariables)
      }
    })

    return () => onJobUpdate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeToMore])

  useEffect(() => {
    const onStepUpdate = subscribeToMore({
      document: ON_STEP_UPDATE_SUBSCRIPTION,
      variables: subsVariables,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        refetch(subsVariables)
      }
    })

    return () => onStepUpdate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeToMore])

  const onStepProgressSubscription = useSubscription(
    ON_STEP_PROGRESS_SUBSCRIPTION,
    { variables: subsVariables }
  )

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

// export const useOnJobUpdate = ({
//   subscribeToMore,
//   refetch,
//   variables = { siteId: null, jobId: null }
// }) => {
//   useEffect(() => {
//     const onJobUpdate = subscribeToMore({
//       document: ON_JOB_UPDATE_SUBSCRIPTION,
//       variables,
//       updateQuery: (prev, { subscriptionData }) => {
//         if (!subscriptionData.data) return prev
//         refetch({ ...variables })
//       }
//     })

//     return () => {
//       onJobUpdate()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [subscribeToMore])
// }
// export const useOnStepUpdate = ({
//   subscribeToMore,
//   refetch,
//   variables = { siteId: null, jobId: null }
// }) => {
//   useEffect(() => {
//     const onStepUpdate = subscribeToMore({
//       document: ON_STEP_UPDATE_SUBSCRIPTION,
//       variables,
//       updateQuery: (prev, { subscriptionData }) => {
//         if (!subscriptionData.data) return prev
//         refetch({ ...variables })
//       }
//     })

//     return () => {
//       onStepUpdate()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [subscribeToMore])
// }
// export const useOnStepProgress = (
//   variables = { siteId: null, jobId: null }
// ) => {
//   const initState = {
//     onStepProgress: {
//       node: {
//         jobId: variables?.jobId
//       }
//     }
//   }
//   const { data, loading, error } = useSubscription(
//     ON_STEP_PROGRESS_SUBSCRIPTION,
//     { variables }
//   )
//   console.log('data', data)
//   return {
//     data: data?.onStepProgress || initState,
//     isLoading: loading,
//     error: error?.graphQLErrors
//   }
// }
