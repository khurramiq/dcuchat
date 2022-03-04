import React from "react";
import ResetPasswordSteps from "./components/stepper";

import "./style.css";

const ResetPassword = () => {
  return (
    <div className="reset-password-wrapper">
      <ResetPasswordSteps />
    </div>
  );
};

export default ResetPassword;
