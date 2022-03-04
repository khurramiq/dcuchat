import React from "react";
import Step1 from "../step1";
import Step2 from "../step2";
import Step3 from "../step3";

const StepContent = ({
  step,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordClientSideError,
  clientSideEmailErr,
  userSecurityAnswers,
  setUserSecurityAnswers,
}) => {
  switch (step) {
    case 0:
      return (
        <Step1
          email={email}
          setEmail={setEmail}
          clientSideEmailErr={clientSideEmailErr}
        />
      );
    case 1:
      return (
        <Step2
          email={email}
          userSecurityAnswers={userSecurityAnswers}
          setUserSecurityAnswers={setUserSecurityAnswers}
        />
      );
    case 2:
      return (
        <Step3
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          passwordClientSideError={passwordClientSideError}
        />
      );
    default:
      return "Unknown step";
  }
};

export default StepContent;
