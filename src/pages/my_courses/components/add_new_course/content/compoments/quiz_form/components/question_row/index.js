import { Grid, TextareaAutosize } from "@material-ui/core";
import React from "react";

const QuestionRow = ({ thirdColumn, questionText, handleQuestionTextChange }) => {
  return (
    <Grid container xs={12} className="question_row">
      <Grid item xs={12} sm={4} className="question_label">
        Question
      </Grid>
      <Grid item xs={12} sm={6} className="middle_cell">
        <TextareaAutosize
          required
          id="questionText"
          name="questionText"
          className="input_s"          
          value={questionText}
          onChange={handleQuestionTextChange}
          rowsMin={3}
          placeholder="Enter question here."
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        {thirdColumn && <span className="correct_ans">Correct Answer?</span>}
      </Grid>
    </Grid>
  );
};

export default QuestionRow;
