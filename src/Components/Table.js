import React from "react";

const Table = ({ columns, data }) => {
  return (
    <table className="table-auto border-collapse w-full ">
      <thead >
        <tr >
          {columns.map((col, index) => (
            <th
              key={index}
              className="border border-gray-300 px-4 py-2 text-center bg-[rgb(51,134,116)]"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {columns.map((col, colIndex) => (
              <td
                key={colIndex}
                className="border border-gray-300 px-4 py-2 bg-transparent"
              >
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
