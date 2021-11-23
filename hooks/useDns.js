import { useQuery, useMutation } from '@apollo/client'
import {
  GET_DNSS_QUERIES,
  GET_DNS_QUERIES,
  CREATE_DNS_MUTATIONS,
  UPDATE_DNS_MUTATIONS,
  DELETE_DNS_MUTATIONS
} from '@/graphql/DNS'
import { toast } from 'react-toastify'

export const useDnss = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_DNSS_QUERIES, {
    variables
  })

  return {
    datas: data?.dnss || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useDns = (variables = { id: null }) => {
  const initState = {
    dns: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_DNS_QUERIES, {
    variables
  })

  return {
    data: data?.dns || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateDns = (variables = { page: 1, limit: 10 }) => {
  const [createDns, { data, loading, error }] = useMutation(
    CREATE_DNS_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_DNSS_QUERIES,
          variables
        })
        const {
          dnss: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createDns],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_DNSS_QUERIES,
          variables,
          data: { dnss: newData }
        })
      }
    }
  )

  return {
    createDns: async variables => {
      try {
        await createDns({ variables })
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

export const useUpdateDns = (variables = { id: null }) => {
  const [updateDns, { data, loading, error }] = useMutation(
    UPDATE_DNS_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_DNS_QUERIES,
          variables,
          data: { dns: data.updateDns }
        })
      }
    }
  )

  return {
    updateDns: async variables => {
      try {
        await updateDns({ variables })
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

export const useDeleteDns = (variables = { page: 1, limit: 10 }) => {
  const [deleteDns, { data, loading, error }] = useMutation(
    DELETE_DNS_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_DNSS_QUERIES,
          variables
        })
        const {
          dnss: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteDns.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_DNSS_QUERIES,
          variables,
          data: { dnss: newData }
        })
      }
    }
  )

  return {
    deleteDns: async variables => {
      try {
        await deleteDns({ variables })
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
