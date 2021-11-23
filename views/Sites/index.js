import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Badge, Pagination, Menu, Breadcrumbs } from '@mantine/core'
import { ExternalLinkIcon } from '@modulz/radix-icons'
import Layout from '@/layouts/Admin'
import Table from '@/components/Table'
import { typeSiteColor, conclusionColor, normalizeDate } from '@/utils/helper'

const View = ({ pageInfo, queries, mutations }) => {
  const router = useRouter()

  const tableRows = queries.sites.datas.edges.map(element => (
    <tr key={element.node._id}>
      <td>
        <Link href={`/sites/${element.node._id}`}>
          <a>{element.node.title}</a>
        </Link>
      </td>
      <td>
        {
          <Badge
            variant={typeSiteColor[element.node.type].variant}
            gradient={{
              from: typeSiteColor[element.node.type].from,
              to: typeSiteColor[element.node.type].to
            }}
          >
            {element.node.type}
          </Badge>
        }
      </td>
      <td>{element.node.template.domain.domain}</td>
      <td>
        <Link href={`/templates/project/${element.node.template._id}`}>
          <a>{element.node.template.label}</a>
        </Link>
      </td>
      <td>{normalizeDate(element.node.createdAt)}</td>
      <td>{normalizeDate(element.node.updatedAt)}</td>
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
            <Link href={`/sites/${element.node._id}`}>
              <a>Details</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            color="red"
            onClick={async () => {
              if (
                window.confirm('Are you sure you wish to delete this item?')
              ) {
                await mutations.deleteSite(element.node._id)
              }
            }}
          >
            Delete
          </Menu.Item>
        </Menu>
      </td>
      <td>
        <a
          target="_blank"
          href={`https://${
            element.node.hostname && element.node.hostname + '.'
          }${element.node.template.domain.domain}/`}
          rel="noopener noreferrer"
        >
          <Button variant="white" compact={true}>
            <ExternalLinkIcon />
          </Button>
        </a>
      </td>
    </tr>
  ))

  const breadCrumbsitems = [
    {
      title: 'Dashboard',
      href: '/dashboard'
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
            loading={queries.sites.isLoading}
            columns={[
              'Site Title',
              'Type',
              'Domain',
              'Template',
              'Deployed At',
              'Last Update',
              'Status',
              '',
              ' '
            ]}
            rows={tableRows}
          />
        </article>
        <footer className="-mt-2 flex items-center justify-center">
          <Pagination
            page={pageInfo.activePage}
            onChange={page =>
              router.push({
                pathname: '/sites',
                query: { page }
              })
            }
            total={queries.sites.datas.pageInfo.totalPages}
          />
        </footer>
      </div>
    </Layout>
  )
}

export default View
