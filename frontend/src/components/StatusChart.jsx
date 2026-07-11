import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function StatusChart({ data }) {
  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="count"
        nameKey="_id"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />

      <Legend />
    </PieChart>
  );
}

export default StatusChart;