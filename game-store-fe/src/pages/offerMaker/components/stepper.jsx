import React from "react";
import { BACK, CREATE_OFFER, NEXT } from "../../../utils/textConstants";

const Stepper = ({ steps, currentStep, nextStep, prevStep, onSubmit }) => {
  const handleSubmit = () => {
    if (currentStep < steps.length - 1) {
      nextStep();
    } else {
      onSubmit();
    }
  };

  return (
    <>
      <div className="steps">{steps[currentStep]}</div>
      <div className="stage1">
        {currentStep < steps.length - 1 ? (
          <button className="stage-btn" onClick={handleSubmit}>
            {NEXT}
          </button>
        ) : (
          <button className="confirm-btn" onClick={handleSubmit}>
            {CREATE_OFFER}
          </button>
        )}
        {currentStep > 0 && (
          <button className="stage-btn" type="button" onClick={prevStep}>
            {BACK}
          </button>
        )}
      </div>
    </>
  );
};

export default Stepper;
