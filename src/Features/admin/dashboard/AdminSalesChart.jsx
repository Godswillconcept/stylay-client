// import { useState } from "react";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ReferenceLine,
// } from "recharts";
// import { useSalesStats } from "./useSalesStats";

// const data = [
//   { month: "Jan", value: 80 },
//   { month: "Feb", value: 120 },
//   { month: "Mar", value: 90 },
//   { month: "Apr", value: 150 },
//   { month: "May", value: 220 },
//   { month: "Jun", value: 180 },
//   { month: "Jul", value: 320 },
//   { month: "Aug", value: 256 },
//   { month: "Sep", value: 200 },
//   { month: "Oct", value: 230 },
//   { month: "Nov", value: 170 },
//   { month: "Dec", value: 140 },
// ];

// export default function AdminSalesChart() {
//   const [activeIdx, setActiveIdx] = useState(null);
//   const { saleStats, isLoading } = useSalesStats()
//   console.log("sales stats", saleStats);


//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart
//         data={data}
//         onMouseLeave={() => setActiveIdx(null)}
//         onMouseMove={(state) => {
//           if (state.isTooltipActive && state.activeTooltipIndex !== undefined) {
//             setActiveIdx(state.activeTooltipIndex);
//           }
//         }}
//       >
//         <CartesianGrid
//           strokeDasharray="3 3"
//           vertical={false}
//           stroke="#E6E9EE"
//         />
//         <XAxis dataKey="month" axisLine={false} tick={{ fill: "#6B7280" }} />
//         <YAxis axisLine={false} tick={{ fill: "#6B7280" }} />
//         <Tooltip wrapperStyle={{ borderRadius: 8 }} />
//         <Line
//           type="monotone"
//           dataKey="value"
//           stroke="#111827"
//           strokeWidth={3}
//           dot={{ r: 4 }}
//           activeDot={{ r: 6 }}
//         />
//         {activeIdx !== null && (
//           <ReferenceLine
//             x={data[activeIdx].month}
//             stroke="#9CA3AF"
//             strokeDasharray="4 4"
//           />
//         )}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { useSalesStats } from "./useSalesStats";

export default function AdminSalesChart() {
  const [activeIdx, setActiveIdx] = useState(null);
  const { saleStats, isLoading } = useSalesStats();

  const hasData =
    Array.isArray(saleStats?.data) && saleStats.data.length > 0;

  return (
    <div className="w-full h-80 bg-white p-4 rounded-xl shadow-sm flex items-center justify-center">
      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading sales data...</p>
      ) : !hasData ? (
        <div className="text-center">
          <p className="text-gray-600 font-medium">No sales data available</p>
          <p className="text-gray-400 text-xs">
            Sales chart will appear here once transactions occur.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={saleStats.data}
            onMouseLeave={() => setActiveIdx(null)}
            onMouseMove={(state) => {
              if (
                state.isTooltipActive &&
                state.activeTooltipIndex !== undefined
              ) {
                setActiveIdx(state.activeTooltipIndex);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E9EE" />
            <XAxis dataKey="month" axisLine={false} tick={{ fill: "#6B7280" }} />
            <YAxis axisLine={false} tick={{ fill: "#6B7280" }} />
            <Tooltip wrapperStyle={{ borderRadius: 8 }} />
            <Line
              type="monotone"
              dataKey="total_sales"
              stroke="#111827"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            {activeIdx !== null && (
              <ReferenceLine
                x={saleStats.data[activeIdx].month}
                stroke="#9CA3AF"
                strokeDasharray="4 4"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
