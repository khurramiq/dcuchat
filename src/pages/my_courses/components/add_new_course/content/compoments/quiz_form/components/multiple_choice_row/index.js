import { Grid, TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import CustomizedCheckbox from "../../../../../detail/components/customized_checkbox";

const MultipleChoiceRow = ({
  item,
  i,
  handle_MultipleChoice_ChoiceText,
  handle_MultipleChoice_CorrectAnswer,
  MultipleChoice_AddChoice_Button,
  MultipleChoice_deleteChoice,
}) => {
  return (
    <Grid container xs={12} sm={12} className="question_row">
      <Grid item xs={4} className="question_label">
        Choice {i + 1}
      </Grid>
      <Grid item xs={12} sm={6} className="middle_cell">
        <TextField
          id={i}
          required
          className="input_s"
          variant="outlined"
          value={item.choice}
          onChange={(e) => handle_MultipleChoice_ChoiceText(e.target.value, i)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <div className="icons_wrapper">
          <CustomizedCheckbox
            checked={item.correctAnswer}
            onChange={() =>
              handle_MultipleChoice_CorrectAnswer(!item.correctAnswer, i)
            }
          />
          &nbsp;&nbsp;&nbsp;
          <button
            className="pls_btn"
            onClick={() => MultipleChoice_AddChoice_Button(i)}
          >
            +
          </button>
          &nbsp;&nbsp;&nbsp;
          <Delete
            style={{ color: "red", marginTop: "5px" }}
            onClick={() => MultipleChoice_deleteChoice(i)}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default MultipleChoiceRow;
