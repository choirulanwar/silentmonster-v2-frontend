import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useThemes, useCreateTheme, useDeleteTheme } from '@/hooks/useTheme'

import View from '@/views/Themes'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createThemeMutation = useCreateTheme(variables)

  const initialValues = {
    label: '',
    type: '',
    description: '',
    url: '',
    token: ''
  }
  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    type: Yup.string().required().trim(),
    description: Yup.string().trim(),
    url: Yup.string().required().trim(),
    token: Yup.string().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        createThemeMutation.createTheme({
          input: { ...values }
        })
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
    isSubmitting: createThemeMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Themes',
    href: '/themes',
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

  const themesQuery = useThemes(variables)
  const deleteThemeMutation = useDeleteTheme(variables)

  const queries = { themes: themesQuery }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteTheme: async id => {
      try {
        await deleteThemeMutation.deleteTheme({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

export default Page
