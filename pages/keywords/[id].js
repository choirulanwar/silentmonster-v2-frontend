// import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useKeyword, useUpdateKeyword } from '@/hooks/useKeyword'

import View from '@/views/Keywords/Update'

const UpdateForm = props => {
  const updateKeywordMutation = useUpdateKeyword(props.variables)

  const initialValues = {
    label: props?.keyword?.data?.node?.label || '',
    content: props?.keyword?.data?.node?.content || ''
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

        updateKeywordMutation.updateKeyword({
          id: props?.id,
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
    isSubmitting: updateKeywordMutation.isLoading
  }
}

const Container = props => {
  const pageInfo = {
    title: 'Keyword',
    href: `/keywords/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const keywordQuery = useKeyword(variables)

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, keyword: keywordQuery })

  const queries = { keyword: keywordQuery }
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
export default Container
