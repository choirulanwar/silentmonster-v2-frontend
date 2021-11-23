import { gql } from '@apollo/client'
import { PAGE_INFO_FRAGMENT } from '@/graphql/fragments'

export const GET_ADSS_QUERIES = gql`
  query GET_ADSS($page: Int, $limit: Int) {
    adss(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          # code
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

export const GET_ADS_QUERIES = gql`
  query GET_ADS($id: ID!) {
    ads(id: $id) {
      node {
        _id
        label
        code
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_ADS_MUTATIONS = gql`
  mutation CREATE_ADS($input: AdsInput!) {
    createAds(input: $input) {
      node {
        _id
        label
        code
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_ADS_MUTATIONS = gql`
  mutation UPDATE_ADS($id: ID!, $input: AdsInput!) {
    updateAds(id: $id, input: $input) {
      node {
        _id
        label
        code
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_ADS_MUTATIONS = gql`
  mutation DELETE_ADS($id: ID!) {
    deleteAds(id: $id) {
      node {
        _id
        label
        code
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`
