import React, { useMemo } from "react";
import { useTable, useColumnOrder } from "react-table";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./table.css";
const ColumnOrder = () => {
  const columns = useMemo(() => COLUMNS, []); // this is the first way to memoize the columns and data and it is the recommended way to do it

  // const columns = useMemo(() => GROUPED_COLUMNS, []); // This is the second way to memoize the columns and data and it is the recommended way to do it .
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useColumnOrder
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    setColumnOrder,
  } = tableInstance;
  return (
    <>
      <button
        onClick={() =>
          setColumnOrder([
            "id",
            "first_name",
            "last_name",
            "phone",
            "country",
            "date_of_birth",
          ])
        }
      >
        Set Column Order
      </button>
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

export default ColumnOrder;
