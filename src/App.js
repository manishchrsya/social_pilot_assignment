import React, { useState } from "react";
import "./App.css";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stage1 from "./Components/Stage1/Stage1";
import Stage2 from "./Components/Stage2/Stage2";
import Stage3 from "./Components/Stage3/Stage3";

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [csvData, setCsvData] = useState('')
  const [formData, setFormData] = useState('')

  console.log("activeStep", activeStep);
  console.log('csvData', csvData);
  
  const stageNames = () => {
    return ["Stage1", "Stage2", "Stage3"];
  };

  const getStepContent = (step) => {
    if (step === 0) {
      return (
        <div className="stage-data">
          <Stage1 setActiveStep={setActiveStep} setCsvData={setCsvData} />
        </div>
      );
    }
    else if (step === 1) {
      return (
        <div className="stage-data">
          <Stage2 csvData={csvData} setActiveStep={setActiveStep} setFormData={setFormData} />
        </div>
      );
    }
    else if (step === 2) {
      return (
        <div className="stage-data">
          <Stage3 formData={formData} />
        </div>
      );
    }
  };

  const steps = stageNames();

  return (
    <div className="main-container">
        <div className='main-heading' >
            <h1>SOCIAL PILOT ASSIGNMENT</h1>
        </div>
      <Stepper activeStep={activeStep}>
        {/* {console.log("steps", steps)} */}
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepButton>{label}</StepButton>
            </Step>
          );
        })}
      </Stepper>

      <div>{getStepContent(activeStep)}</div>
    </div>
  );
};

export default App;

