import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/get-started");
  };

  return (
    <motion.section
      className="relative bg-gradient-to-r from-emerald-700 to-green-500 py-24 text-center text-white overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Decorative Background Shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

      <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
        Begin Your Wealth Discovery Journey Today
      </h2>
      <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10">
        Secure your spot in the next fast-rising estate in Admiralty Drive,
        Ibusa. Peace, security, and appreciation await you.
      </p>

      <motion.a
        onClick={handleClick}
        className="relative inline-block bg-gradient-to-r from-white to-gray-100 text-emerald-600 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
        whileHover={{ scale: 1.08 }}
      >
        Get Started Now
        {/* Optional animated arrow */}
        <motion.span
          className="ml-3 inline-block"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          ➔
        </motion.span>
      </motion.a>
    </motion.section>
  );
};

export default CallToAction;
