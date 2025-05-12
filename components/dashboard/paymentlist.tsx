"use client";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiClock } from "react-icons/fi";

type Payment = {
  id: string;
  contractor: string;
  amount: number;
  date: Date;
  isRecurring: boolean;
};

export default function PaymentList() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sample data - replace with Firebase data
  const samplePayments: Payment[] = [
    {
      id: "1",
      contractor: "Jane Cooper",
      amount: 1250,
      date: new Date("2023-06-15"),
      isRecurring: true,
    },
    {
      id: "2",
      contractor: "John Doe",
      amount: 750,
      date: new Date("2023-06-20"),
      isRecurring: false,
    },
  ];
  const handleUpdate = (updatedPayment: Payment) => {
    setPayments(
      payments.map((p) => (p.id === updatedPayment.id ? updatedPayment : p))
    );
  };

  const handleDelete = (id: string) => {
    setPayments(payments.filter((p) => p.id !== id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold">Recent Payments</h3>
        <button className="text-sm bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded">
          + New Payment
        </button>
      </div>
      <div className="divide-y divide-gray-700">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="p-4 hover:bg-gray-800/30 transition flex justify-between"
          >
            <div>
              <p className="font-medium">{payment.contractor}</p>
              <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                <FiClock size={14} />
                {payment.date.toLocaleDateString()}
                {payment.isRecurring && (
                  <span className="ml-2 px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs rounded-full">
                    Recurring
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-mono">${payment.amount.toFixed(2)}</p>
              <div className="flex gap-2 text-gray-400">
                <button
                  onClick={() => {
                    setSelectedPayment(payment);
                    setIsEditModalOpen(true);
                  }}
                  className="hover:text-cyan-400"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={() => {
                    setSelectedPayment(payment);
                    setIsDeleteModalOpen(true);
                  }}
                  className="hover:text-red-400"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <EditPaymentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        payment={selectedPayment}
        onUpdate={handleUpdate}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        paymentId={selectedPayment?.id}
        onConfirm={() => {
          setPayments(payments.filter((p) => p.id !== selectedPayment?.id));
        }}
      />
    </div>
  );
}
