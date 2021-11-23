import { gql } from '@apollo/client'

export const GET_JOBS_QUERIES = gql`
  query GET_JOBS($siteId: ID!, $page: Int, $limit: Int, $orderType: OrderType) {
    jobs(siteId: $siteId, page: $page, limit: $limit, orderType: $orderType) {
      edges {
        node {
          _id
          siteId
          label
          status
          conclusion
          steps {
            _id
            jobId
            id
            label
            number
            status
            conclusion
            startedAt
            completedAt
            createdAt
            updatedAt
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

export const GET_JOB_QUERIES = gql`
  query GET_JOB($id: ID!) {
    job(id: $id) {
      node {
        _id
        siteId
        label
        status
        conclusion
        steps {
          _id
          jobId
          id
          label
          number
          status
          conclusion
          startedAt
          completedAt
          createdAt
          updatedAt
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

export const ON_JOB_UPDATE_SUBSCRIPTION = gql`
  subscription ON_JOB_UPDATE($siteId: ID!, $jobId: ID) {
    onJobUpdate(siteId: $siteId, jobId: $jobId) {
      node {
        label
        status
        conclusion
      }
    }
  }
`

export const ON_STEP_PROGRESS_SUBSCRIPTION = gql`
  subscription ON_STEP_PROGRESS($siteId: ID!, $jobId: ID) {
    onStepProgress(siteId: $siteId, jobId: $jobId) {
      node {
        id
        message
        siteId
      }
    }
  }
`

export const ON_STEP_UPDATE_SUBSCRIPTION = gql`
  subscription ON_STEP_UPDATE($siteId: ID!, $jobId: ID) {
    onStepUpdate(siteId: $siteId, jobId: $jobId) {
      node {
        id
        status
        startedAt
        completedAt
        conclusion
        siteId
      }
    }
  }
`
