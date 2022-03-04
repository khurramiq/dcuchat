import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import { attempt_Answer, attempt_lastQuiz_Answer } from "../../../../redux/actions/lessonActions";
import { useDispatch } from "react-redux";
import CustomizedCheckbox from "../../../my_courses/components/add_new_course/detail/components/customized_checkbox";

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
    backgroundColor: "#07377f",
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

const LessonDetailQuestions = ({
  currentQuizeNo,
  currentQuize,
  lastQuestionNo,
  handleShowAnswers,
  nextQuizId,
  nextLessonId,
  nextChapterId,
  courseId,
  lessonId,
  chapterId,
  quizAttemptType,
  setLastQuiz,
  mylearning
}) => {
  const dispatch = useDispatch();
  const [openEndedAnswer, setOpenEndedAnswer] = useState("");
  const [trueOption, setTrueOption] = useState(false);
  const [falseOption, setFalseOption] = useState(false);
  const [multipleChoiceAnswer, setMultipleChoiceAnswer] = useState([]);
  const [disable, setDisable] = useState(true);
  const [multipleChoiceFlage, setMultipleChoiceFlage] = useState(true);

  useEffect(() => {
    if (currentQuize.questionType === "true false") {
      setDisable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trueOption, falseOption]);

  useEffect(() => {
    if (currentQuize.questionType === "open ended") {
      if (openEndedAnswer.length > 0) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEndedAnswer]);

  useEffect(() => {
    let d = true;
    for (let i = 0; i < multipleChoiceAnswer.length; i++) {
      if (multipleChoiceAnswer[i].correctAnswer === true) {
        d = false;
        break;
      }      
    }
    setDisable(d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multipleChoiceAnswer]);

  const attemptTheQuiz = () => {
    let userAnswer = {
      quizId: currentQuize._id,
      nextQuizId: nextQuizId,
      nextLessonId: nextLessonId,
      nextChapterId: nextChapterId,
      courseId: courseId,
      lessonId: lessonId,
      chapterId: chapterId,
      quizAttemptType: quizAttemptType,
      answer: {
        openEndedAnswer: openEndedAnswer,
        trueFalseAnswer: {
          _true: trueOption,
          _false: falseOption,
        },
        multipleChoiceAnswer: multipleChoiceAnswer,
      },
    };
    dispatch(attempt_Answer(userAnswer));
    // alert(quizAttemptType)
    setOpenEndedAnswer("");
  };

  const viewAnswers = () => {
    let userAnswer = {
      quizId: currentQuize._id,
      nextQuizId: nextQuizId,
      nextLessonId: nextLessonId,
      nextChapterId: nextChapterId,
      courseId: courseId,
      lessonId: lessonId,
      chapterId: chapterId,
      quizAttemptType: quizAttemptType,
      answer: {
        openEndedAnswer: openEndedAnswer,
        trueFalseAnswer: {
          _true: trueOption,
          _false: falseOption,
        },
        multipleChoiceAnswer: multipleChoiceAnswer,
      },
    };
    dispatch(attempt_lastQuiz_Answer(userAnswer));    
    setOpenEndedAnswer("");
    if (mylearning) {      
      setLastQuiz(true);
    }
  };

  const handleTrueOption = (currentValue) => {
    setTrueOption(!currentValue);
    setFalseOption(currentValue);
  };

  const handleFalseOption = (currentValue) => {
    setTrueOption(currentValue);
    setFalseOption(!currentValue);
  };

  if (currentQuize.questionType === "multiple choice" && multipleChoiceFlage) {
    let temp = [];
    for (let i = 0; i < currentQuize.multipleChoice.length; i++) {
      temp.push({
        choice: currentQuize.multipleChoice[i].choice,
        correctAnswer: false,
      });
    }
    setMultipleChoiceAnswer(temp);
    setMultipleChoiceFlage(false);
  }  
  const handleMultipleChoiceAnswers = (i) => {
    let temp = [...multipleChoiceAnswer];
    temp[i] = {
      ...temp[i],
      correctAnswer: !temp[i].correctAnswer,
    };
    setMultipleChoiceAnswer(temp);
  };

  return (
    <div className="lesson_detail_questions_wrapper" style={{backgroundColor:'#efefef', border:'1px solid #c5c1c1'}}>
      <p className="lesson_detail_question">
      <span style={{ color: "#0000ff" }}>Question #</span> {currentQuizeNo} {currentQuize.questionText}
      </p>
      {currentQuize.questionType === "true false" && (
        <FormControl component="fieldset" style={{ marginLeft: "10px" }}>
          <RadioGroup aria-label="gender" name="customized-radios">
            <FormControlLabel
              value="true"
              control={
                <StyledRadio
                  checked={trueOption}
                  onChange={() => handleTrueOption(trueOption)}
                />
              }
              label="True"
            />
            <FormControlLabel
              value="false"
              control={
                <StyledRadio
                  checked={falseOption}
                  onChange={() => handleFalseOption(falseOption)}
                />
              }
              label="False"
            />
          </RadioGroup>
        </FormControl>
      )}
      {currentQuize.questionType === "open ended" && (
        <TextField
          variant="outlined"
          fullWidth
          value={openEndedAnswer}
          onChange={(e) => setOpenEndedAnswer(e.target.value)}
        />
      )}
      {currentQuize.questionType === "multiple choice" &&
        multipleChoiceAnswer.map((item, i) => (
          <li key={i} style={{ listStyle: "none" }}>
            <CustomizedCheckbox
              key={i}
              checked={item.correctAnswer}
              onChange={() => handleMultipleChoiceAnswers(i)}
            />{" "}
            <span>{item.choice}</span>
          </li>
        ))}
      <br />
      <p className="lesson_detail_hint">{currentQuize.hint}</p>

      <Grid container xs={12} sm={12}>
        <Grid item xs={6} sm={6}>
          {/* {index > 0 && (
            <Button
              variant="outlined"
              style={{ color: "#1976D2", borderColor: "#1976D2" }}
              onClick={() => backQuestion()}
            >
              Question {index}
            </Button>
          )} */}
        </Grid>
        <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
          {currentQuizeNo + 1 <= lastQuestionNo ? (
            <Button
              variant="outlined"
              style={
                !disable ? { color: "#ff8c00", borderColor: "#ff8c00" } : null
              }
              onClick={() => attemptTheQuiz()}
              disabled={disable}
            >
              Question {currentQuizeNo + 1}
            </Button>
          ) : (
            <Button
              variant="outlined"
              style={
                !disable ? { color: "#ff8c00", borderColor: "#ff8c00" } : null
              }
              onClick={() => viewAnswers()}
              disabled={disable}
            >
              View Answers
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default LessonDetailQuestions;
