import { gql } from '@apollo/client'

export const GET_THEMES_QUERIES = gql`
  query GET_THEMES($page: Int, $limit: Int) {
    themes(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          type
          description
          url
          token
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

export const GET_THEME_QUERIES = gql`
  query GET_THEME($id: ID!) {
    theme(id: $id) {
      node {
        _id
        label
        type
        description
        url
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

export const CREATE_THEME_MUTATIONS = gql`
  mutation CREATE_THEME($input: ThemeInput!) {
    createTheme(input: $input) {
      node {
        _id
        label
        type
        description
        url
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

export const UPDATE_THEME_MUTATIONS = gql`
  mutation UPDATE_THEME($id: ID!, $input: ThemeInput!) {
    updateTheme(id: $id, input: $input) {
      node {
        _id
        label
        type
        description
        url
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

export const DELETE_THEME_MUTATIONS = gql`
  mutation DELETE_THEME($id: ID!) {
    deleteTheme(id: $id) {
      node {
        _id
        label
        type
        description
        url
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
