import { gql } from '@apollo/client'

export const GET_WEBMASTERS_QUERIES = gql`
  query GET_WEBMASTERS($page: Int, $limit: Int) {
    webmasters(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          type
          email
          # token
          # key {
          #   _id
          # }
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

export const GET_WEBMASTER_QUERIES = gql`
  query GET_WEBMASTER($id: ID!) {
    webmaster(id: $id) {
      node {
        _id
        label
        type
        email
        token
        key {
          _id
        }
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_WEBMASTER_MUTATIONS = gql`
  mutation CREATE_WEBMASTER($input: WebmasterInput!) {
    createWebmaster(input: $input) {
      node {
        _id
        label
        type
        email
        token
        key {
          _id
        }
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_WEBMASTER_MUTATIONS = gql`
  mutation UPDATE_WEBMASTER($id: ID!, $input: WebmasterInput!) {
    updateWebmaster(id: $id, input: $input) {
      node {
        _id
        label
        type
        email
        token
        key {
          _id
        }
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_WEBMASTER_MUTATIONS = gql`
  mutation DELETE_WEBMASTER($id: ID!) {
    deleteWebmaster(id: $id) {
      node {
        _id
        label
        type
        email
        token
        key {
          _id
        }
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`
