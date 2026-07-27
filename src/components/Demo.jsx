import { useState } from "react";

const Demo = () => {
    const [valueOne, setValueOne] = useState()
    const [valueTwo, setValueTwo] = useState()

    const sum =()=> {
        const add = Number(valueOne) + Number(valueTwo)
        return add
    }
    return (
      <div className="flex justify-center items-center min-h-screen">
        <input
          type="number"
          placeholder="Number-1"
          value={valueOne}
          onChange={(e) => setValueOne(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number-2"
          value={valueTwo}
          onChange={(e) => setValueTwo(e.target.value)}
        />

        <h1>Sum: {sum()}</h1>
        <div className="pt-10 flex flex-col items-center min-h-screen bg-slate-50 dark:bg-gray-900 transition-all">
          <div className="grid grid-cols-1 sm:grid-cols-2 mx-8 sm:gap-8 gap-4 lg:ml-20 max-w-200">
            <div className="flex flex-col ">
              <span className="font-bold text-xs mb-2">Product Name</span>
              <input
                type="text"
                placeholder="ex: Laptop/Phone..."
                value={newForm.name}
                onChange={(e) =>
                  setNewForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="rounded-lg pl-4"
              />
            </div>
            <div className="flex flex-col ">
              <span className="font-bold text-xs mb-2">Product Quantity</span>
              <input
                type="number"
                placeholder="ex: 30..."
                value={newForm.quantity}
                onChange={(e) =>
                  setNewForm((prev) => ({ ...prev, quantity: e.target.value }))
                }
                className="rounded-lg pl-4 w-50"
              />
            </div>
            <div className="flex flex-col ">
              <span className="font-bold text-xs mb-2">
                Product Description
              </span>
              <textarea
                type="text"
                placeholder="ex: This is a phone..."
                value={newForm.description}
                onChange={(e) =>
                  setNewForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="rounded-lg pl-4"
              />
            </div>
          </div>
          <span className="">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white "
            >
              Submit
            </button>
          </span>
        </div>
      </div>
    );
}
 
export default Demo;