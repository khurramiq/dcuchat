import React from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";

const Step1 = ({ email, setEmail, clientSideEmailErr }) => {
  const _User = useSelector((state) => state.User);
  return (
    <div className="reset-password-step-wrapper">
      <TextField
        className="inputfields"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        label="Enter your email"
        variant="outlined"
        required
        error={clientSideEmailErr.length > 0 ? true : false}
        helperText={clientSideEmailErr}
      />
      {_User.userSecurityQuestionsLoading ? (
        <div style={{ textAlign: "center", padding: "20px"}}>
          <CircularProgress />
        </div>
      ) : (
        <p style={{ color: "red" }}>{_User.userSecurityQuestionErr}</p>
      )}
    </div>
  );
};

export default Step1;
