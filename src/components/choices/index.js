import React from "react";
import { Button, Grid } from "@material-ui/core";
import EditableChoices from "./editableChoices";
import { addNewChoice, removeAllChoices } from '../../pages/myTests/actions';

const Choices = (props) => {
  const { question, setQuestion } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid
          style={{ marginTop: "10px", marginLeft: "10%" }}
          container
          spacing={1}
        >
          <Grid item xs={5}>
            <div
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Value
            </div>
          </Grid>
          <Grid item xs={5}>
            <div
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Text
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <EditableChoices
          choices={question.choiceData.choices}
          question={question}
          setQuestion={setQuestion}
        />
      </Grid>
      <Button
        variant="contained"
        color="primary"
        style={{backgroundColor: "#1769AA", marginTop: "30px", marginLeft: "9%" }}
        onClick={() => addNewChoice(question, setQuestion)}
      >
        Add New
      </Button>

      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "30px", marginLeft: "10px" }}
        onClick={() => removeAllChoices(question, setQuestion)}
      >
        Remove All
      </Button>
    </>
  );
};

export default Choices;
