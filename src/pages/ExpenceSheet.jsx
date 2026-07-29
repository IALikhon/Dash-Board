import { useState } from "react";
import { supabase } from "../Supabase-client/Supabase-client";

const ExpenceSheet = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const [newForm, setNewForm] = useState({
    name: "",
    quantity: 1,
    price: 0,
    category: "",
    image: "",
    weekDay: today,
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
    if (newForm.category.length < 1) {
      return alert("Choose a category");
    }
    if (newForm.image.length < 1) {
      return alert("Choose an image");
    }
    if (newForm.description.length < 1) {
      return alert("Description Required");
    }

    const { data, error } = await supabase.from("inventory").insert([newForm]).select();

    if (error) {
      console.error("Error Add Inventory Failed: ", error.message);
      return;
    }

    console.log(data);
    

    setNewForm({
      name: "",
      quantity: 1,
      price: 0,
      category: "",
      image: "",
      weekDay: today,
      description: "",
    });
  };

  const boxClass =
    "flex flex-col gap-2 p-4 shadow-lg rounded-3xl  dark:text-black";
  const inputClass = "border rounded-lg pl-2 min-w-60";

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col flex-wrap items-center mt-8 min-h-screen gap-4 ml-18">
        <div className=" bg-white min-w-80 p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col flex-wrap md:flex-row gap-2 min-w-50 max-w-260">
            {/* Product Name */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Product Name :</label>
              <input
                type="text"
                placeholder="ex: Phone/Laptop..."
                value={newForm.name}
                onChange={(e) =>
                  setNewForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className={`${inputClass} md:w-108`}
              />
            </div>

            {/* Product Quantity */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Product Quantity : </label>

              <input
                type="number"
                value={newForm.quantity}
                onChange={(e) =>
                  setNewForm((prev) => ({
                    ...prev,
                    quantity: Number(e.target.value),
                  }))
                }
                className={inputClass}
              />
            </div>

            {/* Product Price */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Product Price : </label>

              <input
                type="number"
                value={newForm.price}
                onChange={(e) =>
                  setNewForm((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                className={inputClass}
              />
            </div>

            {/* Product Category */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Product Category : </label>
              <div>
                <select
                value={newForm.category}
                  onChange={(e) =>
                    setNewForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="rounded-lg px-4 py-2 mr-2"
                >
                  <option value="" className="rounded-2xl">
                    Choose an option
                  </option>
                  <option value="Electronic">Electronic</option>
                  <option value="Appliences">Appliences</option>
                  <option value="Accesories">Accesories</option>
                  <option value="Tools&Gadgets">Tools&Gadgets</option>
                </select>
              </div>
            </div>

            {/* Product Image */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Product Image : </label>

              <input
                type="url"
                value={newForm.image}
                onChange={(e) =>
                  setNewForm((prev) => ({ ...prev, image: e.target.value }))
                }
                className={inputClass}
              />
            </div>

            {/* Product Added to the Inventory */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Week Day : </label>

              <input
                type="text"
                value={newForm.weekDay}
                onChange={(e) =>
                  setNewForm((prev) => ({
                    ...prev,
                    weekDay: e.target.value,
                  }))
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="max-w-110 mt-4">
            {/* Product Description */}

            <div className={boxClass}>
              <label className="text-xs font-bold">Product Description :</label>
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

export default ExpenceSheet;
