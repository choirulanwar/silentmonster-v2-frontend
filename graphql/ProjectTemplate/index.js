import { gql } from '@apollo/client'

export const GET_PROJECT_TEMPLATES_QUERIES = gql`
  query GET_PROJECT_TEMPLATES($page: Int, $limit: Int) {
    projectTemplates(page: $page, limit: $limit) {
      edges {
        node {
          _id
          label
          cron
          timezone
          webmaster {
            _id
          }
          domain {
            _id
            label
            domain
          }
          # cloud {
          #   _id
          # }
          github {
            _id
          }
          server {
            _id
          }
          ads {
            socialBar {
              _id
            }
            banner300x250 {
              _id
            }
            banner468x60 {
              _id
            }
            banner728x90 {
              _id
            }
            bannerFixed {
              _id
            }
            bannerInArticle {
              _id
            }
            popUnder {
              _id
            }
            directLink {
              _id
            }
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

export const GET_PROJECT_TEMPLATE_QUERIES = gql`
  query GET_PROJECT_TEMPLATE($id: ID!) {
    projectTemplate(id: $id) {
      node {
        _id
        label
        cron
        timezone
        webmaster {
          _id
        }
        domain {
          _id
        }
        # cloud {
        #   _id
        # }
        github {
          _id
        }
        server {
          _id
        }
        post {
          _id
        }
        ads {
          socialBar {
            _id
          }
          banner300x250 {
            _id
          }
          banner468x60 {
            _id
          }
          banner728x90 {
            _id
          }
          bannerFixed {
            _id
          }
          bannerInArticle {
            _id
          }
          popUnder {
            _id
          }
          directLink {
            _id
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

export const CREATE_PROJECT_TEMPLATE_MUTATIONS = gql`
  mutation CREATE_PROJECT_TEMPLATE($input: ProjectTemplateInput!) {
    createProjectTemplate(input: $input) {
      node {
        _id
        label
        cron
        timezone
        webmaster {
          _id
        }
        domain {
          _id
        }
        # cloud {
        #   _id
        # }
        github {
          _id
        }
        server {
          _id
        }
        post {
          _id
        }
        createdBy {
          _id
        }
        ads {
          socialBar {
            _id
          }
          banner300x250 {
            _id
          }
          banner468x60 {
            _id
          }
          banner728x90 {
            _id
          }
          bannerFixed {
            _id
          }
          bannerInArticle {
            _id
          }
          popUnder {
            _id
          }
          directLink {
            _id
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_PROJECT_TEMPLATE_MUTATIONS = gql`
  mutation UPDATE_PROJECT_TEMPLATE($id: ID!, $input: ProjectTemplateInput!) {
    updateProjectTemplate(id: $id, input: $input) {
      node {
        _id
        label
        cron
        timezone
        webmaster {
          _id
        }
        domain {
          _id
        }
        # cloud {
        #   _id
        # }
        github {
          _id
        }
        server {
          _id
        }
        post {
          _id
        }
        createdBy {
          _id
        }
        ads {
          socialBar {
            _id
          }
          banner300x250 {
            _id
          }
          banner468x60 {
            _id
          }
          banner728x90 {
            _id
          }
          bannerFixed {
            _id
          }
          bannerInArticle {
            _id
          }
          popUnder {
            _id
          }
          directLink {
            _id
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_PROJECT_TEMPLATE_MUTATIONS = gql`
  mutation DELETE_PROJECT_TEMPLATE($id: ID!) {
    deleteProjectTemplate(id: $id) {
      node {
        _id
        label
        cron
        timezone
        webmaster {
          _id
        }
        domain {
          _id
        }
        # cloud {
        #   _id
        # }
        github {
          _id
        }
        server {
          _id
        }
        post {
          _id
        }
        createdBy {
          _id
        }
        ads {
          socialBar {
            _id
          }
          banner300x250 {
            _id
          }
          banner468x60 {
            _id
          }
          banner728x90 {
            _id
          }
          bannerFixed {
            _id
          }
          bannerInArticle {
            _id
          }
          popUnder {
            _id
          }
          directLink {
            _id
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const DEPLOY_NEW_SITE_MUTATIONS = gql`
  mutation DEPLOY_NEW_SITE($id: ID!, $input: DeployProjectInput!) {
    deployNewSite(id: $id, input: $input) {
      node {
        _id
        label
        type
        hostname
        keyword {
          _id
        }
        theme {
          _id
        }
        template {
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
