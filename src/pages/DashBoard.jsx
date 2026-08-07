import data from "../data/data";
import AreaChartComponent from "../components/AreaChart";
import BarChartComponent from "../components/BarChart";
import LineChartComponent from "../components/LineChart";
import { NavLink } from "react-router-dom";

const DashBoard = () => {
  const labels = ["Overview", "Sales", "Inventory"];

  return (
    <div className="flex flex-col justify-center px-4 md:px-8 xl:px-10 ml-15 sm:ml-10 snap-y snap-mandatory">
      <div className="flex flex-wrap justify-center items-center gap-4 mt-8 mb-16 md:mb-4 w-100 sm:w-150 md:w-200 lg:w-300 mx-auto">
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800 dark:text-white w-full max-w-97">
          <AreaChartComponent d={data} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800 dark:text-white w-full max-w-97">
          <LineChartComponent d={data} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800 dark:text-white w-full max-w-97">
          <BarChartComponent d={data} />
        </div>
      </div>
      <div className="mx-16 my-4">
        {labels.map((label) => {
          return (
            <NavLink
              to={`${label}`}
              key={label}
              className={({ isActive }) =>
                `mr-2 snap-center px-2 border rounded-2xl p-2 ${isActive ? "border-2 font-bold" : "text-sm"}`
              }
            >
              {label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default DashBoard;
