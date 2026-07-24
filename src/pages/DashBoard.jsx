import data from "../data/data";
import AreaChartComponent from "../components/AreaChart";
import BarChartComponent from "../components/BarChart";
import LineChartComponent from "../components/LineChart";
import { NavLink } from "react-router-dom";

const DashBoard = () => {
  const labels = ["Overview", "Salessheet", "Expencesheet"];

  return (
    <div className="flex flex-col justify-center px-4 md:px-8 xl:px-10 ml-10 sm:ml-0">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 mb-16 md:mb-4 w-100 sm:w-150 md:w-200 lg:w-300 ">
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800 dark:text-white">
          <AreaChartComponent d={data} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800 dark:text-white">
          <LineChartComponent d={data} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800 dark:text-white">
          <BarChartComponent d={data} />
        </div>
      </div>
      <div className="mx-16 md:mx-16 ">
        {labels.map((label) => {
          return (
            <NavLink
              to={`${label}`}
              key={label}
              className={({ isActive }) =>
                `mr-2 ${isActive ? "border-b font-bold" : ""}`
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
