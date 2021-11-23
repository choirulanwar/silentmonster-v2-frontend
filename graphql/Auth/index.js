import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation Login($login: String!, $password: String!) {
    Login(login: $login, password: $password) {
      user {
        _id
        name
        username
        email
      }
      token
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    Register(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      user {
        _id
        name
        username
        email
      }
      token
    }
  }
`

export const CONFIRM_MAIL_MUTATION = gql`
  mutation ConfirmMail($token: String!) {
    ConfirmMail(token: $token) {
      user {
        _id
        name
        username
        email
      }
    }
  }
`

export const RESEND_MAIL_MUTATION = gql`
  mutation ResendMail($email: String!) {
    ResendMail(email: $email) {
      user {
        _id
        name
        username
        email
      }
    }
  }
`

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    ForgotPassword(email: $email) {
      user {
        _id
        name
        username
        email
      }
    }
  }
`

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    ResetPassword(token: $token, password: $password) {
      user {
        _id
        name
        username
        email
      }
    }
  }
`
