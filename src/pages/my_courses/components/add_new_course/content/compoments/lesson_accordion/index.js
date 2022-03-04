import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Delete, Edit } from "@material-ui/icons";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import QuizForm from "../quiz_form";
import {
  createQuiz,
  delete_Quiz,
  update_Quiz,
} from "../../../../../../../redux/actions/quizActions";
import "./style.css";
import QuizQuestion from "./components/quiz_question";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../../../../components/alerts/modal";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
    width: "50%",
  },
}));

const LessonAccordion = ({
  lesson,
  i,
  chapter,
  handleLessonEdit,
  deleteItem,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const _quiz = useSelector((state) => state.quiz);
  const [open, setOpen] = useState(false);
  const [questionForDelete, setQuestionForDelete] = useState({});
  const [addNewQuizBtn, setAddNewQuizBtn] = useState(true);
  const [questionNumberError, setQuestionNumberError] = useState(false);
  const [questionNumberErrorText, setQuestionNumberErrorText] = useState("");
  const [quizes, setQuizes] = useState([]);
  const [quizQuestion, setQuizQuestion] = useState({
    lesson: lesson._id,
    questionType: "open ended",
    questionText: "",
    multipleChoice: [
      {
        choice: "",
        correctAnswer: false,
      },
      {
        choice: "",
        correctAnswer: false,
      },
      {
        choice: "",
        correctAnswer: false,
      },
    ],
    trueFalse: {
      _true: true,
      _false: false,
    },
    hint: "",
    explanation: "",
    order: quizes.length + 1,
  });
  // eslint-disable-next-line no-unused-vars
  const [editQuestionId, setEditQuestionId] = useState(-1);
  const [quizForm, setQuizForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(false);

  const quizesByLesson = (allQuizes, quizesArray) => {
    let temp = [];
    for (let i = 0; i < allQuizes.length; i++) {
      for (let j = 0; j < quizesArray.length; j++) {
        if (allQuizes[i]._id === quizesArray[j].quiz) {
          temp.push(allQuizes[i]);
        }
      }
    }
    return temp;
  };

  useEffect(() => {
    setQuizes(quizesByLesson(_quiz.data, lesson.quizes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_quiz.data, lesson.quizes]);

  const handleAddNewQuiz = () => {
    setQuizForm(true);
    setAddNewQuizBtn(false);
    setQuizQuestion({ ...quizQuestion, order: quizes.length + 1 });
  };

  const resetQuiz = () => {
    setQuizQuestion({
      lesson: lesson._id,
      questionType: "open ended",
      questionText: "",
      multipleChoice: [
        {
          choice: "",
          correctAnswer: false,
        },
        {
          choice: "",
          correctAnswer: false,
        },
        {
          choice: "",
          correctAnswer: false,
        },
      ],
      trueFalse: {
        _true: true,
        _false: false,
      },
      hint: "",
      explanation: "",
      order: quizes.length + 1,
    });
  };

  const cancelItem = () => {
    setOpen(false);
  };

  const handleCancleButton = () => {
    resetQuiz();
    setQuizForm(false);
    setEditingQuestion(false);
    setAddNewQuizBtn(true);
  };

  const saveQuestion = (e) => {
    e.preventDefault();
    if (questionNumberError) {
      return;
    }
    else {
      dispatch(createQuiz(quizQuestion));
      resetQuiz();
      setQuizForm(false);
      setAddNewQuizBtn(true);
     }
  };

  const handleQuizQuestionEdit = (q) => {
    setAddNewQuizBtn(false);
    setQuizQuestion(q);
    setEditingQuestion(true);
    setQuizForm(true);
  };

  const updateQuestion = (e) => {
    e.preventDefault();
    if (questionNumberError) {
      return;
    }
    else {      
      setEditingQuestion(false);
      dispatch(update_Quiz(quizQuestion));
      resetQuiz();
      setQuizForm(false);
      setAddNewQuizBtn(true);
    }
  };

  const deleteItemQuestion = (deletedItem) => {
    setQuestionForDelete(deletedItem);
    setOpen(true);
  };

  const deleteQuestion = () => {
    dispatch(delete_Quiz({ lessonId: lesson._id, _id: questionForDelete._id }));
    resetQuiz();
    setQuizForm(false);
    setEditingQuestion(false);
    setAddNewQuizBtn(true);
    setOpen(false);
  };

  return (
    <>
      <Accordion key={i} style={{ marginBottom: "5px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#328cc1" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ backgroundColor: "#e8e9eb" }}
        >
          <Typography style={{ color: "#328cc1" }} className={classes.heading}>
            {chapter.order + "." + lesson.order} {lesson.lessonTitle}
          </Typography>
          <span style={{ marginLeft: "35%" }}>
            <Edit
              style={{ color: "#328cc1" }}
              onClick={() => handleLessonEdit(lesson)}
            />
            &nbsp;&nbsp;&nbsp;
            <Delete
              style={{ color: "#d72924" }}
              onClick={() => deleteItem(lesson._id)}
            />
            &nbsp;&nbsp;&nbsp;
            <VisibilityOffIcon style={{ color: "#328cc1" }} />
          </span>
        </AccordionSummary>
        <AccordionDetails style={{ display: "block" }}>
          {addNewQuizBtn ? (
            <Button
              variant="outlined"
              style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
              onClick={() => handleAddNewQuiz()}
            >
              Add New Quiz
            </Button>
          ) : null}
          {_quiz.loading ? (
            <div style={{ textAlign: "center" }}>
              <span>
                <CircularProgress />
              </span>
            </div>
          ) : null}
          {quizForm ? (
            <>
              <QuizForm
                quizQuestion={quizQuestion}
                setQuizQuestion={setQuizQuestion}
                questionNumberError={questionNumberError}
                questionNumberErrorText={questionNumberErrorText}
                setQuestionNumberError={setQuestionNumberError}
                setQuestionNumberErrorText={setQuestionNumberErrorText}
                setQuizForm={setQuizForm}
                handleCancleButton={handleCancleButton}
                setAddNewQuizBtn={setAddNewQuizBtn}
                saveQuestion={saveQuestion}
                updateQuestion={updateQuestion}
                editingQuestion={editingQuestion}
                editQuestionId={editQuestionId}
                deleteItemQuestion={deleteItemQuestion}
                quizes={quizes}
              />
            </>
          ) : null}

          {quizes.length > 0
            ? quizes
                .sort(function (a, b) {
                  return a.order - b.order;
                })
                .map((item, i) => (
                  <QuizQuestion
                    item={item}
                    i={i}
                    deleteItemQuestion={deleteItemQuestion}
                    handleQuizQuestionEdit={handleQuizQuestionEdit}
                  />
                ))
            : null}
        </AccordionDetails>
      </Accordion>
      <Modal
        setOpen={cancelItem}
        text={"Confirmation"}
        open={open}
        performAction={deleteQuestion}
        description={"Are you sure you want to delete this item?"}
      />
    </>
  );
};

export default LessonAccordion;
