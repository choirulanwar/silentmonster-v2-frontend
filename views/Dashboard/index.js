import Link from 'next/link'
import { Button, Badge } from '@mantine/core'
import { ArrowRightIcon, ExternalLinkIcon } from '@modulz/radix-icons'
import Layout from '@/layouts/Admin'
import { CardGroup, CardItem } from '@/components/Card'
import Table from '@/components/Table'
import { typeSiteColor, conclusionColor, normalizeDate } from '@/utils/helper'

const Dashboard = ({ pageInfo, queries }) => {
  const rows = queries.sites.datas.edges.map(element => (
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
      <td>{normalizeDate(element.node.createdAt)}</td>
      <td>{normalizeDate(element.node.updatedAt)}</td>
      <td>
        {
          <Badge color={conclusionColor[element.node.conclusion]}>
            {element.node.conclusion}
          </Badge>
        }
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

  return (
    <Layout title="Dashboard">
      <CardGroup>
        <CardItem
          title="Domains"
          loading={queries.domains.isLoading}
          value={queries.domains.datas.totalCount}
        />
        <CardItem
          title="Projects"
          loading={queries.projectTemplates.isLoading}
          value={queries.projectTemplates.datas.totalCount}
        />
        <CardItem
          title="Sites"
          loading={queries.sites.isLoading}
          value={queries.sites.datas.totalCount}
        />
        <CardItem
          title="URLs"
          loading={queries.urls.isLoading}
          value={queries.urls.datas.totalCount}
        />
      </CardGroup>

      <div className="space-y-3">
        <header className="text-xl">
          <h2>Recent sites</h2>
        </header>
        <article className="bg-white">
          <Table
            loading={queries.sites.isLoading}
            columns={[
              'Site Title',
              'Type',
              'Deployed At',
              'Last Update',
              'Status',
              ''
            ]}
            rows={rows}
          />
        </article>
        <footer className="-mt-2 flex items-center">
          <Link href="/sites" passHref>
            <Button rightIcon={<ArrowRightIcon />} component="a">
              View all
            </Button>
          </Link>
        </footer>
      </div>
    </Layout>
  )
}

export default Dashboard
