import { FiCheckCircle, FiDollarSign, FiUserPlus } from "react-icons/fi";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "payment",
      description: "Payment to Jane Cooper completed",
      amount: 1250,
      date: "2023-06-15T10:30:00",
      icon: <FiDollarSign className="text-green-500" />,
    },
    {
      id: 2,
      type: "contractor",
      description: "New contractor added: John Doe",
      date: "2023-06-14T14:45:00",
      icon: <FiUserPlus className="text-blue-500" />,
    },
    {
      id: 3,
      type: "payment",
      description: "Recurring payment scheduled",
      amount: 750,
      date: "2023-06-12T09:15:00",
      icon: <FiCheckCircle className="text-purple-500" />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="mt-1 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              {activity.icon}
            </div>
            <div>
              <p className="font-medium dark:text-white">
                {activity.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(activity.date).toLocaleString()}
                {activity.amount && (
                  <span className="ml-2 font-mono">
                    ${activity.amount.toFixed(2)}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
