import React, { useState } from "react";
import WhyEstateForm from "./forms/WhyEstateForm";
import VirtualInspectionForm from "./forms/VirtualInspectionForm";
import TrustCredibilityForm from "./forms/TrustCredibilityForm";
import FaqForm from "./forms/FaqForm";
import FeaturesAmenitiesForm from "./forms/FeaturesAmenitiesForm";
import LocationAdvantageForm from "./forms/LocationAdvantageForm";

const StepBuilder = ({ steps, setSteps }) => {
  const [stepType, setStepType] = useState("");

  const stepOptions = [
    { value: "whyEstate", label: "Why Estate" },
    { value: "virtualInspection", label: "Virtual Inspection" },
    { value: "trustCredibility", label: "Trust & Credibility" },
    { value: "faq", label: "FAQ" },
    { value: "featuresAmenities", label: "Features & Amenities" },
    { value: "locationAdvantage", label: "Location Advantage" },
  ];

  // Filter out steps already added
  const availableSteps = stepOptions.filter(
    (opt) => !steps.some((s) => s.stepType === opt.value)
  );

  const renderForm = () => {
    switch (stepType) {
      case "whyEstate":
        return <WhyEstateForm onSave={addStep} />;
      case "virtualInspection":
        return <VirtualInspectionForm onSave={addStep} />;
      case "trustCredibility":
        return <TrustCredibilityForm onSave={addStep} />;
      case "faq":
        return <FaqForm onSave={addStep} />;
      case "featuresAmenities":
        return <FeaturesAmenitiesForm onSave={addStep} />;
      case "locationAdvantage":
        return <LocationAdvantageForm onSave={addStep} />;
      default:
        return null;
    }
  };

  const addStep = (data) => {
    // Safety check: Prevent duplicate (even if UI is bypassed)
    if (steps.some((s) => s.stepType === stepType)) {
      alert("You cannot add this step twice.");
      return;
    }

    setSteps([...steps, { stepType, data }]);
    setStepType(""); // Reset dropdown
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Add Estate Steps</h2>

      {/* Step Selector */}
      <div>
        <label className="block text-gray-600 font-medium mb-2">
          Select Step Type
        </label>

        <select
          value={stepType}
          onChange={(e) => setStepType(e.target.value)}
          disabled={availableSteps.length === 0}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Choose a step...</option>

          {availableSteps.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {availableSteps.length === 0 && (
          <p className="text-sm text-red-500 mt-2">
            All available steps have been added.
          </p>
        )}
      </div>

      {/* Dynamic Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        {renderForm() || (
          <p className="text-gray-500 text-sm">
            Select a step type to begin building.
          </p>
        )}
      </div>

      {/* Added Steps List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Steps Added
        </h3>

        {steps.length === 0 ? (
          <p className="text-gray-500 text-sm">No steps added yet.</p>
        ) : (
          <ul className="space-y-3">
            {steps.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg border border-gray-200"
              >
                <span className="text-gray-800 font-medium">
                  {index + 1}. {formatLabel(item.stepType)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/* Format Step Type Into Readable Label */
function formatLabel(type) {
  const labels = {
    whyEstate: "Why Estate",
    virtualInspection: "Virtual Inspection",
    trustCredibility: "Trust & Credibility",
    faq: "FAQ",
    featuresAmenities: "Features & Amenities",
    locationAdvantage: "Location Advantage",
  };
  return labels[type] || type;
}

export default StepBuilder;
