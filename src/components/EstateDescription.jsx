import React from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, TrendingUp } from "lucide-react";

const EstateDescription = () => {
  return (
    <section className="relative h-auto overflow-hidden text-gray-300 py-24 px-6 md:px-16">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-90"
        style={{
          backgroundImage: `url('/images/aerial-image.png')`,
        }}
        data-scroll
        data-scroll-speed="-1"
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-white mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose <span className="text-emerald-400">Lush Estate?</span>
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Nestled inside the famous{" "}
          <span className="text-white">Admiralty Drive, Ibusa</span>, Lush
          Estate combines serenity, security, and strategic investment growth —
          a future-forward community designed for peace and prosperity.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-10 mt-10">
          <motion.div
            className="bg-gray-900/80 p-8 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1 }}
            data-scroll
            data-scroll-speed="1"
          >
            <MapPin className="text-emerald-400 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Prime Location
            </h3>
            <p className="text-gray-300">
              Situated within Admiralty Drive, Ibusa — a thriving hub of
              opportunity and development.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-900/80 p-8 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.2 }}
            data-scroll
            data-scroll-speed="1.5"
          >
            <ShieldCheck className="text-emerald-400 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Full Security
            </h3>
            <p className="text-gray-300">
              Fully fenced and secured. Free from encumbrances and land
              grabbing.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-900/80 p-8 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.4 }}
            data-scroll
            data-scroll-speed="2"
          >
            <TrendingUp className="text-emerald-400 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Investment Growth
            </h3>
            <p className="text-gray-300">
              Like Okpanam Federal Housing Estate (₦1M → ₦100M), projected
              growth for Lush Estate is ₦30M by 2030.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EstateDescription;
