import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table"; // useGlobalFilter is used to filter table globally
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./table.css";
import GlobalFilter from "./GlobalFilter";
import  ColumnFilter  from "./ColumnFilter";

const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []); // this is the first way to memoize the columns and data and it is the recommended way to do it

  // const columns = useMemo(() => GROUPED_COLUMNS, []); // This is the second way to memoize the columns and data and it is the recommended way to do it .
  const data = useMemo(() => MOCK_DATA, []);

  //
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance; // this is the table instance that we get from the useTable hook and we can destructure the properties from it that we need to build our table with react-table library and we can pass these properties to the elements that we want to render in our table like the table body, table rows, table cells, table headers and table footers.

  const { globalFilter } = state;
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {" "}
          {/* // this is the body of the table where we will loop through the rows and cells and render the data in the table */}
          {rows.map((row) => {
            prepareRow(row); // this is a function that prepares the row for rendering and must be called for each row before getting the row props and cell props otherwise it will throw an error
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
        {/* // this is the footer of the table where we will loop through the footer groups and render the data in the table  */}
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

export default FilteringTable;
