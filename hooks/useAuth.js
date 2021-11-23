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
        await login({ variables })
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
        await register({ variables })
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
        await confirmMail({ variables })
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
        await forgotPassword({ variables })
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
        await resendMail({ variables })
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
        await resetPassword({ variables })
      } catch (error) {
        console.error(error)
      }
    },
    result: data,
    isLoading: loading,
    error: error?.graphQLErrors
  }
}
