import { useRouter } from 'next/router'
// import { authSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useRegister } from '@/hooks/useAuth'

import { useAuthContext } from '@/services/Auth.service'
import TokenService from '@/services/Token.service'

import View from '@/views/Auth/Register'
import { toast } from 'react-toastify'

const RegisterForm = () => {
  const router = useRouter()
  const [authState, authDispatch] = useAuthContext()

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
            const tokenService = new TokenService()
            await tokenService.saveToken(result.Register.token)

            authDispatch({
              type: 'setAuthDetails',
              payload: {
                name: result.Register.user.name,
                username: result.Register.user.username,
                email: result.Register.user.email
              }
            })

            toast.success('Success')

            if (router?.query?.redirectTo) {
              router.push(router.query.redirectTo)
            } else {
              router.push('/dashboard')
            }

            // router.push('/confirm-mail')
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

// export const getServerSideProps = async ctx => authSSP(ctx)

export default Page
