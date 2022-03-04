import { Button, Grid } from "@material-ui/core";
// import { Delete } from "@material-ui/icons";

import React from "react";

const ActionsRow = ({
  quizQuestion,
  handleCancleButton,
  editingQuestion,  
  deleteItemQuestion,
}) => {
  return (
    <Grid container xs={12} sm={12} className="question_row">
      <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
        {editingQuestion ? (
          <Button
            type="submit"
            variant="outlined"            
            style={{
              color: "#ff8c00", borderColor: "#ff8c00",
              marginLeft: "20px",
            }}            
          >
            Update
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outlined"
            style={{
              color: "#ff8c00", borderColor: "#ff8c00",
              marginLeft: "20px",
            }}
          >
            Save
          </Button>
        )}
        &nbsp;&nbsp;&nbsp;
        <Button
          variant="outlined"
          style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
          onClick={() => handleCancleButton()}
        >
          Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;
        {editingQuestion && (
          <Button
            variant="outlined"
            style={{ color: "#fff", borderColor: "#d72924", backgroundColor:'#d72924' }}
            onClick={() => deleteItemQuestion(quizQuestion)}
          >
            Delete
          </Button>
        )}
      </Grid>
      <Grid item xs={12} sm={3} className="middle_cell"></Grid>
      <Grid item xs={12} sm={3}></Grid>
    </Grid>
  );
};

export default ActionsRow;
