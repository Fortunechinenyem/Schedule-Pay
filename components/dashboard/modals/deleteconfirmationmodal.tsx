"use client";
"use client";
import { FiAlertTriangle, FiX, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description?: string;
};

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  description = "This action cannot be undone. All payment data will be permanently removed.",
}: Props) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        theme === "dark" ? "bg-black/50" : "bg-gray-900/50"
      }`}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
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
          <h3 className="font-semibold flex items-center gap-2">
            <FiAlertTriangle className="text-red-500" />
            Confirm Deletion
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6">
          <p
            className={`mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {description}
          </p>

          <div className="flex justify-end gap-3">
            <button
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
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
