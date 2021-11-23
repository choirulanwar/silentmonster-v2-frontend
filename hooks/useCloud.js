import { useQuery, useMutation } from '@apollo/client'
import {
  GET_CLOUDS_QUERIES,
  GET_CLOUD_QUERIES,
  CREATE_CLOUD_MUTATIONS,
  UPDATE_CLOUD_MUTATIONS,
  DELETE_CLOUD_MUTATIONS
} from '@/graphql/Cloud'
import { toast } from 'react-toastify'

export const useClouds = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_CLOUDS_QUERIES, {
    variables
  })

  return {
    datas: data?.clouds || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCloud = (variables = { id: null }) => {
  const initState = {
    cloud: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_CLOUD_QUERIES, {
    variables
  })

  return {
    data: data?.cloud || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateCloud = (variables = { page: 1, limit: 10 }) => {
  const [createCloud, { data, loading, error }] = useMutation(
    CREATE_CLOUD_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_CLOUDS_QUERIES,
          variables
        })
        const {
          clouds: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createCloud],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_CLOUDS_QUERIES,
          variables,
          data: { clouds: newData }
        })
      }
    }
  )

  return {
    createCloud: async variables => {
      try {
        await createCloud({ variables })
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

export const useUpdateCloud = (variables = { id: null }) => {
  const [updateCloud, { data, loading, error }] = useMutation(
    UPDATE_CLOUD_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_CLOUD_QUERIES,
          variables,
          data: { cloud: data.updateCloud }
        })
      }
    }
  )

  return {
    updateCloud: async variables => {
      try {
        await updateCloud({ variables })
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

export const useDeleteCloud = (variables = { page: 1, limit: 10 }) => {
  const [deleteCloud, { data, loading, error }] = useMutation(
    DELETE_CLOUD_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_CLOUDS_QUERIES,
          variables
        })
        const {
          clouds: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteCloud.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_CLOUDS_QUERIES,
          variables,
          data: { clouds: newData }
        })
      }
    }
  )

  return {
    deleteCloud: async variables => {
      try {
        await deleteCloud({ variables })
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
