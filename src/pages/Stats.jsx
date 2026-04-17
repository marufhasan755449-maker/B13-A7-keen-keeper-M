import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTimeline } from "../context/TimelineContext";
import { BarChart2 } from "lucide-react";

const COLORS  = ["#2D6A4F", "#74C69D", "#B7E4C7"];
const BORDERS = ["#2D6A4F", "#52b788", "#95d5b2"];

export default function Stats() {
  const { entries } = useTimeline();

  const counts = { Call: 0, Text: 0, Video: 0 };
  entries.forEach((e) => { if (counts[e.type] !== undefined) counts[e.type]++; });

  const data = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-bold text-3xl text-gray-900 mb-1 tracking-tight">Friendship Analytics</h1>
      {data.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-3 text-center">
          <BarChart2 size={44} className="text-gray-200" />
          <h3 className="text-base font-semibold text-gray-400">No data yet</h3>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Log interactions from friend pages to see your analytics here.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
          <h2 className="text-sm font-bold text-gray-500 mb-6">By Interaction Type</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={70}
                paddingAngle={4}
                dataKey="value"
                labelLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#fff", border: "1px solid #e5e7eb",
                  borderRadius: "10px", fontSize: "0.84rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
              />
              <Legend formatter={(v) => <span className="text-gray-600 text-sm">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
          
        </div>
      )}
    </div>
  );
}
