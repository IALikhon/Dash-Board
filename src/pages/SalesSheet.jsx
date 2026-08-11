import { useState } from "react";
import { supabase } from "../Supabase-client/Supabase-client";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import { X } from "lucide-react";

const SalesSheet = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const { data, error, loading } = useFetch(debouncedQuery);

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const weekDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const currentDate = `${currentDay} / ${currentMonth} / ${currentYear} - ${weekDay}`;

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const boxClass =
    "flex flex-col gap-2 p-4 shadow-lg rounded-3xl dark:text-black dark:text-white max-h-20";
  const inputClass = "border rounded-lg pl-2 min-w-60 capitalize";

  const [newForm, setNewForm] = useState({
    date: { currentDate },
    customar_name: "",
    phone_number: "",
    items: [],
    total_price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(newForm.customar_name.length < 1){
      return alert("Enter Your Name")
    }
    if(newForm.phone_number.length < 1 || newForm.phone_number.length > 15){
      return alert("Enter a Valid Number")
    }
    if (newForm.items.length === 0) {
      return alert("Please add at least one item");
    }
    if(newForm.items.itemQuantity < 1){
      return alert("Enter Quantity")
    }

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

  console.log(newForm);
  

  const [selectedItem, setSelectedItem] = useState({
    itemName: null,
    itemQuantity: null,
    itemPrice: null,
  });

  const addItem = (e) => {
    e.preventDefault();

    if (!selectedItem.itemName) {
      alert("Please select an item ");
      return;
    }
    if (selectedItem.itemQuantity < 1) {
      alert("Please select Quantity ");
      return;
    }

    const itemTotal = Number(selectedItem.itemQuantity) * Number(selectedItem.itemPrice);

    setNewForm((prev) => ({
      ...prev,
      items: [...prev.items, selectedItem],
      total_price: Number((prev.total_price || 0) + itemTotal)
    }));

    setQuery("");
    setSelectedItem({
      itemName: null,
      itemQuantity: null,
      itemPrice: null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center mt-8 min-h-screen gap-4 ml-18">
        <div className=" bg-white dark:bg-gray-800 min-w-80 min-h-120 p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col flex-wrap sm:flex-row gap-2 min-w-50 max-w-260">
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

            <div className="flex flex-col relative transition-all duration-600">
              <div className={boxClass}>
                <label className="text-xs font-bold">Add Items : </label>
                <input
                  type="text"
                  className={`${inputClass} sm:w-130 `}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsDropDownOpen(true);
                  }}
                />
              </div>
              {isDropDownOpen && query.length > 0 && (
                <ul className="flex flex-col absolute top-20 bg-white w-full px-4 gap-2 z-20 rounded-2xl">
                  {filteredData.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="capitalize  py-2 cursor-pointer"
                        onClick={() => {
                          setSelectedItem((prev) => ({
                            ...prev,
                            itemName: item.name,
                            itemPrice: item.price,
                          }));
                          setQuery(item.name);
                          setIsDropDownOpen(false);
                        }}
                      >
                        {item.name} - ${item.price}
                      </li>
                    );
                  })}
                </ul>
              )}

              <button
                className="absolute top-8 left-125 p-2"
                onClick={() => setQuery("")}
              >
                <X />
              </button>
            </div>

            {/* Add Quantity */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Add Quantity : </label>
              <input
                type="number"
                className={inputClass}
                value={selectedItem.itemQuantity || ""}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    itemQuantity: Number(e.target.value),
                  }))
                }
              />
            </div>

            {/* Add Button */}

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

          {/* Product List */}
          <div className="mt-8">
            <ul className=" dark:text-white">
              {newForm.items.map((cartItem, indx) => (
                <li
                  key={indx}
                  className="flex justify-between border-b pb-1 capitalize mx-20 py-2 font-bold"
                >
                  <span>{cartItem.itemName}</span>
                  <span>{cartItem.itemQuantity}</span>
                  <span>
                    {Number(cartItem.itemQuantity) * Number(cartItem.itemPrice)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end py-8 px-8 mx-8 underline font-bold">
              Total: {newForm.total_price || 0}
            </div>
          </div>
          <button
            type="submit"
            className="float-right font-bold text-white px-6 py-3 m-6 bg-green-500 hover:bg-green-600 rounded-2xl"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default SalesSheet;
