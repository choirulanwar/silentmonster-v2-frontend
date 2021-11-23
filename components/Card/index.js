import { Skeleton } from '@mantine/core'

export const CardGroup = ({ children }) => (
  <div className="grid gap-4 mb-8 grid-cols-2 md:grid-cols-2 xl:grid-cols-4 border-gray-600">
    {children}
  </div>
)

export const CardItem = ({ title, loading, error, value, count }) => (
  <div className="min-w-0 overflow-hidden bg-white">
    <div className="p-4 flex items-center">
      <div>
        <div className="mb-2 text-sm font-medium tracking-wider">{title}</div>
        <div className="text-2xl font-semibold text-blue-600 ">
          {loading ? <Skeleton height={25} /> : value}
        </div>
      </div>
    </div>
  </div>
)
