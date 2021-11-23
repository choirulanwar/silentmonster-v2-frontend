import { useRouter } from 'next/router'
import { authSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useForgotPassword } from '@/hooks/useAuth'

import View from '@/views/Auth/ForgotPassword'
import { toast } from 'react-toastify'

const ForgotPasswordForm = () => {
  const router = useRouter()

  const useForgotPasswordMutation = useForgotPassword()

  const initialValues = { email: '' }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await useForgotPasswordMutation
          .forgotPassword(values)
          .then(async result => {
            if (result?.ForgotPassword) {
              toast.success('Success')

              router.push('/reset-password')
            } else {
              toast.error(useForgotPasswordMutation.error?.[0]?.message)
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
    isSubmitting: useForgotPasswordMutation.isLoading,
    result: useForgotPasswordMutation.result,
    error: useForgotPasswordMutation.error
  }
}

const Page = () => {
  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    ForgotPasswordForm()

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
