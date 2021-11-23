import React from 'react'
import Link from 'next/link'
import { ActionIcon, Burger, Select, Menu } from '@mantine/core'
import { GearIcon, BellIcon, LockClosedIcon } from '@radix-ui/react-icons'

const HeadNav = ({ navOpen, setNavOpen }) => {
  return (
    <header className="py-4 bg-white border-b border-gray-500">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
        <div className="flex items-center w-full">
          <div className="p-1 sm:mr-5 -ml-1 rounded-md lg:hidden">
            <Burger
              opened={navOpen}
              onClick={() => setNavOpen(!navOpen)}
              title={navOpen ? 'Close navigation' : 'Open navigation'}
            />
          </div>
          <div className="flex justify-center flex-1 mr-4">
            <Select
              className="w-full"
              placeholder="Deploy"
              searchable
              nothingFound="No options"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' }
              ]}
            />
          </div>
        </div>

        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <ActionIcon>
              <BellIcon />
            </ActionIcon>
            <span
              aria-hidden="true"
              className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"
            ></span>
          </li>
          <li className="relative">
            <Menu transition="pop-top-right" placement="end" gutter={1}>
              <Menu.Item icon={<GearIcon />}>Settings</Menu.Item>

              <Menu.Item color="red" icon={<LockClosedIcon />}>
                <Link href="/logout">
                  <a>Logout</a>
                </Link>
              </Menu.Item>
            </Menu>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default HeadNav
