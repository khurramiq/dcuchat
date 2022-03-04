import React from "react";
import { Button, FormGroup, FormLabel } from "@material-ui/core";
import Choices from "./choices";
import { resetDefaultChoices } from '../../../../pages/myTests/actions';

const checkBoxCorrectValues = ({ question, setQuestion }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <FormLabel component="legend">Default Value</FormLabel>
      <FormGroup>
        <Choices          
          choices={question.choiceData.choices}
          question={question}
          setQuestion={setQuestion}
        />
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

export default checkBoxCorrectValues;
