"use client";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FiBarChart2 } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PaymentActivity({ payments }: { payments: any[] }) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );

  // Process payment data for chart
  const monthlyData = processPaymentsByMonth(payments);

  const data = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Payments",
        data: monthlyData.map((item) => item.total),
        backgroundColor: "#06b6d4",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
          <FiBarChart2 /> Payment Activity
        </h2>
        <div className="flex gap-2">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-3 py-1 text-sm rounded-full ${
                timeRange === range
                  ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

function processPaymentsByMonth(payments: any[]) {
  // Implementation depends on your data structure
  // This is a simplified example
  return [
    { month: "Jan", total: 3200 },
    { month: "Feb", total: 4200 },
    { month: "Mar", total: 3800 },
    { month: "Apr", total: 5100 },
    { month: "May", total: 2900 },
    { month: "Jun", total: 4500 },
  ];
}
