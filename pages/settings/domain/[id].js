// import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDomain, useUpdateDomain } from '@/hooks/useDomain'

import { useClouds } from '@/hooks/useCloud'
import { useDnss } from '@/hooks/useDns'

import View from '@/views/Settings/Domains/Update'

const UpdateForm = props => {
  const updateDomainMutation = useUpdateDomain(props.variables)

  const initialValues = {
    label: props?.domain?.data?.node?.label || '',
    domain: props?.domain?.data?.node?.domain || '',
    dns: props?.domain?.data?.node?.dns?._id || '',
    cloud: props?.domain?.data?.node?.cloud?._id || ''
  }

  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    domain: Yup.string().required().trim(),
    dns: Yup.string().required().trim(),
    cloud: Yup.string().required().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        updateDomainMutation.updateDomain({
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
    isSubmitting: updateDomainMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Domain',
    href: `/settings/domain/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const domainQuery = useDomain(variables)
  const cloudsQuery = useClouds({ page: 1, limit: 100 })
  const dnssQuery = useDnss({ page: 1, limit: 100 })

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, domain: domainQuery })

  const queries = {
    domain: domainQuery,
    clouds: cloudsQuery,
    dnss: dnssQuery
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
