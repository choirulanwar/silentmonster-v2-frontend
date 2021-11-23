import { useRouter } from 'next/router'
import { authSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useConfirmMail } from '@/hooks/useAuth'

import View from '@/views/Auth/ConfirmMail'
import { toast } from 'react-toastify'

const ConfirmMailForm = () => {
  const router = useRouter()

  const useConfirmMailMutation = useConfirmMail()

  const initialValues = { token: '' }

  const validationSchema = Yup.object().shape({
    token: Yup.string().required()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await useConfirmMailMutation.confirmMail(values).then(async result => {
          if (result?.ConfirmMail) {
            toast.success('Success')

            router.push('/dashboard')
          } else {
            toast.error(useConfirmMailMutation.error?.[0]?.message)
          }
        })
      } catch (e) {
      } finally {
        resetForm({})
      }
    }
  })

  return {
    ...form,
    isSubmitting: useConfirmMailMutation.isLoading,
    result: useConfirmMailMutation.result,
    error: useConfirmMailMutation.error
  }
}

const Page = () => {
  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    ConfirmMailForm()

  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  }

  return <View mutations={mutations} />
}

export const getServerSideProps = async ctx => authSSP(ctx)

export default Page
