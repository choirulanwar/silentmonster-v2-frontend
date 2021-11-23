import { useQuery, useMutation } from '@apollo/client'
import {
  GET_ADSS_QUERIES,
  GET_ADS_QUERIES,
  CREATE_ADS_MUTATIONS,
  UPDATE_ADS_MUTATIONS,
  DELETE_ADS_MUTATIONS
} from '@/graphql/Ads'
import { toast } from 'react-toastify'

export const useAdss = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_ADSS_QUERIES, {
    variables
  })

  return {
    datas: data?.adss || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useAds = (variables = { id: null }) => {
  const initState = {
    ads: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_ADS_QUERIES, {
    variables
  })

  return {
    data: data?.ads || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateAds = (variables = { page: 1, limit: 10 }) => {
  const [createAds, { data, loading, error }] = useMutation(
    CREATE_ADS_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_ADSS_QUERIES,
          variables
        })
        const {
          adss: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createAds],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_ADSS_QUERIES,
          variables,
          data: { adss: newData }
        })
      }
    }
  )

  return {
    createAds: async variables => {
      try {
        await createAds({ variables })
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

export const useUpdateAds = (variables = { id: null }) => {
  const [updateAds, { data, loading, error }] = useMutation(
    UPDATE_ADS_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_ADS_QUERIES,
          variables,
          data: { ads: data.updateAds }
        })
      }
    }
  )

  return {
    updateAds: async variables => {
      try {
        await updateAds({ variables })
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

export const useDeleteAds = (variables = { page: 1, limit: 10 }) => {
  const [deleteAds, { data, loading, error }] = useMutation(
    DELETE_ADS_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_ADSS_QUERIES,
          variables
        })
        const {
          adss: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteAds.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_ADSS_QUERIES,
          variables,
          data: { adss: newData }
        })
      }
    }
  )

  return {
    deleteAds: async variables => {
      try {
        await deleteAds({ variables })
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
