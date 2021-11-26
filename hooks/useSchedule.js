import { useQuery, useMutation } from '@apollo/client'
import {
  GET_SCHEDULES_QUERIES,
  GET_SCHEDULE_QUERIES,
  CREATE_SCHEDULE_MUTATIONS,
  UPDATE_SCHEDULE_MUTATIONS,
  DELETE_SCHEDULE_MUTATIONS
} from '@/graphql/Schedule'
import { toast } from 'react-toastify'

export const useSchedules = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_SCHEDULES_QUERIES, {
    variables
  })

  return {
    datas: data?.schedules || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useSchedule = (variables = { id: null }) => {
  const initState = {
    schedule: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_SCHEDULE_QUERIES, {
    variables
  })

  return {
    data: data?.schedule || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateSchedule = (variables = { page: 1, limit: 10 }) => {
  const [createSchedule, { data, loading, error }] = useMutation(
    CREATE_SCHEDULE_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_SCHEDULES_QUERIES,
          variables
        })
        const {
          schedules: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createSchedule],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_SCHEDULES_QUERIES,
          variables,
          data: { schedules: newData }
        })
      }
    }
  )

  return {
    createSchedule: async variables => {
      try {
        await createSchedule({ variables })
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

export const useUpdateSchedule = (variables = { id: null }) => {
  const [updateSchedule, { data, loading, error }] = useMutation(
    UPDATE_SCHEDULE_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_SCHEDULE_QUERIES,
          variables,
          data: { schedule: data.updateSchedule }
        })
      }
    }
  )

  return {
    updateSchedule: async variables => {
      try {
        await updateSchedule({ variables })
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

export const useDeleteSchedule = (variables = { page: 1, limit: 10 }) => {
  const [deleteSchedule, { data, loading, error }] = useMutation(
    DELETE_SCHEDULE_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_SCHEDULES_QUERIES,
          variables
        })
        const {
          schedules: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteSchedule.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_SCHEDULES_QUERIES,
          variables,
          data: { schedules: newData }
        })
      }
    }
  )

  return {
    deleteSchedule: async variables => {
      try {
        await deleteSchedule({ variables })
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
