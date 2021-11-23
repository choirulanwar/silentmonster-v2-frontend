import { adminSSP } from '@/utils/redirects'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  useProjectTemplate,
  useUpdateProjectTemplate
} from '@/hooks/useProjectTemplate'

import { useWebmasters } from '@/hooks/useWebmaster'
import { useDomains } from '@/hooks/useDomain'
import { useGithubs } from '@/hooks/useGithub'
import { useAdss } from '@/hooks/useAds'
import { useKeywords } from '@/hooks/useKeyword'

import View from '@/views/Templates/Projects/Update'

const UpdateForm = props => {
  const updateProjectTemplateMutation = useUpdateProjectTemplate(
    props.variables
  )

  const initialValues = {
    label: props?.projectTemplate?.data?.node?.label || '',
    webmaster: props?.projectTemplate?.data?.node?.webmaster?._id || '',
    domain: props?.projectTemplate?.data?.node?.domain?._id || '',
    github: props?.projectTemplate?.data?.node?.github?._id || '',
    socialBar: props?.projectTemplate?.data?.node?.ads?.socialBar?._id,
    banner300x250: props?.projectTemplate?.data?.node?.ads?.banner300x250?._id,
    banner468x60: props?.projectTemplate?.data?.node?.ads?.banner468x60?._id,
    banner728x90: props?.projectTemplate?.data?.node?.ads?.banner728x90?._id,
    bannerFixed: props?.projectTemplate?.data?.node?.ads?.bannerFixed?._id,
    bannerInArticle:
      props?.projectTemplate?.data?.node?.ads?.bannerInArticle?._id,
    popUnder: props?.projectTemplate?.data?.node?.ads?.popUnder?._id,
    directLink: props?.projectTemplate?.data?.node?.ads?.directLink?._id
  }

  const validationSchema = Yup.object().shape({
    label: Yup.string().required().trim(),
    webmaster: Yup.string().required().trim(),
    domain: Yup.string().required().trim(),
    github: Yup.string().required().trim(),
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
        const {
          socialBar,
          banner300x250,
          banner468x60,
          banner728x90,
          bannerFixed,
          bannerInArticle,
          popUnder,
          directLink,
          ...rest
        } = values

        updateProjectTemplateMutation.updateProjectTemplate({
          id: props?.id,
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
      } catch (e) {
        console.error(e)
      } finally {
        resetForm({})
      }
    }
  })

  return {
    ...form,
    isSubmitting: updateProjectTemplateMutation.isLoading
  }
}

const Page = props => {
  const pageInfo = {
    title: 'Project Template',
    href: `/templates/project/${props?.id}`
  }
  const variables = {
    id: props?.id
  }

  const projectTemplateQuery = useProjectTemplate(variables)
  const vars = { page: 1, limit: 100 }
  const webmastersQuery = useWebmasters(vars)
  const domainsQuery = useDomains(vars)
  const githubsQuery = useGithubs(vars)
  const adssQuery = useAdss(vars)
  const keywordsQuery = useKeywords(vars)

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    UpdateForm({ ...props, projectTemplate: projectTemplateQuery })

  const queries = {
    projectTemplate: projectTemplateQuery,
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
    isSubmitting
  }

  return (
    <View
      pageInfo={pageInfo}
      variables={variables}
      queries={queries}
      mutations={mutations}
    />
  )
}

export const getServerSideProps = async ctx => adminSSP(ctx)
export default Page
