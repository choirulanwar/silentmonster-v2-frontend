import { gql } from '@apollo/client'
import { PAGE_INFO_FRAGMENT } from '@/graphql/fragments'

export const GET_DOMAINS_QUERIES = gql`
  query GET_DOMAINS($page: Int, $limit: Int) {
    domains(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          domain
          dns {
            _id
            label
          }
          cloud {
            _id
            label
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

export const GET_DOMAIN_QUERIES = gql`
  query GET_DOMAIN($id: ID!) {
    domain(id: $id) {
      node {
        _id
        label
        domain
        dns {
          _id
        }
        cloud {
          _id
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

export const CREATE_DOMAIN_MUTATIONS = gql`
  mutation CREATE_DOMAIN($input: DomainInput!) {
    createDomain(input: $input) {
      node {
        _id
        label
        domain
        dns {
          _id
        }
        cloud {
          _id
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

export const UPDATE_DOMAIN_MUTATIONS = gql`
  mutation UPDATE_DOMAIN($id: ID!, $input: DomainInput!) {
    updateDomain(id: $id, input: $input) {
      node {
        _id
        label
        domain
        dns {
          _id
        }
        cloud {
          _id
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

export const DELETE_DOMAIN_MUTATIONS = gql`
  mutation DELETE_DOMAIN($id: ID!) {
    deleteDomain(id: $id) {
      node {
        _id
        label
        domain
        dns {
          _id
        }
        cloud {
          _id
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
