import { useMutation } from '@apollo/client'
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  CONFIRM_MAIL_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  RESEND_MAIL_MUTATION,
  RESET_PASSWORD_MUTATION
} from '@/graphql/Auth'

export const useLogin = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)

  return {
    login: async variables => {
      try {
        return await login({ variables }).then(d => d.data)
      } catch (error) {
        console.error(error)
      }
    },
    result: data,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useRegister = () => {
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION)

  return {
    register: async variables => {
      try {
        return await register({ variables }).then(d => d.data)
      } catch (error) {
        console.error(error)
      }
    },
    result: data,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useConfirmMail = () => {
  const [confirmMail, { data, loading, error }] = useMutation(
    CONFIRM_MAIL_MUTATION
  )

  return {
    confirmMail: async variables => {
      try {
        return await confirmMail({ variables }).then(d => d.data)
      } catch (error) {
        console.error(error)
      }
    },
    result: data,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useForgotPassword = () => {
  const [forgotPassword, { data, loading, error }] = useMutation(
    FORGOT_PASSWORD_MUTATION
  )

  return {
    forgotPassword: async variables => {
      try {
        return await forgotPassword({ variables }).then(d => d.data)
      } catch (error) {
        console.error(error)
      }
    },
    result: data,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useResendMail = () => {
  const [resendMail, { data, loading, error }] =
    useMutation(RESEND_MAIL_MUTATION)

  return {
    resendMail: async variables => {
      try {
        return await resendMail({ variables }).then(d => d.data)
      } catch (error) {
        console.error(error)
      }
    },
    result: data,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}

export const useResetPassword = () => {
  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION
  )

  return {
    resetPassword: async variables => {
      try {
        return await resetPassword({ variables }).then(d => d.data)
      } catch (error) {
        console.error(error)
      }
    },
    result: data,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}
