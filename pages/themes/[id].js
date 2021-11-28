import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useTheme, useUpdateTheme } from '@/hooks/useTheme'

import View from '@/views/Themes/Update'

const UpdateForm = props => {
  const updateThemeMutation = useUpdateTheme(props.variables)

  const initialValues = {
    label: props?.theme?.data?.node?.label || '',
    type: props?.theme?.data?.node?.type || '',
    description: props?.theme?.data?.node?.description || '',
    url: props?.theme?.data?.node?.url || '',
    token: props?.theme?.data?.node?.token || ''
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
        updateThemeMutation.updateTheme({
          id: props?.id,
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
    isSubmitting: updateThemeMutation.isLoading
  }
}

const Container = props => {
  const pageInfo = {
    title: 'Theme',
    href: `/themes/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const themeQuery = useTheme(variables)

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, theme: themeQuery })

  const queries = { theme: themeQuery }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  }

  return (
    <View
      pageInfo={pageInfo}
      variables={variables}
      queries={queries}
      mutations={mutations}
    />
  )
}

export default Container
