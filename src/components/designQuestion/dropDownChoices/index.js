import React from "react";
import { Button, FormGroup, FormLabel } from "@material-ui/core";
import Choices from "./choices";
import { resetDropdownDefaultChoice, resetDropdownCorrectChoice } from '../../../pages/myTests/actions';

const DropDownChoices = ({ label, name, question, setQuestion }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        <Choices
          choices={question.choiceData.choices}
          question={question}
          setQuestion={setQuestion}
          name={name}
        />
      </FormGroup>      
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "8px" }}
        onClick={name==="dropDownDefaultAnswer"?() => resetDropdownDefaultChoice(question, setQuestion):() => resetDropdownCorrectChoice(question, setQuestion)}
      >
        Reset
      </Button>
    </div>
  );
};

export default DropDownChoices;
