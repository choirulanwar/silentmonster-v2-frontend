import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Badge, Pagination, Menu, Breadcrumbs } from '@mantine/core'
import { ArrowRightIcon, ExternalLinkIcon } from '@modulz/radix-icons'
import Layout from '@/layouts/Admin'
import Table from '@/components/Table'
import { taskTypeColor, conclusionColor, normalizeDate } from '@/utils/helper'
import Timeline from '@/components/Timeline'

const View = ({ pageInfo, queries }) => {
  const router = useRouter()

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
      title: 'Site',
      href: `/sites/${queries.job?.data?.node?.siteId}`
    },
    {
      title: 'Tasks',
      href: `/sites/${queries.job?.data?.node?.siteId}/tasks`
    },
    {
      ...pageInfo
    }
  ].map(item => (
    <Link href={item.href} key={item.href}>
      <a>{item.title}</a>
    </Link>
  ))

  return (
    <Layout title={pageInfo.title}>
      <div className="space-y-3">
        <header className="text-xl">
          <Breadcrumbs className="text-sm text-blue-500 font-medium">
            {breadCrumbsitems}
          </Breadcrumbs>
          <h1 className="text-xl mt-6 mb-2">{pageInfo.title}</h1>
        </header>
        <article className="bg-white p-2">
          <Timeline
            active={queries.job.currentStep}
            loading={queries.job.isLoading}
            datas={queries.job?.data?.node?.steps}
          />
          {!queries.job.isLoading && (
            <div className="my-6">
              <Link
                href={`/sites/${queries.job?.data?.node?.siteId}/tasks`}
                passHref
              >
                <Button variant="white" component="a">
                  View all tasks
                </Button>
              </Link>
            </div>
          )}
        </article>
      </div>
    </Layout>
  )
}

export default View
