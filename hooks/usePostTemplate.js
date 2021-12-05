import { useQuery, useMutation } from '@apollo/client'
import {
  GET_POST_TEMPLATES_QUERIES,
  GET_POST_TEMPLATE_QUERIES,
  CREATE_POST_TEMPLATE_MUTATIONS,
  UPDATE_POST_TEMPLATE_MUTATIONS,
  DELETE_POST_TEMPLATE_MUTATIONS
} from '@/graphql/PostTemplate'
import { toast } from 'react-toastify'

export const usePostTemplates = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_POST_TEMPLATES_QUERIES, {
    variables
  })

  return {
    datas: data?.postTemplates || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const usePostTemplate = (variables = { id: null }) => {
  const initState = {
    postTemplate: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_POST_TEMPLATE_QUERIES, {
    variables
  })

  return {
    data: data?.postTemplate || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreatePostTemplate = (variables = { page: 1, limit: 10 }) => {
  const [createPostTemplate, { data, loading, error }] = useMutation(
    CREATE_POST_TEMPLATE_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_POST_TEMPLATES_QUERIES,
          variables
        })
        const {
          postTemplates: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createPostTemplate],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_POST_TEMPLATES_QUERIES,
          variables,
          data: { postTemplates: newData }
        })
      }
    }
  )

  return {
    createPostTemplate: async variables => {
      try {
        await createPostTemplate({ variables })
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

export const useUpdatePostTemplate = (variables = { id: null }) => {
  const [updatePostTemplate, { data, loading, error }] = useMutation(
    UPDATE_POST_TEMPLATE_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_POST_TEMPLATE_QUERIES,
          variables,
          data: { postTemplate: data.updatePostTemplate }
        })
      }
    }
  )

  return {
    updatePostTemplate: async variables => {
      try {
        await updatePostTemplate({ variables })
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

export const useDeletePostTemplate = (variables = { page: 1, limit: 10 }) => {
  const [deletePostTemplate, { data, loading, error }] = useMutation(
    DELETE_POST_TEMPLATE_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_POST_TEMPLATES_QUERIES,
          variables
        })
        const {
          postTemplates: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deletePostTemplate.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_POST_TEMPLATES_QUERIES,
          variables,
          data: { postTemplates: newData }
        })
      }
    }
  )

  return {
    deletePostTemplate: async variables => {
      try {
        await deletePostTemplate({ variables })
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
