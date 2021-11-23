import { gql } from '@apollo/client'

export const PAGE_INFO_FRAGMENT = gql`
  fragment pageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
    totalPages
    page
    limit
  }
`

export const DOMAIN_FRAGMENT = gql`
  fragment domain on Domain {
    _id
    label
    domain
    dns {
      _id
      label
    }
    createdBy {
      _id
    }
    createdAt
    updatedAt
  }
`
