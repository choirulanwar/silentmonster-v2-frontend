import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  useOAuthKeys,
  useCreateOAuthKey,
  useDeleteOAuthKey
} from '@/hooks/useOAuthKey'

import View from '@/views/Settings/OAuthKeys'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createOAuthKeyMutation = useCreateOAuthKey(variables)

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
        createOAuthKeyMutation.createOAuthKey({ input: { ...values } })
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
    isSubmitting: createOAuthKeyMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'OAuth Keys',
    href: '/settings/oauth',
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

  const oauthKeysQuery = useOAuthKeys(variables)

  const deleteOAuthKeyMutation = useDeleteOAuthKey(variables)

  const queries = { oauthKeys: oauthKeysQuery }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteOAuthKey: async id => {
      try {
        await deleteOAuthKeyMutation.deleteOAuthKey({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
