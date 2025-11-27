// components/StepLoader.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import WhyEstateDisplay from "../stepComponents/WhyEstateDisplay";
import LocationAdvantageDisplay from "../stepComponents/LocationAdvantageDisplay";
import FeaturesAmenitiesDisplay from "../stepComponents/FeaturesAmenitiesDisplay";
import VirtualInspectionDisplay from "../stepComponents/VirtualInspectionDisplay";
import FaqDisplay from "../stepComponents/FaqDisplay";
import TrustCredibilityDisplay from "../stepComponents/TrustCredibilityDisplay";

const StepLoader = ({ step, setIsNextEnabled }) => {
  const { stepType, stepNumber, data } = step;

  // Reset next button each time step changes
  useEffect(() => {
    setIsNextEnabled(false);
  }, [stepNumber, setIsNextEnabled]);

  const mapping = {
    whyEstate: (
      <WhyEstateDisplay
        data={data}
        stepNumber={stepNumber}
        setIsNextEnabled={setIsNextEnabled}
      />
    ),
    locationAdvantage: (
      <LocationAdvantageDisplay
        data={data}
        stepNumber={stepNumber}
        setIsNextEnabled={setIsNextEnabled}
      />
    ),
    featuresAmenities: (
      <FeaturesAmenitiesDisplay
        data={data}
        stepNumber={stepNumber}
        setIsNextEnabled={setIsNextEnabled}
      />
    ),
    virtualInspection: (
      <VirtualInspectionDisplay
        data={data}
        stepNumber={stepNumber}
        setIsNextEnabled={setIsNextEnabled}
      />
    ),
    faq: (
      <FaqDisplay
        data={data}
        stepNumber={stepNumber}
        setIsNextEnabled={setIsNextEnabled}
      />
    ),
    trustCredibility: (
      <TrustCredibilityDisplay
        data={data}
        stepNumber={stepNumber}
        setIsNextEnabled={setIsNextEnabled}
      />
    ),
  };

  return (
    mapping[stepType] || (
      <div className="text-center py-8">
        <p className="text-gray-500">
          This step type is not supported yet: {stepType}
        </p>
      </div>
    )
  );
};

export default StepLoader;
