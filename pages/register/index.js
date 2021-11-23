import { useRouter } from 'next/router'
import { authSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useRegister } from '@/hooks/useAuth'

import View from '@/views/Auth/Register'
import { toast } from 'react-toastify'

const RegisterForm = () => {
  const router = useRouter()

  const useRegisterMutation = useRegister()

  const initialValues = { username: '', name: '', email: '', password: '' }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(16).required()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await useRegisterMutation.register(values).then(async result => {
          if (result?.Register) {
            toast.success('Success')

            router.push('/confirm-mail')
          } else {
            toast.error(useRegisterMutation.error?.[0]?.message)
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
    isSubmitting: useRegisterMutation.isLoading,
    result: useRegisterMutation.result,
    error: useRegisterMutation.error
  }
}

const Page = () => {
  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    RegisterForm()

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
