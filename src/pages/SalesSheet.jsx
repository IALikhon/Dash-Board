
const SalesSheet = () => {

    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const weekDay = new Date().toLocaleDateString("en-US", {weekday: "long"});
    const currentDate = `${currentDay} / ${currentMonth} / ${currentYear} - ${weekDay}`;

  const boxClass =
    "flex flex-col gap-2 p-4 shadow-lg rounded-3xl dark:text-black";
  const inputClass = "border rounded-lg pl-2 min-w-60";

  return (
    <div className="flex flex-col flex-wrap items-center mt-8 min-h-screen gap-4 ml-18">
      <div className=" bg-white min-w-80 p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col flex-wrap md:flex-row gap-2 min-w-50 max-w-260">
          {/* Customar Name */}

          <div className={boxClass}>
            <label className="text-xs font-bold ">Customar Name : </label>
            <input type="text" className={`${inputClass} md:w-100`} />
          </div>

          {/* Phone Number */}

          <div className={boxClass}>
            <label className="text-xs font-bold"> Phone Number : </label>
            <input type="number" className={inputClass} />
          </div>

          {/* Current Date */}

          <div className={boxClass}>
            <label className="text-xs font-bold"> Date : </label>
            <input type="text" value={currentDate} className={inputClass} disabled/>
          </div>

          {/* Add Items */}

          <div className={boxClass}>
            <label className="text-xs font-bold">Add Items : </label>
            <input type="text" className={`${inputClass} md:w-150`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSheet;
