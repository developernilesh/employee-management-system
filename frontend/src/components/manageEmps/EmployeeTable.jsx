import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useTable } from "react-table";

const EmployeeTable = ({emps,deleteEmp}) => {

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
      accessor: (row) => format(new Date(row.createdAt), 'dd-MM-yyyy'),
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => deleteEmp(row.original._id)}>
            <MdDelete className="scale-150" />
          </button>
          <Link to={`/editEmployee/${row.original._id}`}>
            <RiEdit2Fill className="scale-150" />
          </Link>
        </div>
      ),
    },
  ], [deleteEmp]);

  // const tableCol = useMemo(() => tableColumn,[])
  // const tableData = useMemo(() => emps,[emps])

  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable({
    columns: tableColumn,
    data: emps,
  })
    
  return (
    <table className="w-full mb-10" {...getTableProps()}>
      <thead>
        {
          headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()} className="text-center bg-slate-900">
              {
                hg.headers.map((header) => (
                  <th {...header.getHeaderProps()} className="py-3 border border-gray-300">
                    {
                      header.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>

      <tbody {...getTableBodyProps()}>
        {
          rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="text-center bg-slate-800">
                {
                  row.cells.map((cell, cellIndex) => (
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
  );
};


export default EmployeeTable;
