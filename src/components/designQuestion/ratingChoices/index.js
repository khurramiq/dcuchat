import React from "react";
import { Typography } from "@material-ui/core";
import Choices from "./choices";

const RatingChoices = ({ label, flag, question, setQuestion }) => {
  return (
    <>
      <Typography component="legend" style={{ marginTop: "10px" }}>
        {label}
      </Typography>
      <Choices question={question} setQuestion={setQuestion} flag={flag} />
    </>
  );
};

export default RatingChoices;
