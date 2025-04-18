import { flexRender } from '@tanstack/react-table';

const ProductTableHeader = ({ table }) => (

  <thead className="bg-gray-200 text-gray-700">
    {/* Loop through each header group  */}
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {/* Loop through each column header */}
        {headerGroup.headers.map(header => (
          <th key={header.id} className="px-4 py-2 text-left border-b">
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export default ProductTableHeader;
