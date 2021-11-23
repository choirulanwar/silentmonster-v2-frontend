import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Badge, Pagination, Menu, Breadcrumbs } from '@mantine/core'
import { ArrowRightIcon, ExternalLinkIcon } from '@modulz/radix-icons'
import Layout from '@/layouts/Admin'
import Table from '@/components/Table'
import { taskTypeColor, conclusionColor, normalizeDate } from '@/utils/helper'

const View = ({ pageInfo, queries }) => {
  const router = useRouter()

  const tableRows = queries.jobs.datas.edges.map(element => (
    <tr key={element.node._id}>
      <td>
        <Link
          href={`/sites/${queries.jobs?.datas.edges?.[0].node.siteId}/tasks/${element.node._id}`}
          passHref
        >
          <Badge
            variant={taskTypeColor[element.node.label].variant}
            gradient={{
              from: taskTypeColor[element.node.label].from,
              to: taskTypeColor[element.node.label].to
            }}
          >
            {element.node.label}
          </Badge>
        </Link>
      </td>
      <td>{normalizeDate(element.node.createdAt)}</td>
      <td>
        <Badge color={conclusionColor[element.node.status]}>
          {element.node.status}
        </Badge>
      </td>
      <td>
        {element.node.conclusion ? (
          <Badge color={conclusionColor[element.node.conclusion]}>
            {element.node.conclusion}
          </Badge>
        ) : (
          <Badge color={conclusionColor['QUEUE']}>PENDING</Badge>
        )}
      </td>
      <td>
        <Menu transition="pop-top-right" placement="end" gutter={1}>
          <Menu.Item>
            <Link
              href={`/sites/${queries.jobs?.datas.edges?.[0].node.siteId}/tasks/${element.node._id}`}
            >
              <a>Details</a>
            </Link>
          </Menu.Item>
          {/* <Menu.Item
            color="red"
            onClick={async () => {
              if (
                window.confirm('Are you sure you wish to delete this item?')
              ) {
                await mutations.deleteAds(element.node._id)
              }
            }}
          >
            Delete
          </Menu.Item> */}
        </Menu>
      </td>
    </tr>
  ))

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
      href: `/sites/${queries.jobs?.datas.edges?.[0]?.node?.siteId}`
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
        <article className="bg-white">
          <Table
            loading={queries.jobs.isLoading}
            columns={['Type', 'Queued at', 'Status', 'Conclusion', '']}
            rows={tableRows}
          />
        </article>
        <footer className="-mt-2 flex items-center justify-center">
          <Pagination
            page={pageInfo.activePage}
            onChange={page =>
              router.push({
                pathname: `/sites/[id]/tasks`,
                query: { id: queries.jobs?.datas.edges?.[0].node.siteId, page }
              })
            }
            total={queries.jobs.datas.pageInfo.totalPages}
          />
        </footer>
      </div>
    </Layout>
  )
}

export default View
