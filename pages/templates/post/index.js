// import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  usePostTemplates,
  useCreatePostTemplate,
  useDeletePostTemplate
} from '@/hooks/usePostTemplate'

import View from '@/views/Templates/Posts'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createPostTemplateMutation = useCreatePostTemplate(variables)

  const initialValues = {
    label: '',
    type: '',
    content: ''
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
        createPostTemplateMutation.createPostTemplate({ input: { ...values } })
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
    isSubmitting: createPostTemplateMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Post Templates',
    href: '/templates/post',
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

  const postTemplatesQuery = usePostTemplates(variables)
  const deletePostTemplateMutation = useDeletePostTemplate(variables)

  const queries = {
    postTemplates: postTemplatesQuery
  }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deletePostTemplate: async id => {
      try {
        await deletePostTemplateMutation.deletePostTemplate({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

// export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
