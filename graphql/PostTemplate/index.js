import { gql } from '@apollo/client'
import { PAGE_INFO_FRAGMENT } from '@/graphql/fragments'

export const GET_POST_TEMPLATES_QUERIES = gql`
  query GET_POST_TEMPLATES($page: Int, $limit: Int) {
    postTemplates(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          type
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

export const GET_POST_TEMPLATE_QUERIES = gql`
  query GET_POST_TEMPLATE($id: ID!) {
    postTemplate(id: $id) {
      node {
        _id
        label
        type
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

export const CREATE_POST_TEMPLATE_MUTATIONS = gql`
  mutation CREATE_POST_TEMPLATE($input: PostTemplateInput!) {
    createPostTemplate(input: $input) {
      node {
        _id
        label
        type
        # content
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_POST_TEMPLATE_MUTATIONS = gql`
  mutation UPDATE_POST_TEMPLATE($id: ID!, $input: PostTemplateInput!) {
    updatePostTemplate(id: $id, input: $input) {
      node {
        _id
        label
        type
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

export const DELETE_POST_TEMPLATE_MUTATIONS = gql`
  mutation DELETE_POST_TEMPLATE($id: ID!) {
    deletePostTemplate(id: $id) {
      node {
        _id
        label
        type
        # content
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`
