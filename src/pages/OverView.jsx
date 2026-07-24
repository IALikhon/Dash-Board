import { useState } from "react";
import { Search } from "lucide-react";
import data from "../data/data";

const OverView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter dataset based on input search term
  const filteredData = data.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.month?.toLowerCase().includes(search) ||
      item.revenue?.toString().includes(search) ||
      item.profit?.toString().includes(search) ||
      item.orders?.toString().includes(search)
    );
  });

  return (
    <div className="pt-10 pl-20 pr-8 pb-12 min-h-screen bg-slate-50 dark:bg-gray-900 transition-all">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Overview Data
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Detailed financial breakdown and monthly metrics
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search month, numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-gray-700 text-slate-800 dark:text-white border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Header */}
              <thead>
                <tr className="bg-slate-100/70 dark:bg-gray-700/50 border-b border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6">Month</th>
                  <th className="py-4 px-6">Revenue</th>
                  <th className="py-4 px-6">Profit</th>
                  <th className="py-4 px-6">Orders</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-gray-700 text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50 dark:hover:bg-gray-700/40 transition-colors text-slate-700 dark:text-slate-200"
                    >
                      <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">
                        {item.month}
                      </td>
                      <td className="py-4 px-6 font-semibold text-blue-600 dark:text-blue-400">
                        ${item.revenue?.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 font-semibold text-emerald-600 dark:text-emerald-400">
                        ${item.profit?.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-slate-100 dark:bg-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                          {item.orders} orders
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-12 text-center text-slate-400 dark:text-slate-500"
                    >
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
