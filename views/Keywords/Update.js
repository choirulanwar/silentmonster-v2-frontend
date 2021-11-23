import Link from 'next/link'
import { Breadcrumbs, LoadingOverlay } from '@mantine/core'
import Layout from '@/layouts/Admin'
import Form from './Form'

const View = ({ pageInfo, queries, mutations }) => {

  const breadCrumbsitems = [
    {
      title: 'Dashboard',
      href: '/dashboard'
    },
    {
      title: 'Keywords',
      href: '/keywords'
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
        <header>
          <Breadcrumbs className="text-sm text-blue-500 font-medium">
            {breadCrumbsitems}
          </Breadcrumbs>
          <h1 className="text-xl mt-6 mb-2">{pageInfo.title}</h1>
        </header>
        <article className="bg-white">
          {queries.keyword.isLoading ? (
            <LoadingOverlay visible={true} />
          ) : (
            <Form {...queries} {...mutations} />
          )}
        </article>
      </div>
    </Layout>
  )
}

export default View
