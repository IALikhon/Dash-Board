import { useState } from "react";
import { supabase } from "../Supabase-client/Supabase-client";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";

const SalesSheet = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const { data = [], error, loading } = useFetch(debouncedQuery);

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const weekDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const currentDate = `${currentDay} / ${currentMonth} / ${currentYear} - ${weekDay}`;

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const boxClass =
    "flex flex-col gap-2 p-4 shadow-lg rounded-3xl dark:text-black dark:text-white";
  const inputClass = "border rounded-lg pl-2 min-w-60";

  const [newForm, setNewForm] = useState({
    date: { currentDate },
    customar_name: "",
    phone_number: "",
    items: [],
    total_price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("sales_sheet")
      .insert([newForm])
      .select();

    if (error) {
      console.error("Error Add Inventory Failed: ", error.message);
      return;
    }

    console.log(data);

    setNewForm({
      date: { currentDate },
      customar_name: "",
      phone_number: "",
      items: [],
      total_price: "",
    });
  };

  const addItem = (e) => {
    e.preventDefault();

    setNewForm((prev) => ({
      ...prev,
      items: [...prev.items, e.target.value],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col flex-wrap items-center mt-8 min-h-screen gap-4 ml-18">
        <div className=" bg-white  dark:bg-gray-800 min-w-80 min-h-120 p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col flex-wrap  md:flex-row gap-2 min-w-50 max-w-260">
            {/* Customar Name */}

            <div className={boxClass}>
              <label className="text-xs font-bold ">Customar Name : </label>
              <input
                type="text"
                className={`${inputClass} sm:w-130 md:w-100`}
                value={newForm.customar_name}
                onChange={(e) =>
                  setNewForm((prev) => ({
                    ...prev,
                    customar_name: e.target.value,
                  }))
                }
              />
            </div>

            {/* Phone Number */}

            <div className={boxClass}>
              <label className="text-xs font-bold"> Phone Number : </label>
              <input
                type="number"
                className={inputClass}
                value={newForm.phone_number}
                onChange={(e) =>
                  setNewForm((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }))
                }
              />
            </div>

            {/* Current Date */}

            <div className={boxClass}>
              <label className="text-xs font-bold"> Date : </label>
              <input
                type="text"
                value={newForm.date.currentDate}
                className={inputClass}
                disabled
              />
            </div>

            {/* Add Items */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Add Items : </label>
              <input
                type="text"
                className={`${inputClass} sm:w-130`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query.length > 0 && (

                <ul className="flex flex-col gap-4 z-20">
                  {filteredData.map((item) => {
                    return <li key={item.id} className="capitalize">{item.name} - ${item.price}</li>;
                  })}
                </ul>
              )}
              
            </div>

            {/* Add Quantity */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Add Quantity : </label>
              <input type="number" className={inputClass} />
            </div>

            <div className=" flex justify-center items-center">
              <button
                className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-2 mt-6 rounded-3xl"
                type="button"
                onClick={addItem}
              >
                Add
              </button>
            </div>
          </div>

          <div className="mt-8">
            <ul className=" dark:text-white">
              {newForm.items.map((item, indx) => {
                return <li key={indx}> {item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SalesSheet;
