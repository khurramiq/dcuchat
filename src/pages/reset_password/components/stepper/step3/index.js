import React from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import {  useSelector } from "react-redux";

const Step3 = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordClientSideError,
}) => {
  const _User = useSelector((state) => state.User);
  return (
    <div className="reset-password-step-wrapper">
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        className="form-control"
        placeholder="Your password"
        required
        fullWidth
      />
      <TextField
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        variant="outlined"
        className="form-control"
        placeholder="Please confirm your password"
        required
        fullWidth
      />
      <div>
      {_User.passwordChangeLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <CircularProgress />
            </div>
          ) : (
            <p style={{ color: "red", textAlign: "center" }}>
              {_User.passwordChangeErr}
            </p>
          )}
        <p style={{ color: "red" }}>{passwordClientSideError}</p>
      </div>
    </div>
  );
};

export default Step3;
