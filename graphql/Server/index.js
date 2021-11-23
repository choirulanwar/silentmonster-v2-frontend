import { gql } from '@apollo/client'

export const GET_SERVERS_QUERIES = gql`
  query GET_SERVERS($page: Int, $limit: Int) {
    servers(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          host
          status
          conclusion
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

export const GET_SERVER_QUERIES = gql`
  query GET_SERVER($id: ID!) {
    server(id: $id) {
      node {
        _id
        label
        host
        status
        conclusion
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_SERVER_MUTATIONS = gql`
  mutation CREATE_SERVER($input: ServerInput!) {
    createServer(input: $input) {
      node {
        _id
        label
        host
        status
        message
        conclusion
        startedAt
        completedAt
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_SERVER_MUTATIONS = gql`
  mutation DELETE_SERVER($id: ID!) {
    deleteServer(id: $id) {
      node {
        _id
        label
        host
        status
        conclusion
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const ON_SERVER_UPDATE_SUBSCRIPTION = gql`
  subscription ON_SERVER_UPDATE($id: ID!) {
    onServerUpdate(id: $id) {
      node {
        _id
        label
        host
        status
        conclusion
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const ON_SERVER_PROGRESS_SUBSCRIPTION = gql`
  subscription ON_SERVER_PROGRESS($id: ID!) {
    onServerProgress(id: $id) {
      node {
        _id
        message
      }
    }
  }
`
