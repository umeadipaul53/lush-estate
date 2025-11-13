import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reservePlots, fetchPlots } from "../reducers/plotReducer";
import Swal from "sweetalert2";
import { useToast } from "../toastContext/useToast";

const PlotReservation = () => {
  const dispatch = useDispatch();
  const { plots, error } = useSelector((state) => state.plots);
  const navigate = useNavigate();
  const [selectedPlots, setSelectedPlots] = useState([]);
  const [paymentPlan, setPaymentPlan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handlePlotClick = (plot) => {
    if (plot.status !== "available") return;

    if (selectedPlots.includes(plot.plotNumber)) {
      // If already selected, unselect it
      setSelectedPlots(selectedPlots.filter((num) => num !== plot.plotNumber));
    } else {
      // Otherwise, select it
      setSelectedPlots([...selectedPlots, plot.plotNumber]);
    }
  };

  const handlePaymentChange = (plan) => setPaymentPlan(plan);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedPlots?.length || !paymentPlan) {
      showToast("Please select at least one plot and a payment plan.", "error");
      return;
    }

    const confirmation = await Swal.fire({
      title: "Reserve Plots",
      text: "Are you sure you want to reserve these plots?",
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (confirmation.isConfirmed) {
      setIsSubmitting(true);
      try {
        const res = await dispatch(
          reservePlots({ selectedPlots, paymentPlan })
        ).unwrap();

        showToast(res.message, "success");

        setTimeout(() => {
          navigate("/user-questionnaire");
        }, 1500);
      } catch (err) {
        console.error("Reservation error:", err);
        showToast(err?.message || "Something went wrong", "error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchPlots());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-30 px-6 md:px-20">
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          🏡 Plot Reservation
        </h1>

        {/* Plot Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12">
          {plots.map((plot) => {
            const isSelected = selectedPlots.includes(plot.plotNumber);
            const colorMap = {
              available: "bg-green-500 hover:bg-green-600 cursor-pointer",
              reserved: "bg-yellow-400 opacity-70 cursor-not-allowed",
              sold: "bg-red-500 opacity-70 cursor-not-allowed",
            };

            return (
              <motion.div
                key={plot._id}
                onClick={() => handlePlotClick(plot)}
                whileHover={
                  plot.status === "available" ? { scale: 1.05 } : { scale: 1.0 }
                }
                className={`relative flex items-center justify-center rounded-2xl h-24 text-white font-semibold text-xl transition-all ${
                  colorMap[plot.status]
                } ${isSelected ? "ring-4 ring-blue-500" : ""}`}
              >
                {plot.plotNumber}
                {isSelected && (
                  <CheckCircle className="absolute top-2 right-2 text-blue-200" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Selected Plots */}
        {selectedPlots.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <p className="text-gray-700 font-medium">
              Selected Plots:{" "}
              <span className="text-blue-700 font-semibold">
                {selectedPlots.join(", ")}
              </span>
            </p>
          </div>
        )}

        {/* Payment Options */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            Choose Payment Plan
          </h2>

          <div className="flex justify-center gap-6 mt-6">
            {[
              { label: "3 Months Plan", value: "3 months", icon: Clock },
              { label: "6 Months Plan", value: "6 months", icon: Clock },
              { label: "12 Months Plan", value: "12 months", icon: Clock },
              {
                label: "Outright Full Payment",
                value: "Full Payment",
                icon: CheckCircle,
              },
            ].map(({ label, value, icon: Icon }) => (
              <motion.button
                key={value}
                onClick={() => handlePaymentChange(value)}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
                  paymentPlan === value
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            onClick={(e) => handleSubmit(e)}
            whileHover={{ scale: 1.05 }}
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all"
          >
            {isSubmitting ? "Processing..." : "Confirm Reservation"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlotReservation;
