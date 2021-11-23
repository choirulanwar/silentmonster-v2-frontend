import { useRouter } from 'next/router'
import { authSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useResetPassword } from '@/hooks/useAuth'

import View from '@/views/Auth/ResetPassword'
import { toast } from 'react-toastify'

const ResetPasswordForm = () => {
  const router = useRouter()

  const useResetPasswordMutation = useResetPassword()

  const initialValues = { password: '', confirmPassword: '' }

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8).max(16).required(),
    confirmPassword: Yup.string().test(
      'passwords-match',
      'Passwords must match',
      function (value) {
        return this.parent.password === value
      }
    )
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        useResetPasswordMutation.resetPassword(values)
        const result = useResetPasswordMutation.result

        if (result) {
          toast.success('Success')

          router.push('/dashboard')
        } else {
          toast.error(useResetPasswordMutation.error?.[0]?.message)
        }
      } catch (e) {
      } finally {
        resetForm({})
      }
    }
  })

  return {
    ...form,
    isSubmitting: useResetPasswordMutation.isLoading,
    result: useResetPasswordMutation.result,
    error: useResetPasswordMutation.error
  }
}

const Page = () => {
  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    ResetPasswordForm()

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
