// import { adminSSP } from '@/utils/redirects'
import {  useFormik } from 'formik'
import * as Yup from 'yup'

import {
  useWebmasters,
  useCreateWebmaster,
  useDeleteWebmaster
} from '@/hooks/useWebmaster'

import { useOAuthKeys } from '@/hooks/useOAuthKey'

import View from '@/views/Settings/Webmasters'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createWebmasterMutation = useCreateWebmaster(variables)

  const initialValues = {
    label: '',
    type: '',
    email: '',
    token: '',
    key: ''
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
        createWebmasterMutation.createWebmaster({ input: { ...values } })
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
    isSubmitting: createWebmasterMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Webmasters',
    href: '/settings/webmaster',
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

  const webmastersQuery = useWebmasters(variables)
  const oAuthKeysQuery = useOAuthKeys({ page: 1, limit: 100 })
  const deleteWebmasterMutation = useDeleteWebmaster(variables)

  const queries = { webmasters: webmastersQuery, oauthKeys: oAuthKeysQuery }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteWebmaster: async id => {
      try {
        await deleteWebmasterMutation.deleteWebmaster({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

// export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
