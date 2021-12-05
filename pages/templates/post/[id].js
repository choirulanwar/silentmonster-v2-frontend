// import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { usePostTemplate, useUpdatePostTemplate } from '@/hooks/usePostTemplate'

import View from '@/views/Templates/Posts/Update'

const UpdateForm = props => {
  const updatePostTemplateMutation = useUpdatePostTemplate(props.variables)

  const initialValues = {
    label: props?.postTemplate?.data?.node?.label || '',
    type: props?.postTemplate?.data?.node?.type || '',
    content: props?.postTemplate?.data?.node?.content || ''
  }

  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    type: Yup.string().required().trim(),
    content: Yup.string().required().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        updatePostTemplateMutation.updatePostTemplate({
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
    isSubmitting: updatePostTemplateMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Post Template',
    href: `/templates/post/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const postTemplateQuery = usePostTemplate(variables)

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, postTemplate: postTemplateQuery })

  const queries = {
    postTemplate: postTemplateQuery
  }
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

// export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
