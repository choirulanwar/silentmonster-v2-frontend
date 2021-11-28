// import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDns, useUpdateDns } from '@/hooks/useDns'

import View from '@/views/Settings/Dnss/Update'

const UpdateForm = props => {
  const updateDnsMutation = useUpdateDns(props.variables)

  const initialValues = {
    label: props?.dns?.data?.node?.label || '',
    type: props?.dns?.data?.node?.type || '',
    email: props?.dns?.data?.node?.email || '',
    token: props?.dns?.data?.node?.token || '',
    zoneId: props?.dns?.data?.node?.zoneId || '',
    ip: props?.dns?.data?.node?.ip || ''
  }

  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    type: Yup.string().required().trim(),
    email: Yup.string().email().required().trim(),
    token: Yup.string().required().trim(),
    zoneId: Yup.string().required().trim(),
    ip: Yup.string().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        updateDnsMutation.updateDns({
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
    isSubmitting: updateDnsMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Dns',
    href: `/settings/dns/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const dnsQuery = useDns(variables)

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, dns: dnsQuery })

  const queries = { dns: dnsQuery }
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
