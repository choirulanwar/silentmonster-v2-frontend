import { useQuery, useMutation } from '@apollo/client'
import {
  GET_WEBMASTERS_QUERIES,
  GET_WEBMASTER_QUERIES,
  CREATE_WEBMASTER_MUTATIONS,
  UPDATE_WEBMASTER_MUTATIONS,
  DELETE_WEBMASTER_MUTATIONS
} from '@/graphql/Webmaster'
import { toast } from 'react-toastify'

export const useWebmasters = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_WEBMASTERS_QUERIES, {
    variables
  })

  return {
    datas: data?.webmasters || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useWebmaster = (variables = { id: null }) => {
  const initState = {
    webmaster: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_WEBMASTER_QUERIES, {
    variables
  })

  return {
    data: data?.webmaster || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateWebmaster = (variables = { page: 1, limit: 10 }) => {
  const [createWebmaster, { data, loading, error }] = useMutation(
    CREATE_WEBMASTER_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_WEBMASTERS_QUERIES,
          variables
        })
        const {
          webmasters: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createWebmaster],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_WEBMASTERS_QUERIES,
          variables,
          data: { webmasters: newData }
        })
      }
    }
  )

  return {
    createWebmaster: async variables => {
      try {
        await createWebmaster({ variables })
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

export const useUpdateWebmaster = (variables = { id: null }) => {
  const [updateWebmaster, { data, loading, error }] = useMutation(
    UPDATE_WEBMASTER_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_WEBMASTER_QUERIES,
          variables,
          data: { webmaster: data.updateWebmaster }
        })
      }
    }
  )

  return {
    updateWebmaster: async variables => {
      try {
        await updateWebmaster({ variables })
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

export const useDeleteWebmaster = (variables = { page: 1, limit: 10 }) => {
  const [deleteWebmaster, { data, loading, error }] = useMutation(
    DELETE_WEBMASTER_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_WEBMASTERS_QUERIES,
          variables
        })
        const {
          webmasters: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteWebmaster.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_WEBMASTERS_QUERIES,
          variables,
          data: { webmasters: newData }
        })
      }
    }
  )

  return {
    deleteWebmaster: async variables => {
      try {
        await deleteWebmaster({ variables })
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
