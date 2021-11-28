import { useRouter } from 'next/router'
// import { authSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useResendMail } from '@/hooks/useAuth'

import View from '@/views/Auth/ResendMail'
import { toast } from 'react-toastify'

const ResendMailForm = () => {
  const router = useRouter()

  const useResendMailMutation = useResendMail()

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
        await useResendMailMutation.resendMail(values).then(async result => {
          if (result?.ResendMail) {
            toast.success('Success')

            router.push('/confirm-mail')
          } else {
            toast.error(useResendMailMutation.error?.[0]?.message)
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
    isSubmitting: useResendMailMutation.isLoading,
    result: useResendMailMutation.result,
    error: useResendMailMutation.error
  }
}

const Page = () => {
  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    ResendMailForm()

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
