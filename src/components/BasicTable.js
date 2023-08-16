import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./table.css";
const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BasicTable;
