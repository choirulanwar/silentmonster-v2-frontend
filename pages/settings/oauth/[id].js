import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useOAuthKey, useUpdateOAuthKey } from '@/hooks/useOAuthKey'

import View from '@/views/Settings/OAuthKeys/Update'

const UpdateForm = props => {
  const updateOAuthKeyMutation = useUpdateOAuthKey(props.variables)

  const initialValues = {
    label: props?.oauthKey?.data?.node?.label || '',
    type: props?.oauthKey?.data?.node?.type || '',
    email: props?.oauthKey?.data?.node?.email || '',
    token: props?.oauthKey?.data?.node?.token || ''
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
        updateOAuthKeyMutation.updateOAuthKey({
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
    isSubmitting: updateOAuthKeyMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'OAuth Key',
    href: `/settings/oauth/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const oauthKeyQuery = useOAuthKey(variables)

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, oauthKey: oauthKeyQuery })

  const queries = { oauthKey: oauthKeyQuery }
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
