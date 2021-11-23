import { gql } from '@apollo/client'

export const GET_GITHUBS_QUERIES = gql`
  query GET_GITHUBS($page: Int, $limit: Int) {
    githubs(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          email
          # name
          # username
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

export const GET_GITHUB_QUERIES = gql`
  query GET_GITHUB($id: ID!) {
    github(id: $id) {
      node {
        _id
        label
        email
        name
        username
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

export const CREATE_GITHUB_MUTATIONS = gql`
  mutation CREATE_GITHUB($input: GithubInput!) {
    createGithub(input: $input) {
      node {
        _id
        label
        email
        name
        username
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

export const UPDATE_GITHUB_MUTATIONS = gql`
  mutation UPDATE_GITHUB($id: ID!, $input: GithubInput!) {
    updateGithub(id: $id, input: $input) {
      node {
        _id
        label
        email
        name
        username
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

export const DELETE_GITHUB_MUTATIONS = gql`
  mutation DELETE_GITHUB($id: ID!) {
    deleteGithub(id: $id) {
      node {
        _id
        label
        email
        name
        username
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
