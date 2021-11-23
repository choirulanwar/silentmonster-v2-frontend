import { gql } from '@apollo/client'
import { PAGE_INFO_FRAGMENT } from '@/graphql/fragments'

export const GET_DNSS_QUERIES = gql`
  query GET_DNSS($page: Int, $limit: Int) {
    dnss(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          type
          email
          # token
          # zoneId
          # ip
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

export const GET_DNS_QUERIES = gql`
  query GET_DNS($id: ID!) {
    dns(id: $id) {
      node {
        _id
        label
        type
        email
        token
        zoneId
        ip
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const GET_ZONES_QUERIES = gql`
  query GET_ZONES($id: ID!) {
    zones(id: $id) {
      name
      originalNameserver
      originalRegistrar
      originalDNSHost
      nameserver
      status
      createdAt
      modifiedAt
      activatedAt
    }
  }
`

export const CREATE_DNS_MUTATIONS = gql`
  mutation CREATE_DNS($input: DNSInput!) {
    createDns(input: $input) {
      node {
        _id
        label
        type
        email
        token
        zoneId
        ip
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_DNS_MUTATIONS = gql`
  mutation UPDATE_DNS($id: ID!, $input: DNSInput!) {
    updateDns(id: $id, input: $input) {
      node {
        _id
        label
        type
        email
        token
        zoneId
        ip
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_DNS_MUTATIONS = gql`
  mutation DELETE_DNS($id: ID!) {
    deleteDns(id: $id) {
      node {
        _id
        label
        type
        email
        token
        zoneId
        ip
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`
