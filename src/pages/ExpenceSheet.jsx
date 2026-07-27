import { useState } from "react";
import { supabase } from "../Supabase-client/Supabase-client";

const ExpenceSheet = () => {
  const [newForm, setNewForm] = useState({
    name: "",
    quantity: 1,
    price: 0,
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newForm.name.length < 1) {
      return alert("Name Required");
    }
    if (newForm.price < 1) {
      return alert("Price Required");
    }
    if (newForm.description.length < 1) {
      return alert("Description Required");
    }
    const { error } = await supabase.from("inventory").insert(newForm).single();

    if (error) {
      console.error("Error Add Inventory Failed: ", error.message);
    }

    setNewForm({ name: "", quantity: 1, description: "" });
  };

  const boxClass = ["flex flex-col gap-2 p-4 shadow-lg rounded-3xl"];
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col flex-wrap items-center mt-8 min-h-screen gap-4 ml-18">
        <div className=" bg-white min-w-80 p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-2 min-w-50">
            {/* Product Name */}

            <div className={boxClass}>
              <span className="text-xs font-bold">Product Name :</span>
              <input
                type="text"
                placeholder="ex: Phone/Laptop..."
                value={newForm.name}
                onChange={(e) =>
                  setNewForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border rounded-lg pl-2 md:w-100 "
              />
            </div>

            {/* Product Quantity */}

            <div className={boxClass}>
              <span className="text-xs font-bold">Product Quantity : </span>

              <input
                type="number"
                value={newForm.quantity}
                onChange={(e) =>
                  setNewForm((prev) => ({ ...prev, quantity: e.target.value }))
                }
                className="border rounded-lg pl-2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-50">
            {/* Product Price */}

            <div className={`${boxClass} inline-2xs`}>
              <span className="text-xs font-bold">Product Price : </span>

              <input
                type="number"
                value={newForm.price}
                onChange={(e) =>
                  setNewForm((prev) => ({ ...prev, price: e.target.value }))
                }
                className="border rounded-lg pl-2 w-62"
              />
            </div>

            {/* Product Description */}

            <div className={boxClass}>
              <span className="text-xs font-bold">Product Description : </span>
              <textarea
                type="text"
                placeholder="Add description..."
                value={newForm.description}
                onChange={(e) =>
                  setNewForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="border rounded-lg pl-2 md:w-100 min-h-40 "
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="float-right font-bold text-white px-6 py-3 m-6 bg-green-500 hover:bg-green-600 rounded-2xl"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenceSheet;
