"use client";
import { FiX, FiUpload, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DatePicker from "../ui/DatePicker";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import { useTheme } from "next-themes";

type RecurringInterval = "weekly" | "biweekly" | "monthly" | "quarterly" | null;

type Payment = {
  id: string;
  contractor: string;
  amount: number;
  date: Date;
  isRecurring: boolean;
  interval?: RecurringInterval;
  receiptURL?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
  onUpdate: (updatedPayment: Payment) => void;
};

export default function EditPaymentModal({
  isOpen,
  onClose,
  payment,
  onUpdate,
}: Props) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<Omit<Payment, "id">>({
    contractor: "",
    amount: 0,
    date: new Date(),
    isRecurring: false,
    interval: null,
    receiptURL: "",
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (payment) {
      setFormData({
        contractor: payment.contractor,
        amount: payment.amount,
        date: payment.date,
        isRecurring: payment.isRecurring,
        interval: payment.interval || null,
        receiptURL: payment.receiptURL || "",
      });
    }
  }, [payment]);

  const handleFileUpload = async () => {
    if (!receiptFile || !payment) return;

    setIsUploading(true);
    try {
      const storageRef = ref(
        storage,
        `receipts/${payment.id}/${receiptFile.name}`
      );
      await uploadBytes(storageRef, receiptFile);
      const url = await getDownloadURL(storageRef);
      setFormData({ ...formData, receiptURL: url });
      toast.success("Receipt uploaded!");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment) return;

    try {
      const paymentRef = doc(db, "payments", payment.id);
      await updateDoc(paymentRef, {
        ...formData,
        date: formData.date,
      });

      onUpdate({ id: payment.id, ...formData });
      toast.success("Payment updated!");
      onClose();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (!isOpen || !payment) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        theme === "dark" ? "bg-black/50" : "bg-gray-900/50"
      }`}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className={`rounded-xl shadow-2xl w-full max-w-md ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border`}
      >
        <div
          className={`p-4 border-b flex justify-between items-center ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h3 className="font-semibold">Edit Payment</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contractor & Amount Fields (same as before) */}

            {/* Recurring Toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="recurring-toggle"
                checked={formData.isRecurring}
                onChange={(e) =>
                  setFormData({ ...formData, isRecurring: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 dark:border-gray-600"
              />
              <label
                htmlFor="recurring-toggle"
                className="flex items-center gap-1"
              >
                <FiClock />
                Recurring Payment
              </label>
            </div>

            {/* Recurring Interval Selector */}
            {formData.isRecurring && (
              <div className="pl-6">
                <label className="block text-sm mb-1">Interval</label>
                <select
                  value={formData.interval || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interval: e.target.value as RecurringInterval,
                    })
                  }
                  className={`w-full rounded-lg px-3 py-2 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-300"
                  } border`}
                >
                  <option value="">Select interval</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
            )}

            {/* Receipt Upload */}
            <div>
              <label className="block text-sm mb-1">Receipt</label>
              <div className="flex gap-2">
                <label
                  className={`flex-1 cursor-pointer rounded-lg border-dashed border-2 p-4 flex flex-col items-center ${
                    theme === "dark"
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <FiUpload className="mb-2" />
                  <span className="text-sm">
                    {receiptFile ? receiptFile.name : "Click to upload"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setReceiptFile(e.target.files?.[0] || null)
                    }
                    accept="image/*,.pdf"
                  />
                </label>
                {receiptFile && (
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    disabled={isUploading}
                    className="px-3 py-2 bg-cyan-500 text-white rounded-lg disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </button>
                )}
              </div>
              {formData.receiptURL && (
                <a
                  href={formData.receiptURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-500 hover:underline mt-2 inline-block"
                >
                  View current receipt
                </a>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
