import { gql } from '@apollo/client'

export const GET_SERVICES_QUERIES = gql`
  query GET_SERVICES($page: Int, $limit: Int) {
    services(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          endpoint
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

export const GET_SERVICE_QUERIES = gql`
  query GET_SERVICE($id: ID!) {
    service(id: $id) {
      node {
        _id
        label
        endpoint
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_SERVICE_MUTATIONS = gql`
  mutation CREATE_SERVICE($input: ServiceInput!) {
    createService(input: $input) {
      node {
        _id
        label
        endpoint
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_SERVICE_MUTATIONS = gql`
  mutation UPDATE_SERVICE($id: ID!, $input: ServiceInput!) {
    updateService(id: $id, input: $input) {
      node {
        _id
        label
        endpoint
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_SERVICE_MUTATIONS = gql`
  mutation DELETE_SERVICE($id: ID!) {
    deleteService(id: $id) {
      node {
        _id
        label
        endpoint
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`
