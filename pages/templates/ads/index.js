// import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAdss, useCreateAds, useDeleteAds } from '@/hooks/useAds'

import View from '@/views/Templates/Adss'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createAdsMutation = useCreateAds(variables)

  const initialValues = {
    label: '',
    code: ''
  }
  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    code: Yup.string().required().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        createAdsMutation.createAds({ input: { ...values } })
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
    isSubmitting: createAdsMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Adss',
    href: '/templates/ads',
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

  const adssQuery = useAdss(variables)

  const deleteAdsMutation = useDeleteAds(variables)

  const queries = { adss: adssQuery }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteAds: async id => {
      try {
        await deleteAdsMutation.deleteAds({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

// export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
