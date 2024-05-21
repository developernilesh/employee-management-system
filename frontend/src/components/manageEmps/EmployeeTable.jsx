import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { FaAngleLeft, FaAngleRight, FaAnglesRight,FaAnglesLeft } from "react-icons/fa6"
import Tooltip from "../Tooltip";

const EmployeeTable = ({emps,deleteEmp}) => {
  const [pgVal,setPgVal] = useState(1)
  
  const tableColumn = useMemo(() => [
    {
      Header: "Sl.No.",
      accessor: (_, index) => index + 1,
    },
    {
      Header: "Full Name",
      accessor: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Phone",
      accessor: "phn"
    },
    {
      Header: "Gender",
      accessor: "gender"
    },
    {
      Header: "Country",
      accessor: "country"
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        const statusClass = value === "Working" 
          ? "px-2 py-1 rounded-full bg-green-600 text-white" 
          : "px-2 py-1 rounded-full bg-red-500 text-white";
        return <span className={statusClass}>{value}</span>;
      },
    },
    {
      Header: "Added On",
      accessor: "createdAt",
      Cell: ({ value }) => format(new Date(value), "dd-MM-yyyy"),
    },
    {
      Header: "Actions",
      accessor: "_id",
      Cell: ({ value }) => (
        <div className="flex items-center justify-center gap-4">
          <Link to={`/editEmployee/${value}`}>
            <Tooltip message="Edit">
              <RiEdit2Fill className="w-6 h-6 text-blue-500 cursor-pointer" />
            </Tooltip>
          </Link>
          <button onClick={() => deleteEmp(value)}>
            <Tooltip message="Delete">
              <MdDelete className="w-6 h-6 text-red-500 cursor-pointer" />
            </Tooltip>
          </button>
        </div>
      ),
    },
  ], [deleteEmp]);

  // const tableCol = useMemo(() => tableColumn,[])
  // const tableData = useMemo(() => emps,[emps])

  const {
    getTableProps, getTableBodyProps, headerGroups, page, prepareRow, pageOptions, setPageSize,state, setGlobalFilter,
    gotoPage, previousPage, nextPage, pageCount, state: { pageIndex, pageSize }, canPreviousPage, canNextPage
  } = useTable(
    {
    columns: tableColumn,
    data: emps,
    initialState: {pageIndex:0,pageSize: 5}
    },
    useGlobalFilter,useSortBy,usePagination
  )

  const {globalFilter} = state

  const moveToPg = (e) => {
    const newPage = Number(e.target.value);
    setPgVal(newPage);
    gotoPage(newPage - 1);
  }
    
  return (
    <div className="w-full mb-10">
      <div className="w-full flex justify-start">
        <input type="text" value={globalFilter || ""} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search here 🔍"
          className="z-10 text-base font-medium text-center text-gray-100 bg-slate-700 mb-3 py-2 rounded-md"
        />
      </div>
      <table className="w-full overflow-auto" {...getTableProps()}>
      <thead>
        {
          headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()} className="text-center bg-slate-900">
              {
                hg.headers.map((header) => (
                  <th {...header.getHeaderProps(header.getSortByToggleProps())} 
                  className="py-3 border border-gray-300">
                    { header.render("Header") }
                    {header.isSorted ? (header.isSortedDesc ? "🔽" : "🔼") : ""}
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>

      <tbody {...getTableBodyProps()}>
        {
          page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="text-center bg-slate-800 transition-all ease-linear duration-200">
                {
                  row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="py-3 border-x border-b border-gray-500">
                      {cell.render("Cell")}
                    </td>
                  ))
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
    
    <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0 pt-10">
          <div className="flex items-center gap-1 text-white bg-slate-700 px-3 py-1 rounded-md">
            <span>Page</span>
            <span>{pageIndex+1}</span>
            <span>of</span>
            <span>{pageOptions.length}</span>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-2 lg:gap-6 text-gray-200">
            <div className="bg-slate-700 outline-none px-3 py-1 rounded-md">
              Rows per page{" : "}
              <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-slate-700 outline-none ">
                {
                  ([5,10,15,20]).map( pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="bg-slate-700 pl-3 rounded-md px-3 py-1 flex items-center">
              <span>Go to Page{" : "}</span>
              <select value={pgVal} onChange={moveToPg}
              className="bg-slate-700 outline-none ">
                {pageOptions.map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        
          <div className="flex gap-6">
            <div className="flex gap-2">
              <Tooltip message="First Page">
                <button
                onClick={() => gotoPage(0)} 
                disabled={!canPreviousPage} 
                className="text-white bg-slate-700 active:ring-2 active:ring-offset-2 active:ring-offset-slate-950 active:ring-slate-600 
                disabled:cursor-not-allowed disabled:opacity-50 disabled:ring-0 outline-none font-medium rounded-md text-sm px-2 py-2 text-center"
                >
                  <FaAnglesLeft/>
                </button>
              </Tooltip>

              <Tooltip message="Previous Page">
                <button
                onClick={() => previousPage()} 
                disabled={!canPreviousPage} 
                className="text-white bg-slate-700 active:ring-2 active:ring-offset-2 active:ring-offset-slate-950 active:ring-slate-600 
                disabled:cursor-not-allowed disabled:opacity-50 disabled:ring-0 outline-none font-medium rounded-md text-sm px-2 py-2 text-center"
                >
                  <FaAngleLeft/>
                </button>
              </Tooltip>
            </div>

            <div className="flex gap-2">
              <Tooltip message="Next Page">
                <button
                onClick={() => nextPage()} disabled={!canNextPage}
                className="text-white bg-slate-700 active:ring-2 active:ring-offset-2 active:ring-offset-slate-950 active:ring-slate-600 
                disabled:cursor-not-allowed disabled:opacity-50 disabled:ring-0 outline-none font-medium rounded-md text-sm px-2 py-2 text-center"
                >
                  <FaAngleRight/>
                </button>
              </Tooltip>

              <Tooltip message="Last Page">
                <button
                onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} 
                className="text-white bg-slate-700 active:ring-2 active:ring-offset-2 active:ring-offset-slate-950 active:ring-slate-600 
                disabled:cursor-not-allowed disabled:opacity-50 disabled:ring-0 outline-none font-medium rounded-md text-sm px-2 py-2 text-center"
                >
                  <FaAnglesRight/>
                </button>
              </Tooltip>
            </div>
          </div>
      </div>
    </div>
  );
};


export default EmployeeTable;
