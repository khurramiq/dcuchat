import React from "react";
import { Grid, TextField } from "@material-ui/core";

const Question = ({ i, item, userSecurityAnswers, handleAnswersChange }) => {
  let answer = '';
  if (i === 0) {
    answer = userSecurityAnswers.answer1;
  }
  if (i === 1) {
    answer = userSecurityAnswers.answer2;
  }
  if (i === 2) {
    answer = userSecurityAnswers.answer3;
  }
  return (
    <>
      <Grid key={i} container xs={12} className="question-row">
        <Grid item xs={12} sm={1}>
          Question1:
        </Grid>
        <Grid item xs={12} sm={11}>
          <p>{item.question}</p>
        </Grid>
      </Grid>
      <Grid container xs={12} className="question-row">
        <Grid item xs={12} sm={1}>
          Answer:
        </Grid>
        <Grid item xs={12} sm={11}>
          <TextField
            value={answer}
            onChange={(e) => handleAnswersChange(i, e.target.value)}
            variant="outlined"
            className="form-control"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Question;
