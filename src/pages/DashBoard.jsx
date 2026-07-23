import data from "../data/data";
import AreaChartComponent from "../components/AreaChart";
import BarChartComponent from "../components/BarChart";
import LineChartComponent from "../components/LineChart";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center px-4 md:px-8 xl:px-10">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 mb-16 md:mb-4 sm:w-100 md:w-200 lg:w-300 ">
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
      <div className="mx-16 md:mx-16 border-b w-fit ">
        <button onClick={() => navigate("Overview")}>Overview</button>
      </div>
    </div>
  );
};
export default DashBoard;
