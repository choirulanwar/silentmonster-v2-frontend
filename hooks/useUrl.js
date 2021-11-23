import { useQuery } from '@apollo/client'
import { GET_URLS_QUERIES } from '@/graphql/Url'

export const useUrls = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_URLS_QUERIES, {
    variables
  })

  return {
    datas: data?.urls || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}
