import { gql } from '@apollo/client'

export const GET_CLOUDS_QUERIES = gql`
  query GET_CLOUDS($page: Int, $limit: Int) {
    clouds(page: $page, limit: $limit) {
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

export const GET_CLOUD_QUERIES = gql`
  query GET_CLOUD($id: ID!) {
    cloud(id: $id) {
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

export const CREATE_CLOUD_MUTATIONS = gql`
  mutation CREATE_CLOUD($input: CloudInput!) {
    createCloud(input: $input) {
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

export const UPDATE_CLOUD_MUTATIONS = gql`
  mutation UPDATE_CLOUD($id: ID!, $input: CloudInput!) {
    updateCloud(id: $id, input: $input) {
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

export const DELETE_CLOUD_MUTATIONS = gql`
  mutation DELETE_CLOUD($id: ID!) {
    deleteCloud(id: $id) {
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
