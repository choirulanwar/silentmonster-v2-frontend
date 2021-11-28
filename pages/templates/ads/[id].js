// import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAds, useUpdateAds } from '@/hooks/useAds'

import View from '@/views/Templates/Adss/Update'

const UpdateForm = props => {
  const updateAdsMutation = useUpdateAds(props.variables)

  const initialValues = {
    label: props?.ads?.data?.node?.label || '',
    code: props?.ads?.data?.node?.code || ''
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
        updateAdsMutation.updateAds({
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
    isSubmitting: updateAdsMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Ads',
    href: `/templates/ads/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const adsQuery = useAds(variables)

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, ads: adsQuery })

  const queries = { ads: adsQuery }
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
