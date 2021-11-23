import { useQuery, useMutation } from '@apollo/client'
import {
  GET_OAUTH_KEYS_QUERIES,
  GET_OAUTH_KEY_QUERIES,
  CREATE_OAUTH_KEY_MUTATIONS,
  UPDATE_OAUTH_KEY_MUTATIONS,
  DELETE_OAUTH_KEY_MUTATIONS
} from '@/graphql/OAuthKey'
import { toast } from 'react-toastify'

export const useOAuthKeys = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_OAUTH_KEYS_QUERIES, {
    variables
  })

  return {
    datas: data?.oauthKeys || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useOAuthKey = (variables = { id: null }) => {
  const initState = {
    oauthKey: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_OAUTH_KEY_QUERIES, {
    variables
  })

  return {
    data: data?.oauthKey || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateOAuthKey = (variables = { page: 1, limit: 10 }) => {
  const [createOAuthKey, { data, loading, error }] = useMutation(
    CREATE_OAUTH_KEY_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_OAUTH_KEYS_QUERIES,
          variables
        })
        const {
          oauthKeys: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createOAuthKey],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_OAUTH_KEYS_QUERIES,
          variables,
          data: { oauthKeys: newData }
        })
      }
    }
  )

  return {
    createOAuthKey: async variables => {
      try {
        await createOAuthKey({ variables })
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

export const useUpdateOAuthKey = (variables = { id: null }) => {
  const [updateOAuthKey, { data, loading, error }] = useMutation(
    UPDATE_OAUTH_KEY_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_OAUTH_KEY_QUERIES,
          variables,
          data: { oauthKey: data.updateOAuthKey }
        })
      }
    }
  )

  return {
    updateOAuthKey: async variables => {
      try {
        await updateOAuthKey({ variables })
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

export const useDeleteOAuthKey = (variables = { page: 1, limit: 10 }) => {
  const [deleteOAuthKey, { data, loading, error }] = useMutation(
    DELETE_OAUTH_KEY_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_OAUTH_KEYS_QUERIES,
          variables
        })
        const {
          oauthKeys: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteOAuthKey.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_OAUTH_KEYS_QUERIES,
          variables,
          data: { oauthKeys: newData }
        })
      }
    }
  )

  return {
    deleteOAuthKey: async variables => {
      try {
        await deleteOAuthKey({ variables })
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
