import { createContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";

export const ToastContext = createContext();

const toastStyles = {
  success: { bg: "bg-green-600", icon: <CheckCircle size={18} /> },
  error: { bg: "bg-red-600", icon: <XCircle size={18} /> },
  warning: { bg: "bg-yellow-500", icon: <AlertCircle size={18} /> },
  info: { bg: "bg-blue-600", icon: <Info size={18} /> },
};

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 5000);
  };

  const closeToast = () => setToast({ message: "", type: "" });

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <AnimatePresence>
        {toast.message && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium z-50 flex items-center space-x-2 ${
              toastStyles[toast.type]?.bg || "bg-gray-800"
            }`}
          >
            {toastStyles[toast.type]?.icon}
            <span>{toast.message}</span>
            <button onClick={closeToast} className="ml-2 font-bold">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}
