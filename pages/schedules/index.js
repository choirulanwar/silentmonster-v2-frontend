// import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  useSchedules,
  useCreateSchedule,
  useDeleteSchedule
} from '@/hooks/useSchedule'

import { useKeywords } from '@/hooks/useKeyword'
import { useProjectTemplates } from '@/hooks/useProjectTemplate'

import View from '@/views/Schedules'

const CreateForm = props => {
  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createScheduleMutation = useCreateSchedule(variables)

  const initialValues = {
    totalRun: '',
    type: '',
    keyword: '',
    theme: '',
    template: '',
    gtm: '',
    histats: ''
  }
  const validationSchema = Yup.object().shape({
    totalRun: Yup.number().required(),
    type: Yup.string().required().trim(),
    keyword: Yup.string().trim(),
    theme: Yup.string().trim(),
    template: Yup.string().required().trim(),
    gtm: Yup.string().trim(),
    histats: Yup.string().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        createScheduleMutation.createSchedule({
          input: { data: JSON.stringify({ ...values, manualTrigger: false }) }
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
    isSubmitting: createScheduleMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Schedules',
    href: '/schedules',
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

  const schedulesQuery = useSchedules(variables)
  const deleteScheduleMutation = useDeleteSchedule(variables)

  const keywordsQuery = useKeywords({ page: 1, limit: 100 })
  const templatesQuery = useProjectTemplates({ page: 1, limit: 100 })

  const queries = {
    schedules: schedulesQuery,
    keywords: keywordsQuery,
    projectTemplates: templatesQuery
  }
  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteSchedule: async id => {
      try {
        await deleteScheduleMutation.deleteSchedule({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

// export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
