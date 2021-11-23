import { Table as MantineTable, Skeleton } from '@mantine/core'

const TableLoading = () => (
  <div className="w-full space-y-2">
    {Array.from(Array(10)).map((v, i) => (
      <Skeleton height={25} className="w-full" key={i} />
    ))}
  </div>
)

const Table = ({ loading = true, columns, rows }) => {
  return (
    <>
      <MantineTable highlightOnHover>
        <thead className="bg-gray-500">
          <tr>
            {columns.map(label => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </MantineTable>
      {loading && <TableLoading />}
    </>
  )
}

export default Table
