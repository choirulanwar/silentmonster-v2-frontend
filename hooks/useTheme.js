import { useQuery, useMutation } from '@apollo/client'
import {
  GET_THEMES_QUERIES,
  GET_THEME_QUERIES,
  CREATE_THEME_MUTATIONS,
  UPDATE_THEME_MUTATIONS,
  DELETE_THEME_MUTATIONS
} from '@/graphql/Theme'
import { toast } from 'react-toastify'

export const useThemes = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_THEMES_QUERIES, {
    variables
  })

  return {
    datas: data?.themes || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useTheme = (variables = { id: null }) => {
  const initState = {
    theme: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_THEME_QUERIES, {
    variables
  })

  return {
    data: data?.theme || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateTheme = (variables = { page: 1, limit: 10 }) => {
  const [createTheme, { data, loading, error }] = useMutation(
    CREATE_THEME_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_THEMES_QUERIES,
          variables
        })
        const {
          themes: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createTheme],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_THEMES_QUERIES,
          variables,
          data: { themes: newData }
        })
      }
    }
  )

  return {
    createTheme: async variables => {
      try {
        await createTheme({ variables })
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

export const useUpdateTheme = (variables = { id: null }) => {
  const [updateTheme, { data, loading, error }] = useMutation(
    UPDATE_THEME_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_THEME_QUERIES,
          variables,
          data: { theme: data.updateTheme }
        })
      }
    }
  )

  return {
    updateTheme: async variables => {
      try {
        await updateTheme({ variables })
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

export const useDeleteTheme = (variables = { page: 1, limit: 10 }) => {
  const [deleteTheme, { data, loading, error }] = useMutation(
    DELETE_THEME_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_THEMES_QUERIES,
          variables
        })
        const {
          themes: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteTheme.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_THEMES_QUERIES,
          variables,
          data: { themes: newData }
        })
      }
    }
  )

  return {
    deleteTheme: async variables => {
      try {
        await deleteTheme({ variables })
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
