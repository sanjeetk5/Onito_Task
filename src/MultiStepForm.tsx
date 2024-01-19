// MultiStepForm.tsx

import React, { useState } from 'react';
import Step1Form, { Step1FormData } from './Step1Form'; // Import Step1FormData type
import Step2Form, { Step2FormData } from './Step2Form';
// import { submitFormData } from './store';
import { useDispatch } from 'react-redux';
import { submitUserData } from './Reducer/action';
import { useNavigate } from 'react-router-dom';

const MultiStepForm: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [step1FormData, setStep1FormData] = useState<Step1FormData | null>(null);

  const handleStep1Submit = (data: Step1FormData) => {
    setStep1FormData(data);
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: Step2FormData) => {
    // Perform any necessary actions with the combined form data
    const combinedFormData = { ...step1FormData, ...data };
    console.log('Combined Form Data:', { ...step1FormData, ...data });
    // dispatch(submitStep1(step1FormData));
    // dispatch(submitStep2(data));
    // dispatch(submitFormData({ step1: step1FormData, step2: data }))
    // console.log(submitFormData())

    dispatch(submitUserData(combinedFormData));
    console.log(submitUserData(combinedFormData))
    navigate("/table")

  };

  return (
    <div>
      {currentStep === 1 && <Step1Form onNext={handleStep1Submit} />}
      {currentStep === 2 && <Step2Form onSubmit={handleStep2Submit} />}
    </div>
  );
};

export default MultiStepForm;
