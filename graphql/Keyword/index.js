import { gql } from '@apollo/client'

export const GET_KEYWORDS_QUERIES = gql`
  query GET_KEYWORDS($page: Int, $limit: Int) {
    keywords(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          # isTrendingKeyword
          # content
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

export const GET_KEYWORD_QUERIES = gql`
  query GET_KEYWORD($id: ID!) {
    keyword(id: $id) {
      node {
        _id
        label
        isTrendingKeyword
        content
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_KEYWORD_MUTATIONS = gql`
  mutation CREATE_KEYWORD($input: KeywordInput!) {
    createKeyword(input: $input) {
      node {
        _id
        label
        isTrendingKeyword
        content
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_KEYWORD_MUTATIONS = gql`
  mutation UPDATE_KEYWORD($id: ID!, $input: KeywordInput!) {
    updateKeyword(id: $id, input: $input) {
      node {
        _id
        label
        isTrendingKeyword
        content
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_KEYWORD_MUTATIONS = gql`
  mutation DELETE_KEYWORD($id: ID!) {
    deleteKeyword(id: $id) {
      node {
        _id
        label
        isTrendingKeyword
        content
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`
