import { useQuery, useMutation } from '@apollo/client'
import {
  GET_SITES_QUERIES,
  GET_SITE_QUERIES,
  // CREATE_SITE_MUTATIONS,
  // UPDATE_SITE_MUTATIONS,
  DELETE_SITE_MUTATIONS
} from '@/graphql/Site'
import { toast } from 'react-toastify'

export const useSites = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_SITES_QUERIES, {
    variables
  })

  return {
    datas: data?.sites || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useSite = (variables = { id: null }) => {
  const initState = {
    site: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_SITE_QUERIES, {
    variables
  })

  return {
    data: data?.site || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

// export const useCreateSite = (variables = { page: 1, limit: 10 }) => {
//   const [createSite, { data, loading, error }] = useMutation(
//     CREATE_SITE_MUTATIONS,
//     {
//       update: (cache, { data }) => {
//         const currentData = cache.readQuery({
//           query: GET_SITES_QUERIES,
//           variables
//         })
//         const {
//           sites: { edges, pageInfo, totalCount }
//         } = currentData

//         const newData = {
//           edges: [...edges, data.createSite],
//           pageInfo,
//           totalCount: Number(totalCount) + 1
//         }

//         cache.writeQuery({
//           query: GET_SITES_QUERIES,
//           variables,
//           data: { sites: newData }
//         })
//       }
//     }
//   )

//   return {
//     createSite: async variables => {
//       try {
//         await createSite({ variables })
//         toast.success('Success')
//       } catch (error) {
//         toast.error('Something error')
//         console.error(error)
//       }
//     },
//     result: data,
//     isLoading: loading,
//     error: error?.graphQLErrors
//   }
// }

// export const useUpdateSite = (variables = { id: null }) => {
//   const [updateSite, { data, loading, error }] = useMutation(
//     UPDATE_SITE_MUTATIONS,
//     {
//       update: (cache, { data }) => {
//         cache.writeQuery({
//           query: GET_SITE_QUERIES,
//           variables,
//           data: { site: data.updateSite }
//         })
//       }
//     }
//   )

//   return {
//     updateSite: async variables => {
//       try {
//         await updateSite({ variables })
//         toast.success('Success')
//       } catch (error) {
//         toast.error('Something error')
//         console.error(error)
//       }
//     },
//     result: data,
//     isLoading: loading,
//     error: error?.graphQLErrors
//   }
// }

export const useDeleteSite = (variables = { page: 1, limit: 10 }) => {
  const [deleteSite, { data, loading, error }] = useMutation(
    DELETE_SITE_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_SITES_QUERIES,
          variables
        })
        const {
          sites: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteSite.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_SITES_QUERIES,
          variables,
          data: { sites: newData }
        })
      }
    }
  )

  return {
    deleteSite: async variables => {
      try {
        await deleteSite({ variables })
        toast.success('Success')
      } catch (error) {
        toast.error('Something error')
        console.error(error)
      }
    },
    result: data,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}
