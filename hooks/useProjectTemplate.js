import { useQuery, useMutation } from '@apollo/client'
import {
  GET_PROJECT_TEMPLATES_QUERIES,
  GET_PROJECT_TEMPLATE_QUERIES,
  CREATE_PROJECT_TEMPLATE_MUTATIONS,
  UPDATE_PROJECT_TEMPLATE_MUTATIONS,
  DELETE_PROJECT_TEMPLATE_MUTATIONS,
  DEPLOY_NEW_SITE_MUTATIONS
} from '@/graphql/ProjectTemplate'
import { GET_SITES_QUERIES } from '@/graphql/Site'
import { toast } from 'react-toastify'

export const useProjectTemplates = (variables = { page: 1, limit: 10 }) => {
  const initState = {
    edges: [],
    pageInfo: { totalPages: 1 },
    totalCount: 0
  }

  const { data, loading, error } = useQuery(GET_PROJECT_TEMPLATES_QUERIES, {
    variables
  })

  return {
    datas: data?.projectTemplates || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useProjectTemplate = (variables = { id: null }) => {
  const initState = {
    projectTemplate: {
      node: null
    }
  }

  const { data, loading, error } = useQuery(GET_PROJECT_TEMPLATE_QUERIES, {
    variables
  })

  return {
    data: data?.projectTemplate || initState,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useCreateProjectTemplate = (
  variables = { page: 1, limit: 10 }
) => {
  const [createProjectTemplate, { data, loading, error }] = useMutation(
    CREATE_PROJECT_TEMPLATE_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_PROJECT_TEMPLATES_QUERIES,
          variables
        })
        const {
          projectTemplates: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.createProjectTemplate],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_PROJECT_TEMPLATES_QUERIES,
          variables,
          data: { projectTemplates: newData }
        })
      }
    }
  )

  return {
    createProjectTemplate: async variables => {
      try {
        await createProjectTemplate({ variables })
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

export const useUpdateProjectTemplate = (variables = { id: null }) => {
  const [updateProjectTemplate, { data, loading, error }] = useMutation(
    UPDATE_PROJECT_TEMPLATE_MUTATIONS,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_PROJECT_TEMPLATE_QUERIES,
          variables,
          data: { projectTemplate: data.updateProjectTemplate }
        })
      }
    }
  )

  return {
    updateProjectTemplate: async variables => {
      try {
        await updateProjectTemplate({ variables })
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

export const useDeleteProjectTemplate = (
  variables = { page: 1, limit: 10 }
) => {
  const [deleteProjectTemplate, { data, loading, error }] = useMutation(
    DELETE_PROJECT_TEMPLATE_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_PROJECT_TEMPLATES_QUERIES,
          variables
        })
        const {
          projectTemplates: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: edges.filter(
            edge => edge.node._id !== data.deleteProjectTemplate.node._id
          ),
          pageInfo,
          totalCount: Number(totalCount) - 1
        }

        cache.writeQuery({
          query: GET_PROJECT_TEMPLATES_QUERIES,
          variables,
          data: { projectTemplates: newData }
        })
      }
    }
  )

  return {
    deleteProjectTemplate: async variables => {
      try {
        await deleteProjectTemplate({ variables })
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

export const useDeploySite = ({ variables = { page: 1, limit: 10 } }) => {
  const [deploySite, { data, loading, error }] = useMutation(
    DEPLOY_NEW_SITE_MUTATIONS,
    {
      update: (cache, { data }) => {
        const currentData = cache.readQuery({
          query: GET_SITES_QUERIES,
          variables
        })
        const {
          sites: { edges, pageInfo, totalCount }
        } = currentData

        const newData = {
          edges: [...edges, data.deployNewSite],
          pageInfo,
          totalCount: Number(totalCount) + 1
        }

        cache.writeQuery({
          query: GET_SITES_QUERIES,
          variables,
          data: { sites: newData }
        })
      }
    }
  )

  return {
    deploySite: async variables => {
      try {
        await deploySite({ variables })
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
