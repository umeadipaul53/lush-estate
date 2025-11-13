import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Building2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 py-20 px-6 md:px-20 border-t border-gray-800 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Social Proof Logos / Badges */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Tehlex logo placeholder */}
          <div className="flex items-center gap-2">
            {/* <img src="/logos/tehlex.png" alt="Tehlex Logo" className="h-6" /> use in place of Building2 */}
            <Building2 className="text-emerald-400 w-6 h-6" />
            <span className="text-sm uppercase tracking-widest font-semibold">
              Tehlex
            </span>
          </div>

          {/* Certified Estate */}
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-400 w-6 h-6" />
            <span className="text-sm uppercase tracking-widest font-semibold">
              Certified Estate
            </span>
          </div>

          {/* Developer Excellence */}
          <div className="flex items-center gap-2">
            <Award className="text-emerald-400 w-6 h-6" />
            <span className="text-sm uppercase tracking-widest font-semibold">
              Developer Excellence
            </span>
          </div>
        </motion.div>

        {/* Divider Line */}
        <div className="w-full border-t border-gray-800"></div>

        {/* Copyright */}
        <motion.p
          className="text-center text-sm text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          © {currentYear}{" "}
          <span className="text-white font-semibold">Lush Estate</span>. All
          rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;
