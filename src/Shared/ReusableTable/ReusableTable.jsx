import React from "react";

const ReusableTable = ({ columns, data, actions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-yellow-400">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-4 text-left text-xs font-medium text-gray-900 uppercase tracking-wider ${
                    col.align === "right" ? "text-right" : ""
                  }`}
                >
                  {col.header}
                </th>
              ))}

              {actions && (
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap ${
                      col.align === "right" ? "text-right" : ""
                    }`}
                  >
                    <div className="text-sm text-gray-700">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </div>
                  </td>
                ))}

                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      {actions.map((action, idx) =>
                        action.render ? (
                          <div key={idx}>{action.render(row)}</div>
                        ) : (
                          <button
                            key={idx}
                            onClick={() => action.onClick(row)}
                            className={`transition-colors duration-200 flex items-center ${action.className}`}
                          >
                            {action.icon && <action.icon className="mr-1.5" />}
                            {action.label}
                          </button>
                        )
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
