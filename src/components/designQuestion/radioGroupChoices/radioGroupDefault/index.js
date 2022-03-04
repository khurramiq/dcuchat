import React from "react";
import { Button, FormGroup, FormLabel, RadioGroup } from "@material-ui/core";
import Choices from "./choices";
import { resetDefaultChoices } from "../../../../pages/myTests/actions";

const RadioGroupDefaultChoices = ({ question, setQuestion }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <FormLabel component="legend">Default Value</FormLabel>
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
        onClick={() => resetDefaultChoices(question, setQuestion)}
      >
        Reset
      </Button>
    </div>
  );
};

export default RadioGroupDefaultChoices;
