import React from 'react';
import { BACK, CREATE_OFFER, NEXT } from '../../../utils/textConstants';

const Stepper = ({ steps, currentStep, nextStep, prevStep, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      nextStep();
    } else {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {steps[currentStep]}
      <div className='stage1'>
        {currentStep > 0 && (
          <button className="stage-btn" type="button" onClick={prevStep}>
            {BACK}
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button className="stage-btn" type="submit">
            {NEXT}
          </button>
        ) : (
          <button className="confirm-btn" type="submit">
            {CREATE_OFFER}
          </button>
        )}
      </div>
    </form>
  );
};

export default Stepper;
