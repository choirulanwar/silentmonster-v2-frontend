import Link from 'next/link'
import {
  Breadcrumbs,
  Button,
  Skeleton,
  SimpleGrid,
  Badge,
  Tabs,
  Tab
} from '@mantine/core'
import { ExternalLinkIcon } from '@modulz/radix-icons'
import Layout from '@/layouts/Admin'
import Timeline from '@/components/Timeline'
import {
  normalizeDate,
  normalizeDuration,
  typeSiteColor,
  conclusionColor,
  formatDate
} from '@/utils/helper'

const Details = ({ pageInfo, queries }) => {
  const breadCrumbsitems = [
    {
      title: 'Dashboard',
      href: '/dashboard'
    },
    {
      title: 'Sites',
      href: '/sites'
    },
    {
      ...pageInfo
    }
  ].map(item => (
    <Link href={item.href} key={item.href}>
      <a>{item.title}</a>
    </Link>
  ))

  const siteInfoLoading = () => (
    <div className="w-full space-y-2">
      {Array.from(Array(10)).map((v, i) => (
        <Skeleton
          height={25}
          width={Math.floor(Math.random() * 123) + 35}
          key={i}
        />
      ))}
    </div>
  )

  return (
    <Layout title={pageInfo.title}>
      <div className="space-y-3">
        <header>
          <Breadcrumbs className="text-sm text-blue-500 font-medium">
            {breadCrumbsitems}
          </Breadcrumbs>
          <h1 className="text-xl mt-6 mb-2">{pageInfo.title}</h1>
        </header>
        <Tabs>
          <Tab label="Info">
            <div className="p-2 text-sm">
              {queries.site.isLoading ? (
                <div className="w-full space-y-2">
                  {Array.from(Array(10)).map((v, i) => (
                    <Skeleton height={25} className="w-96" key={i} />
                  ))}
                </div>
              ) : (
                <article className="space-y-3">
                  <div className="text-sm">
                    Type:{' '}
                    {
                      <Badge
                        variant={
                          typeSiteColor[queries.site.data.node.type].variant
                        }
                        gradient={{
                          from: typeSiteColor[queries.site.data.node.type].from,
                          to: typeSiteColor[queries.site.data.node.type].to
                        }}
                      >
                        {queries.site.data.node.type}
                      </Badge>
                    }
                  </div>
                  <div className="text-sm">
                    Title: {queries.site.data.node.title}
                  </div>
                  <div className="text-sm">
                    Description: {queries.site.data.node.description}
                  </div>
                  <div className="text-sm">
                    Tagline: {queries.site.data.node.tagline}
                  </div>
                  <div className="text-sm">
                    Theme: {queries.site.data.node.theme.label}
                  </div>
                  <div className="text-sm">
                    Init post count: {queries.site.data.node.initPostCount}
                  </div>
                  <div className="text-sm">
                    Post per day: {queries.site.data.node.postPerDay}
                  </div>
                  <div className="text-sm">
                    URL:{' '}
                    <a
                      target="_blank"
                      href={`https://${
                        queries.site.data.node.hostname &&
                        queries.site.data.node.hostname + '.'
                      }${queries.site.data.node.template.domain.domain}/`}
                      rel="noopener noreferrer"
                      className="text-blue-500 font-medium"
                    >
                      {`https://${
                        queries.site.data.node.hostname &&
                        queries.site.data.node.hostname + '.'
                      }${queries.site.data.node.template.domain.domain}/`}
                    </a>
                  </div>
                  <div className="text-sm">
                    Deployed at:{' '}
                    {normalizeDate(queries.site.data.node.createdAt)}
                    {` (${formatDate(queries.site.data.node.createdAt)})`}
                  </div>
                  <div className="text-sm">
                    Deployment status:{' '}
                    {queries.site.data.node.conclusion ? (
                      <Badge
                        color={
                          conclusionColor[queries.site.data.node.conclusion]
                        }
                      >
                        {queries.site.data.node.conclusion}
                      </Badge>
                    ) : (
                      <Badge color={conclusionColor['QUEUE']}>PENDING</Badge>
                    )}
                  </div>
                  <div className="text-sm">
                    Last update:{' '}
                    {normalizeDate(queries.site.data.node.updatedAt)}
                    {` (${formatDate(queries.site.data.node.updatedAt)})`}
                  </div>
                </article>
              )}
            </div>
          </Tab>
          <Tab label="Recent tasks">
            <article className="bg-white p-2">
              <Timeline
                active={queries.job.currentStep}
                loading={queries.job.isLoading}
                datas={queries.job.data.node?.steps}
              />
              {!queries.job.isLoading && (
                <div className="my-6">
                  <Link
                    href={`/sites/${queries?.site?.data?.node?._id}/tasks`}
                    passHref
                  >
                    <Button variant="white" component="a">
                      View all tasks
                    </Button>
                  </Link>
                </div>
              )}
            </article>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Details
