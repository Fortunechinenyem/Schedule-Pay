"use client";
import { FiDollarSign, FiCalendar, FiRepeat, FiUsers } from "react-icons/fi";
import { Payment } from "./types/payment";

interface StatsCardsProps {
  payments: Payment[];
}

export default function StatsCards({ payments }: StatsCardsProps) {
  // Calculate unique contractors safely
  const uniqueContractors = new Set(
    payments
      .map((p) => p.contractor)
      .filter((contractor): contractor is string => !!contractor)
  ).size;

  const stats = [
    {
      title: "Total Paid",
      value: `$${payments
        .reduce((sum, p) => sum + p.amount, 0)
        .toLocaleString()}`,
      icon: <FiDollarSign className="text-cyan-500" />,
      change: "+12% from last month",
    },
    {
      title: "Upcoming Payments",
      value: payments
        .filter((p) => new Date(p.date) > new Date())
        .length.toString(),
      icon: <FiCalendar className="text-blue-500" />,
      change: `${
        payments.filter((p) => new Date(p.date) > new Date()).length
      } scheduled`,
    },
    {
      title: "Recurring",
      value: payments.filter((p) => p.isRecurring).length.toString(),
      icon: <FiRepeat className="text-purple-500" />,
      change: `${payments.filter((p) => p.isRecurring).length} active`,
    },
    {
      title: "Contractors",
      value: uniqueContractors.toString(),
      icon: <FiUsers className="text-green-500" />,
      change: `+${Math.max(0, uniqueContractors - 1)} new`, // Example calculation
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-2xl font-bold mt-1 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-cyan-50 dark:bg-gray-700 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
          <p className="text-xs mt-3 text-gray-500 dark:text-gray-400">
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}
