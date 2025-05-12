import { FiDollarSign, FiCalendar, FiRepeat, FiUsers } from "react-icons/fi";

const stats = [
  {
    title: "Total Paid",
    value: "$12,450",
    icon: <FiDollarSign />,
    trend: "↑ 12%",
  },
  { title: "Scheduled", value: "8", icon: <FiCalendar />, trend: "→" },
  { title: "Recurring", value: "5", icon: <FiRepeat />, trend: "↑ 3%" },
  { title: "Contractors", value: "14", icon: <FiUsers />, trend: "↑ 8%" },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className="text-cyan-400 text-xl">{stat.icon}</div>
          </div>
          <p className="text-xs mt-2 text-gray-400">
            {stat.trend} vs last month
          </p>
        </div>
      ))}
    </div>
  );
}
