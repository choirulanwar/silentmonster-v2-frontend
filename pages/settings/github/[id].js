import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useGithub, useUpdateGithub } from '@/hooks/useGithub'

import View from '@/views/Settings/Githubs/Update'

const UpdateForm = props => {
  const updateGithubMutation = useUpdateGithub(props.variables)

  const initialValues = {
    label: props?.github?.data?.node?.label || '',
    email: props?.github?.data?.node?.email || '',
    name: props?.github?.data?.node?.name || '',
    username: props?.github?.data?.node?.username || '',
    token: props?.github?.data?.node?.token || ''
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
        updateGithubMutation.updateGithub({
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
    isSubmitting: updateGithubMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Github',
    href: `/settings/github/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const githubQuery = useGithub(variables)

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, github: githubQuery })

  const queries = { github: githubQuery }
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
