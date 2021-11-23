import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useClouds, useCreateCloud, useDeleteCloud } from '@/hooks/useCloud'

import View from '@/views/Settings/Clouds'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createCloudMutation = useCreateCloud(variables)

  const initialValues = {
    label: '',
    type: '',
    email: '',
    token: ''
  }
  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    type: Yup.string().required().trim(),
    email: Yup.string().email().required().trim(),
    token: Yup.string().required().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        createCloudMutation.createCloud({ input: { ...values } })
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
    isSubmitting: createCloudMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Clouds',
    href: '/settings/cloud',
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

  const cloudsQuery = useClouds(variables)

  const deleteCloudMutation = useDeleteCloud(variables)

  const queries = { clouds: cloudsQuery }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteCloud: async id => {
      try {
        await deleteCloudMutation.deleteCloud({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
