"use client";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import DatePicker from "../ui/datepicker";
import { Payment } from "../types/payment";
import { auth } from "@/lib/firebase";

type PaymentFormData = {
  contractor: string;
  amount: string;
  date: Date;
  isRecurring: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payment: Payment) => void;
};

export default function AddPaymentModal({ isOpen, onClose, onSave }: Props) {
  // Explicitly type the form state
  const [formData, setFormData] = useState<PaymentFormData>({
    contractor: "",
    amount: "",
    date: new Date(),
    isRecurring: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to create payments");
      return;
    }
    // Convert amount to number before saving
    const amountNumber = parseFloat(formData.amount);
    if (isNaN(amountNumber)) {
      alert("Please enter a valid amount");
      return;
    }

    onSave({
      id: Date.now().toString(),
      contractor: formData.contractor,
      amount: amountNumber,
      date: formData.date,
      isRecurring: formData.isRecurring,
      userId: user.uid, // Include the required userId
      createdAt: new Date(), // Optional: include creation timestamp
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold">Schedule New Payment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Contractor
                </label>
                <input
                  type="text"
                  value={formData.contractor}
                  onChange={(e) =>
                    setFormData({ ...formData, contractor: e.target.value })
                  }
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Payment Date
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={(date: Date) => setFormData({ ...formData, date })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={formData.isRecurring}
                  onChange={(e) =>
                    setFormData({ ...formData, isRecurring: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="recurring" className="text-sm text-gray-400">
                  Recurring Payment
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
              >
                Schedule Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
