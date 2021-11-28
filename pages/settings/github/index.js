// import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useGithubs, useCreateGithub, useDeleteGithub } from '@/hooks/useGithub'

import View from '@/views/Settings/Githubs'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createGithubMutation = useCreateGithub(variables)

  const initialValues = {
    label: '',
    email: '',
    name: '',
    username: '',
    token: ''
  }
  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    email: Yup.string().email().required().trim(),
    name: Yup.string().required().trim(),
    username: Yup.string().required().trim(),
    token: Yup.string().required().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        createGithubMutation.createGithub({ input: { ...values } })
      } catch (e) {
        console.error(e)
      } finally {
        resetForm({})
      }
    }
  })

  return {
    ...form,
    variables,
    isSubmitting: createGithubMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Githubs',
    href: '/settings/github',
    activePage: props?.page || 1
  }

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    variables,
    isSubmitting
  } = CreateForm(props)

  const githubsQuery = useGithubs(variables)

  const deleteGithubMutation = useDeleteGithub(variables)

  const queries = { githubs: githubsQuery }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteGithub: async id => {
      try {
        await deleteGithubMutation.deleteGithub({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

// export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
