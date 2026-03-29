import React from 'react';

const DataTable = ({ title, columns, data, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
          {data.length} Total
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              {columns.map((col, index) => (
                <th key={index} className="p-4 font-semibold">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="p-10 text-center text-gray-500">
                  Loading data...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-10 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-blue-50 transition-colors">
                {Object.values(item).map((val, colIndex) => (
                  <td key={colIndex} className="p-4 text-gray-700 text-sm">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
