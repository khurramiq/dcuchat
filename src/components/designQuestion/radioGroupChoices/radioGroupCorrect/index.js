import React from "react";
import { Button, FormGroup, FormLabel, RadioGroup } from "@material-ui/core";
import Choices from "./choices";
import { resetCorrectChoices } from "../../../../pages/myTests/actions";

const RadioGroupCorrectChoices = ({ question, setQuestion }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <FormLabel component="legend">Correct Answer</FormLabel>
      <FormGroup>
        <RadioGroup aria-label="radiogroup" name="radiogroup">
          <Choices
            choices={question.choiceData.choices}
            question={question}
            setQuestion={setQuestion}
          />
        </RadioGroup>
      </FormGroup>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "5px" }}
        onClick={() => resetCorrectChoices(question, setQuestion)}
      >
        Reset
      </Button>
    </div>
  );
};

export default RadioGroupCorrectChoices;
