import { useState } from "react";
import useFetch from "../hooks/useFetch";

const OverView = () => {
  const { data = [], loading, error } = useFetch("overview");
  const [quote, setQuote] = useState("");

  if (loading) return (
    <div className="flex justify-center font-bold h-64 z-100">
      <div className="animate-spin w-16 h-16 rounded-full border-blue-500 border-t-2 border-b-2"></div>
      <div>Loading...</div>
    </div>
  );
  if (error)
    return (
      <div className="flex justify-center p-8 text-red-500 font-bold">
        Error: {error}
      </div>
    );
    
  const filterData = Array.isArray(data) ? data.filter((item) => {
    if(!quote.trim()){
      return true;
    }

    const searchTerm = quote.toLowerCase().trim()

    const matchDate = String(item.date || "").toLowerCase().includes(searchTerm);

    const matchPrice = String(item.price || "").toLowerCase().includes(searchTerm);

    let matchQuote = false;
    if(Array.isArray(item.items)){
      matchQuote = item.items.some((cartItem) => String(cartItem.itemName || "").toLowerCase().includes(searchTerm))
    }else if(typeof item.items === "string"){
      matchQuote = item.items.toLowerCase().includes(searchTerm)
    }

    return matchDate || matchPrice || matchQuote;
  }) : [];


  return (
    <div className="justify-center bg-white dark:bg-gray-800 rounded-2xl ml-14 sm:ml-auto max-w-md md:max-w-2xl lg:max-w-4xl mx-auto p-6 mt-8 shadow-md overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between px-8 py-8 mb-8 mx-auto">
        <span className="text-4xl border-b-2 mb-10 md:mb-0 border-slate-400">OverView</span>
        <input
          type="text"
          placeholder="Search Date/Product/Price..."
          className="p-2 px-4 max-w-120 rounded-2xl shadow-[inset_0_2px_4px_2px_rgba(15,23,42,0.20)] focus:outline-none focus:ring-2 focus:ring-slate-200"
          onChange={(e) => setQuote(e.target.value)}
        />
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="py-3 px-4 font-bold">Date</th>
            <th className="py-3 px-4 font-bold">Items , Qty & Unit Price</th>
            <th className="py-3 px-4 font-bold text-right">Total Price</th>
            <th className="py-3 px-4 font-bold text-right">Type</th>
          </tr>
        </thead>
        <tbody className=" divide-gray-200 ">
          {filterData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-200 cursor-pointer">
              <td className="flex flex-wrap py-4 px-4 align-top whitespace-nowrap ">
                {row.date}
              </td>
              <td className="py-4 px-4 align-top ">
                {Array.isArray(row.items) && row.items.length > 0 ? (
                  <ul className="space-y-1">
                    {row.items.map((item, ind) => (
                      <li
                        key={ind}
                        className="flex justify-between max-w-xs gap-4 text-sm "
                      >
                        <span className="capitalize font-semibold">
                          {item.itemName || item}
                        </span>
                        <span className="text-gray-500 ml-2">
                          x{item.itemQuantity} (${item.itemPrice})
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : typeof row.items === "string" && row.items.trim() !== "" ? (
                  <span className="capitalize font-semibold text-sm">
                    {row.items}
                  </span>
                ) : (
                  <span className="text-gray-400 italic">
                    No items recorded
                  </span>
                )}
              </td>
              <td
                className={`py-4 px-4 align-top text-right font-bold ${row.type === "Sold" ? "text-green-600" : "text-blue-600"}`}
              >
                ${row.total_price}
              </td>
              <td
                className={`py-4 px-4 align-top text-right font-bold ${row.type === "Sold" ? "text-green-600" : "text-blue-600"}`}
              >
                {row.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverView;
