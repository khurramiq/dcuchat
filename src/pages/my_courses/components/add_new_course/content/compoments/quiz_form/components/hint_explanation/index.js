import { Grid, TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";

const HintExplanation = ({
  quizQuestion,
  handle_Hint_Explanation,
  handleOrderChange,
  questionNumberError,
  questionNumberErrorText,
}) => {
  return (
    <div>
      {/* Hint start */}
      <Grid container xs={12} sm={12} className="question_row">
        <Grid item xs={12} sm={4} className="question_label">
          Hint
          <p style={{ fontSize: "12px" }}>
            (Optional) Use this to guide the user that they should make a
            selection.
          </p>
        </Grid>
        <Grid item xs={12} sm={6} className="middle_cell">
          <TextareaAutosize
            id="hint"
            className="input_s"
            aria-label="minimum height"
            rowsMin={5}
            placeholder="Enter hint here."
            name="hint"
            value={quizQuestion.hint}
            onChange={handle_Hint_Explanation}
          />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
      {/* Hint end */}
      {/* Explanation start */}
      <Grid container xs={12} sm={12} className="question_row">
        <Grid item xs={12} sm={4} className="question_label">
          Explanation
          <p style={{ fontSize: "12px" }}>
            (Optional) Display after the quiz is submitted to offer information
            on the correct answer.
          </p>
        </Grid>
        <Grid item xs={12} sm={6} className="middle_cell">
          <TextareaAutosize
            id="explanation"
            className="input_s"
            aria-label="minimum height"
            rowsMin={5}
            placeholder="Enter explanation here."
            name="explanation"
            value={quizQuestion.explanation}
            onChange={handle_Hint_Explanation}
          />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
      <Grid container xs={12} sm={12} className="question_row">
        <Grid item xs={12} sm={4} className="question_label">
          Question Number
        </Grid>
        <Grid item xs={12} sm={6} className="middle_cell">
          <TextField
            label="Question Number"
            name="order"
            placeholder="Enter the Question Number."
            value={quizQuestion.order}
            type="number"
            onChange={(e) => handleOrderChange(e.target.value)}
            variant="outlined"
            fullWidth
            required
            // style={{ backgroundColor: "#fff" }}
            error={questionNumberError ? true : false}
            helperText={questionNumberErrorText}
          />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
      {/* Explanation end */}
    </div>
  );
};

export default HintExplanation;
