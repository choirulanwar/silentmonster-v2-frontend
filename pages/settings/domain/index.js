import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDomains, useCreateDomain, useDeleteDomain } from '@/hooks/useDomain'

import { useClouds } from '@/hooks/useCloud'
import { useDnss } from '@/hooks/useDns'

import View from '@/views/Settings/Domains'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createDomainMutation = useCreateDomain(variables)

  const initialValues = {
    label: '',
    domain: '',
    dns: '',
    cloud: ''
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
        createDomainMutation.createDomain({ input: { ...values } })
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
    isSubmitting: createDomainMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Domains',
    href: '/settings/domain',
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

  const domainsQuery = useDomains(variables)
  const cloudsQuery = useClouds({ page: 1, limit: 100 })
  const dnssQuery = useDnss({ page: 1, limit: 100 })
  const deleteDomainMutation = useDeleteDomain(variables)

  const queries = {
    domains: domainsQuery,
    clouds: cloudsQuery,
    dnss: dnssQuery
  }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteDomain: async id => {
      try {
        await deleteDomainMutation.deleteDomain({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
