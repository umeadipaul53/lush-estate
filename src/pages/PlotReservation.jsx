import React from "react";
import { motion } from "framer-motion";
import { MapPin, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PlotReservation = () => {
  const estate = useSelector((state) => state.estates.estate);
  const navigate = useNavigate();

  const estateName = estate.estateName;

  const handlePlotReservation = () => {
    if (estateName === "LUSH ESTATE") {
      window.location.href =
        "https://developer.sytemap.com/map/lush-estate-phase-3-";
    } else if (estateName === "ROCKVIEW ESTATE") {
      window.location.href =
        "https://developer.sytemap.com/map/lush-estate-phase-3-";
    }
  };

  const handleInspection = () => {
    navigate("/user-questionnaire");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-20 px-6 md:px-20 flex justify-center items-center">
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-14"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          What Would You Like To Do?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* OPTION 1 — Plot Reservation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handlePlotReservation}
            className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-2xl p-8 flex flex-col items-center shadow-xl hover:shadow-2xl transition-all"
          >
            <MapPin className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Plot Reservation</h2>
            <p className="text-center opacity-90">
              Proceed to reserve your preferred plot directly through our
              mapping platform.
            </p>
          </motion.div>

          {/* OPTION 2 — Physical Inspection */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleInspection}
            className="cursor-pointer bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl p-8 flex flex-col items-center shadow-xl hover:shadow-2xl transition-all"
          >
            <ClipboardList className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Schedule Physical Inspection
            </h2>
            <p className="text-center opacity-90">
              Book a date for an on-site inspection to see the property
              physically.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlotReservation;
