import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

const BarChartComponent = ({ d }) => {
  return (
    <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80">
      <ResponsiveContainer >
        <BarChart width={400} height={300} data={d} margin={{ top: 10, right: 20, left: 20, bottom: 25 }}
        >
          <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            /* Converts 10000 -> $10k to save space */
            tickFormatter={(value) =>
              `$${value >= 1000 ? `${value / 1000}k` : value}`
            }
          />{" "}
          <CartesianGrid strokeDasharray="6 6" />
          <Tooltip content={<CustomToolTip />} />
          <Legend />
          <Bar
            dataKey="revenue"
            stroke="#2563eb"
            fill="#21c2d1"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="profit"
            stroke="#7c3aed"
            fill="#21d156"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-slate-900 text-white flex flex-col gap-2 rounded-md shadow-lg border border-slate-700 text-sm">
        <p className="font-bold text-slate-300">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}:{" "}
            <span className="ml-2 font-semibold">
              ${entry.value?.toLocaleString()}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};
export default BarChartComponent;
