import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function PriorityChart({ data }) {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="_id" />

      <YAxis />

      <Tooltip />

      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default PriorityChart;