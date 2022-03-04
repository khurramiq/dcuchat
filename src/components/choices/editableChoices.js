import React from "react";
import { Grid, TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import {
  choicesValueChange,
  choicesTextChange,
  removeSingleChoice,
} from "../../pages/myTests/actions";

const EditableChoices = ({ choices, question, setQuestion }) =>
  choices
    ? choices.map((choice, i) => {
        return (
          <Grid
            style={{ marginTop: "10px", marginLeft: "10%" }}
            container
            spacing={1}
            key={i}
          >
            <Grid item xs={5}>
              <TextField
                label="Value"
                variant="outlined"
                value={choice.value}
                onChange={(e) =>
                  choicesValueChange(i, e.target.value, question, setQuestion)
                }
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Text"
                variant="outlined"
                value={choice.text}
                onChange={(e) =>
                  choicesTextChange(i, e.target.value, question, setQuestion)
                }
              />
            </Grid>
            <Grid item xs={2}>
              <ClearIcon
                style={{ marginTop: "13px", marginLeft: "3px", zindex: 10 }}
                onClick={(e) =>
                    removeSingleChoice(i, question, setQuestion)
                  }
              />
            </Grid>
          </Grid>
        );
      })
    : null;

export default EditableChoices;
