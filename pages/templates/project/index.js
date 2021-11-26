import { useState } from 'react'
import { useRouter } from 'next/router'
import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  useProjectTemplates,
  useCreateProjectTemplate,
  useDeleteProjectTemplate,
  useDeploySite
} from '@/hooks/useProjectTemplate'

import { useWebmasters } from '@/hooks/useWebmaster'
import { useDomains } from '@/hooks/useDomain'
import { useGithubs } from '@/hooks/useGithub'
import { useAdss } from '@/hooks/useAds'
import { useKeywords } from '@/hooks/useKeyword'

import View from '@/views/Templates/Projects'

import { sleep } from '@/utils/helper'

const CreateAndDeployForm = props => {
  const router = useRouter()

  const variables = {
    page: props?.page || 1,
    limit: props?.limit || 10
  }
  const createProjectTemplateMutation = useCreateProjectTemplate(variables)
  const deploySiteMutation = useDeploySite(variables)

  const initialValues = {
    label: '',
    webmaster: '',
    domain: '',
    github: '',
    type: '',
    keyword: '',
    hostname: '',
    title: '',
    description: '',
    tagline: '',
    theme: '',
    gtm: '',
    histats: '',
    initPostCount: '',
    postPerDay: '',
    socialBar: '',
    banner300x250: '',
    banner468x60: '',
    banner728x90: '',
    bannerFixed: '',
    bannerInArticle: '',
    popUnder: '',
    directLink: ''
  }

  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    webmaster: Yup.string().when('type', {
      is: v => !v,
      then: Yup.string().required(),
      otherwise: Yup.string()
    }),
    domain: Yup.string().when('type', {
      is: v => !v,
      then: Yup.string().required(),
      otherwise: Yup.string()
    }),
    github: Yup.string().when('type', {
      is: v => !v,
      then: Yup.string().required(),
      otherwise: Yup.string()
    }),
    type: Yup.string(),
    keyword: Yup.string().when('type', {
      is: v => v,
      then: Yup.string().required()
    }),
    hostname: Yup.string().trim(),
    title: Yup.string().when('type', {
      is: v => v,
      then: Yup.string().required().trim()
    }),
    description: Yup.string().when('type', {
      is: v => v,
      then: Yup.string().required().trim()
    }),
    tagline: Yup.string().when('type', {
      is: v => v,
      then: Yup.string().required().trim()
    }),
    theme: Yup.string().when('type', {
      is: v => v,
      then: Yup.string().required()
    }),
    gtm: Yup.string().trim(),
    histats: Yup.string().trim(),
    initPostCount: Yup.number().when('type', {
      is: v => v,
      then: Yup.number().required()
    }),
    postPerDay: Yup.number().when('type', {
      is: v => v,
      then: Yup.number().required()
    }),
    socialBar: Yup.string().trim(),
    banner300x250: Yup.string().trim(),
    banner468x60: Yup.string().trim(),
    banner728x90: Yup.string().trim(),
    bannerFixed: Yup.string().trim(),
    bannerInArticle: Yup.string().trim(),
    popUnder: Yup.string().trim(),
    directLink: Yup.string().trim()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!values.type) {
          createProjectTemplateMutation.createProjectTemplate({
            input: {
              label: values.label,
              webmaster: values.webmaster,
              domain: values.domain,
              github: values.github,
              ads: {
                socialBar: values.socialBar,
                banner300x250: values.banner300x250,
                banner468x60: values.banner468x60,
                banner728x90: values.banner728x90,
                bannerFixed: values.bannerFixed,
                bannerInArticle: values.bannerInArticle,
                popUnder: values.popUnder,
                directLink: values.directLink
              }
            }
          })
        } else {
          deploySiteMutation.deploySite({
            id: props.templateId,
            input: {
              label: values.label,
              type: values.type,
              keyword: values.keyword,
              hostname: values.hostname,
              title: values.title,
              description: values.description,
              tagline: values.tagline,
              theme: values.theme,
              gtm: values.gtm,
              histats: values.histats,
              initPostCount: values.initPostCount,
              postPerDay: values.postPerDay,
              manualTrigger: true
            }
          })
          resetForm({})
          await sleep(3000)
          if (deploySiteMutation.result?.deployNewSite) {
            router.push(
              `/sites/${deploySiteMutation.result.deployNewSite.node._id}/tasks`
            )
          } else {
            router.push('/sites')
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        resetForm({})
      }
    }
  })

  return {
    ...form,
    variables,
    isSubmitting: createProjectTemplateMutation.isLoading
  }
}

const Page = props => {
  const [templateId, setTemplateId] = useState(null)

  const pageInfo = {
    title: 'Project Templates',
    href: '/templates/project',
    activePage: props?.page || 1
  }

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    variables,
    isSubmitting
  } = CreateAndDeployForm({ ...props, templateId })

  const projectTemplatesQuery = useProjectTemplates(variables)
  const deleteProjectTemplateMutation = useDeleteProjectTemplate(variables)

  const vars = { page: 1, limit: 100 }
  const webmastersQuery = useWebmasters(vars)
  const domainsQuery = useDomains(vars)
  const githubsQuery = useGithubs(vars)
  const adssQuery = useAdss(vars)
  const keywordsQuery = useKeywords(vars)

  const queries = {
    projectTemplates: projectTemplatesQuery,
    webmasters: webmastersQuery,
    domains: domainsQuery,
    githubs: githubsQuery,
    adss: adssQuery,
    keywords: keywordsQuery
  }

  const mutations = {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    deleteProjectTemplate: async id => {
      try {
        await deleteProjectTemplateMutation.deleteProjectTemplate({ id })
      } catch (e) {
        console.error(e)
      }
    },
    setTemplateId
  }

  return <View pageInfo={pageInfo} queries={queries} mutations={mutations} />
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
