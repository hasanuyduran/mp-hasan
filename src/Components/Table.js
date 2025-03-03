import React from "react";

const Table = ({ columns, data }) => {
  return (
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              key={index}
              className="border border-gray-300 px-4 py-2 text-center text-2xl bg-[rgb(51,134,116)]"
            >
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-[rgba(255,255,255,0.16)]">
            {columns.map((col, colIndex) => (
              <td
                key={colIndex}
                className="border border-gray-300 px-4 py-2 text-2xl bg-[rgba(255,255,255,0.27)] "
              >
                {/* Eğer bir işlem fonksiyonu varsa uygula, yoksa doğrudan değeri göster */}
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
