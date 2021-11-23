import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useCloud, useUpdateCloud } from '@/hooks/useCloud'

import View from '@/views/Settings/Clouds/Update'

const UpdateForm = props => {
  const updateCloudMutation = useUpdateCloud(props.variables)

  const initialValues = {
    label: props?.cloud?.data?.node?.label || '',
    type: props?.cloud?.data?.node?.type || '',
    email: props?.cloud?.data?.node?.email || '',
    token: props?.cloud?.data?.node?.token || ''
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
        updateCloudMutation.updateCloud({
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
    isSubmitting: updateCloudMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Cloud',
    href: `/settings/cloud/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const cloudQuery = useCloud(variables)

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, cloud: cloudQuery })

  const queries = { cloud: cloudQuery }
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

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
