import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useWebmaster, useUpdateWebmaster } from '@/hooks/useWebmaster'

import { useOAuthKeys } from '@/hooks/useOAuthKey'

import View from '@/views/Settings/Webmasters/Update'

const UpdateForm = props => {
  const updateWebmasterMutation = useUpdateWebmaster(props.variables)

  const initialValues = {
    label: props?.webmaster?.data?.node?.label || '',
    type: props?.webmaster?.data?.node?.type || '',
    email: props?.webmaster?.data?.node?.email || '',
    token: props?.webmaster?.data?.node?.token || '',
    key: props?.webmaster?.data?.node?.key?._id || ''
  }

  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    type: Yup.string().required().trim(),
    email: Yup.string().email().required().trim(),
    token: Yup.string().required().trim(),
    key: Yup.string().required().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        updateWebmasterMutation.updateWebmaster({
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
    isSubmitting: updateWebmasterMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Webmaster',
    href: `/settings/webmaster/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const webmasterQuery = useWebmaster(variables)
  const oAuthKeysQuery = useOAuthKeys({ page: 1, limit: 100 })

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, webmaster: webmasterQuery })

  const queries = { webmaster: webmasterQuery, oauthKeys: oAuthKeysQuery }
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
