import { useQuery, useMutation } from '@apollo/client'
import {
  GET_GITHUBS_QUERIES,
  GET_GITHUB_QUERIES,
  CREATE_GITHUB_MUTATIONS,
  UPDATE_GITHUB_MUTATIONS,
  DELETE_GITHUB_MUTATIONS
} from '@/graphql/Github'
import { toast } from 'react-toastify'

export const useGithubs = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_GITHUBS_QUERIES, {
    variables
  })

  return {
    datas: data?.githubs || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useGithub = (variables = { id: null }) => {
  const initState = {
    github: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_GITHUB_QUERIES, {
    variables
  })

  return {
    data: data?.github || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateGithub = (variables = { page: 1, limit: 10 }) => {
  const [createGithub, { data, loading, error }] = useMutation(
    CREATE_GITHUB_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_GITHUBS_QUERIES,
          variables
        })
        const {
          githubs: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createGithub],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_GITHUBS_QUERIES,
          variables,
          data: { githubs: newData }
        })
      }
    }
  )

  return {
    createGithub: async variables => {
      try {
        await createGithub({ variables })
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

export const useUpdateGithub = (variables = { id: null }) => {
  const [updateGithub, { data, loading, error }] = useMutation(
    UPDATE_GITHUB_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_GITHUB_QUERIES,
          variables,
          data: { github: data.updateGithub }
        })
      }
    }
  )

  return {
    updateGithub: async variables => {
      try {
        await updateGithub({ variables })
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

export const useDeleteGithub = (variables = { page: 1, limit: 10 }) => {
  const [deleteGithub, { data, loading, error }] = useMutation(
    DELETE_GITHUB_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_GITHUBS_QUERIES,
          variables
        })
        const {
          githubs: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteGithub.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_GITHUBS_QUERIES,
          variables,
          data: { githubs: newData }
        })
      }
    }
  )

  return {
    deleteGithub: async variables => {
      try {
        await deleteGithub({ variables })
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
