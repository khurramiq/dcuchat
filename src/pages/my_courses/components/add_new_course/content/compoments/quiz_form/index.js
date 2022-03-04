import React, { useState } from "react";
import "./style.css";
import SideBar from "./components/sidebar";
import ContentArea from "./components/content_area";

const QuizForm = ({
  handleCancleButton,
  setAddNewQuizBtn,
  quizQuestion,
  setQuizQuestion,
  saveQuestion,
  editingQuestion,
  updateQuestion,
  editQuestionId,
  deleteItemQuestion,
  questionNumberError,
  questionNumberErrorText,
  setQuestionNumberError,
  setQuestionNumberErrorText,
  quizes
}) => {
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [trueFalse, setTrueFalse] = useState(false);
  const [openEnded, setOpenEnded] = useState(true);
  return (
    <div className="quiz_form_wrapper">
      {/* sidebar start */}
      {!editingQuestion ? (
        <SideBar
          setMultipleChoice={setMultipleChoice}
          setTrueFalse={setTrueFalse}
          setOpenEnded={setOpenEnded}
          quizQuestion={quizQuestion}
          setQuizQuestion={setQuizQuestion}
        />
      ) : null}
      {/* sidebar end */}
      {/* content area start */}
      <ContentArea
        multipleChoice={multipleChoice}
        trueFalse={trueFalse}
        openEnded={openEnded}
        handleCancleButton={handleCancleButton}
        setAddNewQuizBtn={setAddNewQuizBtn}
        saveQuestion={saveQuestion}
        quizQuestion={quizQuestion}
        setQuizQuestion={setQuizQuestion}
        editingQuestion={editingQuestion}
        updateQuestion={updateQuestion}
        editQuestionId={editQuestionId}
        deleteItemQuestion={deleteItemQuestion}
        questionNumberError={questionNumberError}
        questionNumberErrorText={questionNumberErrorText}
        setQuestionNumberError={setQuestionNumberError}
        setQuestionNumberErrorText={setQuestionNumberErrorText}
        quizes={quizes}
      />
      {/* content area end */}
    </div>
  );
};

export default QuizForm;
