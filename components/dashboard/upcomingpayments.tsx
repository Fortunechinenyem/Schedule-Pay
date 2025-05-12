import { FiClock, FiDollarSign } from "react-icons/fi";
import { format } from "date-fns";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { useState } from "react";
import AddPaymentModal from "./modals/addpaymentmodal";
import { addPayment } from "@/lib/firestore";

export default function UpcomingPayments({
  payments,
  refreshData,
}: {
  payments: any[];
  refreshData: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const upcomingPayments = payments
    .filter((p) => new Date(p.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  const handleSavePayment = async (newPayment: any) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      await addPayment({
        ...newPayment,
        userId: user.uid,
        createdAt: new Date(),
      });

      toast.success("Payment added successfully!");
      refreshData(); // Refresh the parent component's data
    } catch (error) {
      toast.error("Failed to add payment");
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">
          Upcoming Payments
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded"
        >
          + Add
        </button>
      </div>

      {upcomingPayments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No upcoming payments scheduled
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
            >
              <div>
                <p className="font-medium dark:text-white">
                  {payment.contractor}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <FiClock size={14} />
                  {format(new Date(payment.date), "MMM d, yyyy")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-medium dark:text-white">
                  ${payment.amount.toFixed(2)}
                </span>
                {payment.isRecurring && (
                  <span className="text-xs px-2 py-0.5 bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 rounded-full">
                    Recurring
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePayment}
      />
    </div>
  );
}
