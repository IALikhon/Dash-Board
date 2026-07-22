import AreaChartComponent from "../components/AreaChart";
import BarChartComponent from "../components/BarChart";
import LineChartComponent from "../components/LineChart";
import data from "../data/data";

const DashBoard = () => {
  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 ">
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
    </div>
  );
};
export default DashBoard;
