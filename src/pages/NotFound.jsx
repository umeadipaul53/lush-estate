import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-300">
      <motion.h1
        className="text-8xl font-extrabold text-red-600 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-2xl text-red-700 dark:text-red-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Oops! Page Not Found
      </motion.p>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-green-950 text-white rounded-lg hover:bg-green-950 transition-colors"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
