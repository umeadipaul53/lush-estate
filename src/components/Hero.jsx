import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-estate");
  };
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/entrance_video.mp4" // Replace with your local file or URL
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 text-white">
        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Lush Estate —{" "}
          <span className="text-white block">
            Where Peace of Mind Meets Property Appreciation
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="max-w-2xl text-gray-300 text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Just like the Famous Federal Housing Estate In Okpanam,{" "}
          <span className="text-white">
            which was Sold in 2010-2015 between the prices of 1m-10m, which.
          </span>{" "}
          Now have an average price of 60-100m for a plot, History is repeating
          itself in Admiralty drive, Lands in Admiralty in 2021 once sold for 1m
          Naira now. History is repeating itself with lush estate which will
          have a projected Growth Value of{" "}
          <span className="text-gray-300 font-semibold">₦30M by 2030.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="bg-black text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-black/50"
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Start Your Wealth Discovery Journey
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <span className="text-sm tracking-widest mb-2">SCROLL</span>
          <ChevronDown className="animate-bounce w-6 h-6 text-emerald-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
