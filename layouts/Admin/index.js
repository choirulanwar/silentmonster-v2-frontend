import React, { useState } from 'react'
import Head from 'next/head'
import SideNav from '@/components/SideNav'
import HeadNav from '@/components/HeadNav'

const AdminLayout = ({ title, children }) => {
  const [toggled, setToggle] = useState(false)

  const handleToggleSidebar = value => {
    setToggle(value)
  }

  return (
    <>
      <Head>
        <title>{title} - SilentMonster</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="flex h-screen bg-gray-50">
        <SideNav toggled={toggled} onToggle={handleToggleSidebar} />
        <div className="flex flex-col flex-1 w-full">
          <HeadNav navOpen={toggled} setNavOpen={handleToggleSidebar} />
          <main className="h-full overflow-y-auto p-4 bg-gray-300">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
