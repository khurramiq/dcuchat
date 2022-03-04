import React from "react";
import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#328cc1",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}      
    />
  );
}

const TrueFalseRow = ({ quizQuestion, setQuizQuestion }) => {
  const handleQuestionTrueFalse = (clicked, prevValue) => {
    setQuizQuestion({
      ...quizQuestion,
      trueFalse: {
        _true: clicked==='_true'?!prevValue:prevValue,
      _false: clicked==='_false'?!prevValue:prevValue,
      }
    });
  }
  return (
    <Grid container xs={12} className="question_row">
      <Grid item xs={4} className="question_label">
        Correct Answer?
      </Grid>
      <Grid item xs={8} className="middle_cell">
        <FormControl component="fieldset">
          <RadioGroup aria-label="gender" name="customized-radios">
            <FormControlLabel
              value="true"              
              control={
                <StyledRadio
                  checked={quizQuestion.trueFalse._true}
                  onChange={()=>handleQuestionTrueFalse('_true', quizQuestion.trueFalse._true)}
                  quizQuestion={quizQuestion}
                />
              }
              label="True"
            />            
            <FormControlLabel
              value="false"
              control={
                <StyledRadio
                  checked={quizQuestion.trueFalse._false}
                  onChange={()=>handleQuestionTrueFalse('_false', quizQuestion.trueFalse._false)}                  
                />
              }
              label="False"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default TrueFalseRow;
