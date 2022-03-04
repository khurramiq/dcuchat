import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { dropDownValueChange } from "../../../pages/myTests/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
}));

const Choices = ({ choices, question, setQuestion, name }) => {
  const classes = useStyles();
  return (
    <div style={{ textAlign: "center" }}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={
            name === "dropDownDefaultAnswer"
              ? question.choiceData.dropDownDefaultAnswer
              : name === "dropDownCorrectAnswer"
              ? question.choiceData.dropDownCorrectAnswer
              : ""
          }
          onChange={(e) => {
            dropDownValueChange(name, e.target.value, question, setQuestion);
          }}
          style={{ width: "100%" }}
        >
          <option value=""> --- Select --- </option>
          {choices && choices.length > 0
            ? choices.map((choice, i) => (
                <option value={choice.value ? choice.value : "Item" + (i + 1)}>
                  {choice.text
                    ? choice.text
                    : choice.value
                    ? choice.value
                    : "Item" + (i + 1)}
                </option>
              ))
            : null}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default Choices;
