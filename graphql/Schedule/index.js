import { gql } from '@apollo/client'

export const GET_SCHEDULES_QUERIES = gql`
  query GET_SCHEDULES($page: Int, $limit: Int) {
    schedules(page: $page, limit: $limit) {
      edges {
        node {
          _id
          type
          runTime
          data
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

export const GET_SCHEDULE_QUERIES = gql`
  query GET_SCHEDULE($id: ID!) {
    schedule(id: $id) {
      node {
        _id
        type
        runTime
        data
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_SCHEDULE_MUTATIONS = gql`
  mutation CREATE_SCHEDULE($input: ScheduleInput!) {
    createSchedule(input: $input) {
      node {
        _id
        type
        runTime
        data
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_SCHEDULE_MUTATIONS = gql`
  mutation UPDATE_SCHEDULE($id: ID!, $input: ScheduleInput!) {
    updateSchedule(id: $id, input: $input) {
      node {
        _id
        type
        runTime
        data
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_SCHEDULE_MUTATIONS = gql`
  mutation DELETE_SCHEDULE($id: ID!) {
    deleteSchedule(id: $id) {
      node {
        _id
        type
        runTime
        data
        createdBy {
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`
