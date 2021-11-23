import { useQuery, useMutation } from '@apollo/client'
import {
  GET_KEYWORDS_QUERIES,
  GET_KEYWORD_QUERIES,
  CREATE_KEYWORD_MUTATIONS,
  UPDATE_KEYWORD_MUTATIONS,
  DELETE_KEYWORD_MUTATIONS
} from '@/graphql/Keyword'
import { toast } from 'react-toastify'

export const useKeywords = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_KEYWORDS_QUERIES, {
    variables
  })

  return {
    datas: data?.keywords || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useKeyword = (variables = { id: null }) => {
  const initState = {
    keyword: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_KEYWORD_QUERIES, {
    variables
  })

  return {
    data: data?.keyword || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateKeyword = (variables = { page: 1, limit: 10 }) => {
  const [createKeyword, { data, loading, error }] = useMutation(
    CREATE_KEYWORD_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_KEYWORDS_QUERIES,
          variables
        })
        const {
          keywords: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createKeyword],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_KEYWORDS_QUERIES,
          variables,
          data: { keywords: newData }
        })
      }
    }
  )

  return {
    createKeyword: async variables => {
      try {
        await createKeyword({ variables })
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

export const useUpdateKeyword = (variables = { id: null }) => {
  const [updateKeyword, { data, loading, error }] = useMutation(
    UPDATE_KEYWORD_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_KEYWORD_QUERIES,
          variables,
          data: { keyword: data.updateKeyword }
        })
      }
    }
  )

  return {
    updateKeyword: async variables => {
      try {
        await updateKeyword({ variables })
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

export const useDeleteKeyword = (variables = { page: 1, limit: 10 }) => {
  const [deleteKeyword, { data, loading, error }] = useMutation(
    DELETE_KEYWORD_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_KEYWORDS_QUERIES,
          variables
        })
        const {
          keywords: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteKeyword.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_KEYWORDS_QUERIES,
          variables,
          data: { keywords: newData }
        })
      }
    }
  )

  return {
    deleteKeyword: async variables => {
      try {
        await deleteKeyword({ variables })
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
