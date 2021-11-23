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
import { RocketIcon } from '@modulz/radix-icons'
import Layout from '@/layouts/Admin'
import Form from './CreateTemplateForm'
import DeployForm from './DeployForm'
import Table from '@/components/Table'
import { providerServiceColor, normalizeDate } from '@/utils/helper'

const View = ({ pageInfo, queries, mutations }) => {
  const router = useRouter()
  const [openedCreateModal, setOpenedCreateModal] = useState(false)
  const [openedDeployModal, setOpenedDeployModal] = useState(false)

  const tableRows = queries.projectTemplates.datas.edges.map(element => (
    <tr key={element.node._id}>
      <td>
        <Link href={`/templates/project/${element.node._id}`}>
          <a>{element.node.label}</a>
        </Link>
      </td>
      <td>
        <Link href={`/settings/domain/${element.node.domain._id}`}>
          <a>{element.node.domain.domain}</a>
        </Link>
      </td>
      <td>{normalizeDate(element.node.createdAt)}</td>
      <td>
        <Button
          size="xs"
          leftIcon={<RocketIcon />}
          variant="white"
          color="teal"
          compact
          onClick={() => {
            mutations.setTemplateId(element.node._id)
            setOpenedDeployModal(true)
          }}
        >
          Deploy
        </Button>
      </td>
      <td>
        <Menu transition="pop-top-right" placement="end" gutter={1}>
          <Menu.Item>
            <Link href={`/templates/project/${element.node._id}`}>
              <a>Edit</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            color="red"
            onClick={async () => {
              if (
                window.confirm('Are you sure you wish to delete this item?')
              ) {
                await mutations.deleteProjectTemplate(element.node._id)
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
            <Button onClick={() => setOpenedCreateModal(true)}>Add New</Button>
          </div>
        </header>
        <article className="bg-white">
          <Table
            loading={queries.projectTemplates.isLoading}
            columns={['Label', 'Domain', 'Created At', '', ' ']}
            rows={tableRows}
          />
        </article>
        <footer className="-mt-2 flex items-center justify-center">
          <Pagination
            page={pageInfo.activePage}
            onChange={page =>
              router.push({
                pathname: '/templates/project',
                query: { page }
              })
            }
            total={queries.projectTemplates.datas.pageInfo.totalPages}
          />
        </footer>
      </div>
      <Modal
        opened={openedCreateModal}
        onClose={() => setOpenedCreateModal(false)}
        title="Add Project Template"
      >
        <Form {...queries} {...mutations} />
      </Modal>
      <Modal
        opened={openedDeployModal}
        onClose={() => setOpenedDeployModal(false)}
        title="Deploy New Site"
      >
        <DeployForm {...queries} {...mutations} />
      </Modal>
    </Layout>
  )
}

export default View
