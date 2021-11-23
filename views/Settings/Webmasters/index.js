import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Button,
  Menu,
  Pagination,
  Breadcrumbs,
  Modal,
  Badge
} from '@mantine/core'
import Layout from '@/layouts/Admin'
import Form from './Form'
import Table from '@/components/Table'
import { providerServiceColor, normalizeDate } from '@/utils/helper'

const View = ({ pageInfo, queries, mutations }) => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)

  const tableRows = queries.webmasters.datas.edges.map(element => (
    <tr key={element.node._id}>
      <td>
        <Link href={`/settings/webmaster/${element.node._id}`}>
          <a>{element.node.label}</a>
        </Link>
      </td>
      <td>
        <Badge
          variant={providerServiceColor[element.node.type].variant}
          gradient={{
            from: providerServiceColor[element.node.type].from,
            to: providerServiceColor[element.node.type].to
          }}
        >
          {element.node.type}
        </Badge>
      </td>
      <td>{element.node.email}</td>
      <td>{normalizeDate(element.node.createdAt)}</td>
      <td>
        <Menu transition="pop-top-right" placement="end" gutter={1}>
          <Menu.Item>
            <Link href={`/settings/webmaster/${element.node._id}`}>
              <a>Edit</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            color="red"
            onClick={async () => {
              if (
                window.confirm('Are you sure you wish to delete this item?')
              ) {
                await mutations.deleteWebmaster(element.node._id)
              }
            }}
          >
            Delete
          </Menu.Item>
        </Menu>
      </td>
    </tr>
  ))

  const breadCrumbsitems = [
    {
      title: 'Dashboard',
      href: '/dashboard'
    },
    { ...pageInfo }
  ].map(item => (
    <Link href={item.href} key={item.href}>
      <a>{item.title}</a>
    </Link>
  ))

  return (
    <Layout title={pageInfo.title}>
      <div className="space-y-3">
        <header>
          <Breadcrumbs className="text-sm text-blue-500 font-medium">
            {breadCrumbsitems}
          </Breadcrumbs>
          <h1 className="text-xl mt-6 mb-2">{pageInfo.title}</h1>
          <div className="flex justify-end items-center">
            <Button onClick={() => setOpened(true)}>Add New</Button>
          </div>
        </header>
        <article className="bg-white">
          <Table
            loading={queries.webmasters.isLoading}
            columns={['Label', 'Type', 'Email', 'Created At', '']}
            rows={tableRows}
          />
        </article>
        <footer className="-mt-2 flex items-center justify-center">
          <Pagination
            page={pageInfo.activePage}
            onChange={page =>
              router.push({
                pathname: '/settings/webmaster',
                query: { page }
              })
            }
            total={queries.webmasters.datas.pageInfo.totalPages}
          />
        </footer>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Add ${pageInfo.title}`}
      >
        <Form {...queries} {...mutations} />
      </Modal>
    </Layout>
  )
}

export default View
