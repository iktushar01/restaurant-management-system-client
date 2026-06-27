import React, { useEffect, useState } from "react";
import { FaFileExport, FaPrint } from "react-icons/fa";
import { hrService } from "../../../services/hrService";

const GrandSalaryPayableIndex = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [totals, setTotals] = useState({
    salaryPayable: 0,
    salaryPaid: 0,
    due: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    hrService.grandSalaryPayable.get()
      .then((res) => {
        setSalaryData(res.data?.rows || []);
        setTotals(res.data?.totals || { salaryPayable: 0, salaryPaid: 0, due: 0 });
      })
      .catch((err) => setError(err.message || "Failed to load grand salary payable"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Grand Salary Payable
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            View summary of salary payable, paid, and due amounts
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 inline-flex items-center">
            <FaFileExport className="mr-2" />
            Export
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 inline-flex items-center">
            <FaPrint className="mr-2" />
            Print
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Salary Payable
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Salary Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Due
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {salaryData.map((item) => (
                  <tr key={item.employeeId || item.employeeName} className="hover:bg-muted/40">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {item.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {Number(item.salaryPayable).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {Number(item.salaryPaid).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={
                          item.due < 0
                            ? "text-destructive font-medium"
                            : "text-success font-medium"
                        }
                      >
                        {Number(item.due).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/40">
                <tr className="border-t-2 border-border">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                    Total Salary Payable
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                    {Number(totals.salaryPayable).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground"></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                    Total Salary Paid
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground"></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                    {Number(totals.salaryPaid).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground"></td>
                </tr>
                <tr className="border-b-2 border-border">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                    Total Salary Due
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground"></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground"></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                    <span
                      className={
                        totals.due < 0 ? "text-destructive" : "text-success"
                      }
                    >
                      {Number(totals.due).toFixed(2)}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {!loading && salaryData.length === 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">
            No salary records found
          </h3>
          <p className="text-muted-foreground mb-6">
            There are no salary records to display
          </p>
        </div>
      )}
    </div>
  );
};

export default GrandSalaryPayableIndex;
