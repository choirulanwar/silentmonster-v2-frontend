import { gql } from '@apollo/client'

export const GET_SITES_QUERIES = gql`
  query GET_SITES($page: Int, $limit: Int) {
    sites(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          type
          hostname
          title
          template {
            _id
            label
            domain {
              _id
              label
              domain
            }
          }
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

export const GET_SITE_QUERIES = gql`
  query GET_SITE($id: ID!) {
    site(id: $id) {
      node {
        _id
        label
        type
        hostname
        title
        description
        tagline
        theme
        initPostCount
        postPerDay
        template {
          _id
          label
          domain {
            _id
            label
            domain
          }
        }
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

export const DELETE_SITE_MUTATIONS = gql`
  mutation DELETE_SITE($id: ID!) {
    deleteSite(id: $id) {
      node {
        _id
        label
        type
        hostname
        title
        template {
          _id
          label
          domain {
            _id
            label
            domain
          }
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
