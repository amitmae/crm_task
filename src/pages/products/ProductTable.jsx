import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel
} from '@tanstack/react-table';
import { FaEye, FaTrash } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { generateRoute } from '@utils/utils';
import { PRIVATE_ROUTES } from '@routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '@redux/thunk/productThunk';
import Delete from '@components/ui/modal/Delete';
import Spinner from '@components/ui/loader/Spinner';


const ProductTable = () => {
  const dispatch = useDispatch();
  const{products, loading, total} = useSelector((state)=>state.product);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const selectedProduct = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (id) => {
    selectedProduct.current = id;
    setShowModal(true);
  };

  const closeModal = () => {
    selectedProduct.current = null;
    setShowModal(false);
  };

  const handledelete= () => {
    const id = selectedProduct.current;
    dispatch(deleteProduct(id))
    closeModal();
  };

  useEffect(() => {
    const skip = pagination.pageIndex * pagination.pageSize;
    dispatch(getProducts(`?skip=${skip}&limit=${pagination.pageSize}`));
  }, [dispatch, pagination.pageIndex, pagination.pageSize]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('thumbnail', {
        header: 'Product ',
        cell: info =>
          <span>
            <img src={info?.row?.original?.thumbnail} alt="" className='w-14 h-14' />
          </span>,
      }),
      columnHelper.accessor('title', {
        header: 'Name',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('brand', {
        header: 'Brand',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('price', {
        header: 'Price ($)',
        cell: info => `$${info.getValue()}`,
      }),
      columnHelper.accessor('availabilityStatus', {
        header: 'Status',
        cell: info => 
          <span className={`px-4 py-0.5 rounded-2xl shadow-lg ${info?.row?.original?.availabilityStatus=='Low Stock'?"bg-amber-300":"bg-green-300"}`}>
            {info?.row?.original?.availabilityStatus}
          </span>
          ,
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: info =>
          <div className='flex items-center justify-between'>
           <Link to={generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, {id:info.row.original.id})}>
          <FaEye className='text-blue-900 cursor-pointer' />
        </Link>
        <Link to={generateRoute(PRIVATE_ROUTES.UPDATE_PRODUCT, {id:info.row.original.id})}>
          <AiFillEdit className='text-blue-900 cursor-pointer' />
        </Link>
       
        <span onClick={() => openModal(info.row.original.id)}>
    <FaTrash className='text-blue-900 cursor-pointer' />
  </span>
        
          </div>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    pageCount: Math.ceil(total / pagination.pageSize),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>

    {
      loading ? <Spinner/>:
      <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-200 text-gray-700">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-2 text-left border-b">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 border-b text-sm truncate">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>

        <span>
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
          {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>

        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>

      </div>
      {
        showModal && 
          <Delete
            isOpen={showModal}
        title="product"
        onClose={closeModal}
        onDelete={handledelete}
          />
        
      }
    </div>
    }
    </>
   
  );
};

export default ProductTable;
