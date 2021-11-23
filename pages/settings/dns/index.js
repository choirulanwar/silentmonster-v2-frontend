import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDnss, useCreateDns, useDeleteDns } from '@/hooks/useDns'

import View from '@/views/Settings/Dnss'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createDnsMutation = useCreateDns(variables)

  const initialValues = {
    label: '',
    type: '',
    email: '',
    token: '',
    zoneId: '',
    ip: ''
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
        createDnsMutation.createDns({ input: { ...values } })
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
    isSubmitting: createDnsMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Dnss',
    href: '/settings/dns',
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

  const dnssQuery = useDnss(variables)

  const deleteDnsMutation = useDeleteDns(variables)

  const queries = { dnss: dnssQuery }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteDns: async id => {
      try {
        await deleteDnsMutation.deleteDns({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
