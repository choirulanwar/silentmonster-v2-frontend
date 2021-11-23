import { gql } from '@apollo/client'

export const GET_URLS_QUERIES = gql`
  query GET_URLS($page: Int, $limit: Int) {
    urls(page: $page, limit: $limit) {
      edges {
        node {
          _id
          location
          type
          status
          message
          notifyTime
          client {
            _id
          }
          siteId {
            _id
          }
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
