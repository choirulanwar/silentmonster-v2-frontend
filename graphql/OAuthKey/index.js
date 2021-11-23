import { gql } from '@apollo/client'

export const GET_OAUTH_KEYS_QUERIES = gql`
  query GET_OAUTH_KEYS($page: Int, $limit: Int) {
    oauthKeys(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          type
          email
          # token
          createdBy {
            _id
          }
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        totalPages
        page
        limit
      }
      totalCount
    }
  }
`

export const GET_OAUTH_KEY_QUERIES = gql`
  query GET_OAUTH_KEY($id: ID!) {
    oauthKey(id: $id) {
      node {
        _id
        label
        type
        email
        token
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_OAUTH_KEY_MUTATIONS = gql`
  mutation CREATE_OAUTH_KEY($input: OAuthKeyInput!) {
    createOAuthKey(input: $input) {
      node {
        _id
        label
        type
        email
        token
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_OAUTH_KEY_MUTATIONS = gql`
  mutation UPDATE_OAUTH_KEY($id: ID!, $input: OAuthKeyInput!) {
    updateOAuthKey(id: $id, input: $input) {
      node {
        _id
        label
        type
        email
        token
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_OAUTH_KEY_MUTATIONS = gql`
  mutation DELETE_OAUTH_KEY($id: ID!) {
    deleteOAuthKey(id: $id) {
      node {
        _id
        label
        type
        email
        token
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`
