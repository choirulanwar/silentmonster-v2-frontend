import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  useKeywords,
  useCreateKeyword,
  useDeleteKeyword
} from '@/hooks/useKeyword'

import View from '@/views/Keywords'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createKeywordMutation = useCreateKeyword(variables)

  const initialValues = {
    label: '',
    content: ''
  }
  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    content: Yup.string().required().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let isTrendingKeyword
        const format = values.content.split(/\r?\n/)[0].split(',').length

        if (format === 5) {
          isTrendingKeyword = true
        } else {
          isTrendingKeyword = false
        }

        createKeywordMutation.createKeyword({
          input: { ...values, isTrendingKeyword }
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
    variables,
    isSubmitting: createKeywordMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Keywords',
    href: '/keywords',
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

  const keywordsQuery = useKeywords(variables)
  const deleteKeywordMutation = useDeleteKeyword(variables)

  const queries = { keywords: keywordsQuery }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteKeyword: async id => {
      try {
        await deleteKeywordMutation.deleteKeyword({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
