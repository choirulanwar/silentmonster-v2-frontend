import { useRouter } from 'next/router'
import { authSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useLogin } from '@/hooks/useAuth'

import { useAuthContext } from '@/services/Auth.service'
import TokenService from '@/services/Token.service'

import View from '@/views/Auth/Login'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const router = useRouter()
  const [authState, authDispatch] = useAuthContext()

  const useLoginMutation = useLogin()

  const initialValues = { login: '', password: '' }

  const validationSchema = Yup.object().shape({
    login: Yup.string().required(),
    password: Yup.string().required()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        useLoginMutation.login(values)
        const result = useLoginMutation.result

        if (result) {
          const tokenService = new TokenService()
          await tokenService.saveToken(result.Login.token)

          authDispatch({
            type: 'setAuthDetails',
            payload: {
              name: result.Login.user.name,
              username: result.Login.user.username,
              email: result.Login.user.email
            }
          })

          toast.success('Success')

          if (router?.query?.redirectTo) {
            router.push(router.query.redirectTo)
          } else {
            router.push('/dashboard')
          }
        } else {
          toast.error(useLoginMutation.error?.[0]?.message)
        }
      } catch (e) {
      } finally {
        resetForm({})
      }
    }
  })

  return {
    ...form,
    isSubmitting: useLoginMutation.isLoading,
    result: useLoginMutation.result,
    error: useLoginMutation.error
  }
}

const Page = () => {
  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    LoginForm()

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
