import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./table.css";
const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []); // this is the first way to memoize the columns and data and it is the recommended way to do it

  // const columns = useMemo(() => GROUPED_COLUMNS, []); // This is the second way to memoize the columns and data and it is the recommended way to do it .
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 }, // this is the initial state of the table
    },
    usePagination // this is the hook that we use to implement pagination in our table
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    prepareRow,
  } = tableInstance;
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="controls">
        <span>
          Page{" "}
          <strong>
            {tableInstance.state.pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
        {/* // this is the code for the input that we will use to navigate through the pages  */}
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={tableInstance.state.pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        {/* // this is the code for the dropdown that we will use to change the number of rows per page */}
        <select
          value={tableInstance.state.pageSize}
          onChange={(e) => tableInstance.setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

        {/* // this is the code for the buttons that we will use to navigate through the pages  */}
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
