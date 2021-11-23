import { useQuery, useMutation } from '@apollo/client'
import {
  GET_DOMAINS_QUERIES,
  GET_DOMAIN_QUERIES,
  CREATE_DOMAIN_MUTATIONS,
  UPDATE_DOMAIN_MUTATIONS,
  DELETE_DOMAIN_MUTATIONS
} from '@/graphql/Domain'
import { toast } from 'react-toastify'

export const useDomains = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_DOMAINS_QUERIES, {
    variables
  })

  return {
    datas: data?.domains || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useDomain = (variables = { id: null }) => {
  const initState = {
    domain: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_DOMAIN_QUERIES, {
    variables
  })

  return {
    data: data?.domain || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateDomain = (variables = { page: 1, limit: 10 }) => {
  const [createDomain, { data, loading, error }] = useMutation(
    CREATE_DOMAIN_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_DOMAINS_QUERIES,
          variables
        })
        const {
          domains: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createDomain],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_DOMAINS_QUERIES,
          variables,
          data: { domains: newData }
        })
      }
    }
  )

  return {
    createDomain: async variables => {
      try {
        await createDomain({ variables })
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

export const useUpdateDomain = (variables = { id: null }) => {
  const [updateDomain, { data, loading, error }] = useMutation(
    UPDATE_DOMAIN_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_DOMAIN_QUERIES,
          variables,
          data: { domain: data.updateDomain }
        })
      }
    }
  )

  return {
    updateDomain: async variables => {
      try {
        await updateDomain({ variables })
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

export const useDeleteDomain = (variables = { page: 1, limit: 10 }) => {
  const [deleteDomain, { data, loading, error }] = useMutation(
    DELETE_DOMAIN_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_DOMAINS_QUERIES,
          variables
        })
        const {
          domains: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteDomain.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_DOMAINS_QUERIES,
          variables,
          data: { domains: newData }
        })
      }
    }
  )

  return {
    deleteDomain: async variables => {
      try {
        await deleteDomain({ variables })
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
