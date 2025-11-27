import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-estate");
  };

  return (
    <motion.section
      className="relative bg-gradient-to-r from-black to-gray-800 py-24 text-center text-white overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Silver glow accents */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gray-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gray-300/10 rounded-full blur-3xl"></div>

      <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
        Begin Your Wealth Discovery Journey Today
      </h2>

      <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10 text-gray-300">
        Secure your spot in a rising estate at Admiralty Drive, Ibusa. Peace,
        security, and appreciation await you.
      </p>

      {/* Button */}
      <motion.button
        onClick={handleClick}
        className="relative inline-block bg-white text-black font-bold px-10 py-4 rounded-full shadow-xl hover:bg-black hover:text-white border border-gray-300 transition-all transform hover:scale-105"
        whileHover={{ scale: 1.08 }}
      >
        Get Started Now
        <motion.span
          className="ml-3 inline-block"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          ➔
        </motion.span>
      </motion.button>
    </motion.section>
  );
};

export default CallToAction;
