import React from "react";
import ActionsRow from "../actions_row";
import ContentAreaHeader from "../content_area_header";
import HintExplanation from "../hint_explanation";
import MultipleChoiceRow from "../multiple_choice_row";
import QuestionRow from "../question_row";
import TrueFalseRow from "../true_false_row";

const ContentArea = ({
  handleCancleButton,
  setAddNewQuizBtn,
  saveQuestion,
  quizQuestion,
  setQuizQuestion,
  editingQuestion,
  updateQuestion,
  deleteItemQuestion,
  questionNumberError,
  questionNumberErrorText,
  setQuestionNumberError,
  setQuestionNumberErrorText,
  quizes,
}) => {
  // Question Text
  const handleQuestionTextChange = ({ target }) => {
    setQuizQuestion({ ...quizQuestion, questionText: target.value });
  };

  // Question True False
  const handleQuestionTrueFalse = (v) => {
    setQuizQuestion({ ...quizQuestion, true_false: { correctAnswer: v } });
  };

  // Question MultipleChoice Choice Text
  const handle_MultipleChoice_ChoiceText = (v, i) => {
    var newArray = [...quizQuestion.multipleChoice];
    newArray[i] = { ...newArray[i], choice: v };
    setQuizQuestion({ ...quizQuestion, multipleChoice: newArray });
  };

  // Question MultipleChoice Correct Answer
  const handle_MultipleChoice_CorrectAnswer = (v, i) => {
    var newArray = [...quizQuestion.multipleChoice];
    newArray[i] = { ...newArray[i], correctAnswer: v };
    setQuizQuestion({ ...quizQuestion, multipleChoice: newArray });
  };

  // Question Hint Explanation
  const handle_Hint_Explanation = ({ target }) => {
    setQuizQuestion({ ...quizQuestion, [target.name]: target.value });
  };

  // Question MultipleChoice Add Choice Button
  const MultipleChoice_AddChoice_Button = (i) => {
    var newArray = [...quizQuestion.multipleChoice];
    newArray.splice(i + 1, 0, { choice: "", correctAnswer: false });
    setQuizQuestion({ ...quizQuestion, multipleChoice: newArray });
  };

  // Question MultipleChoice delete Choice Icon
  const MultipleChoice_deleteChoice = (index) => {
    if (quizQuestion.multipleChoice.length > 3) {
      let newArray = [...quizQuestion.multipleChoice];
      let temp = newArray.filter((item, i) => i !== index);
      setQuizQuestion({
        ...quizQuestion,
        multipleChoice: temp,
      });
    }
  };

  const varifyQuestionNumberIsAlreadyExist = (n) => {
    for (let i = 0; i < quizes.length; i++) {
      if (quizes[i].order === n) {
        return true;
      }
    }
    return false;
  };

  const handleOrderChange = (order) => {
    // check if chapter number is already exist
    if (order.length === 0) {
      setQuizQuestion({
        ...quizQuestion,
        order: parseInt(order),
      });
      setQuestionNumberError(true);
      setQuestionNumberErrorText("Please, Enter the Correct question number.");
    } else if (!varifyQuestionNumberIsAlreadyExist(parseInt(order))) {
      setQuestionNumberError(false);
      setQuestionNumberErrorText("");
      setQuizQuestion({
        ...quizQuestion,
        order: parseInt(order),
      });
    } else {
      setQuizQuestion({
        ...quizQuestion,
        order: parseInt(order),
      });
      setQuestionNumberError(true);
      setQuestionNumberErrorText("Please, Enter unique number.");
    }
  };

  return (
    <div
      className="quiz_form_content_area"
      style={editingQuestion ? { width: "100%" } : null}
    >
      <div className="quiz_form_wrapper">
        <div className="quiz_form_wrapper_inner">
          <ContentAreaHeader questionType={quizQuestion.questionType} />
          <form
            onSubmit={
              editingQuestion
                ? (e) => updateQuestion(e)
                : (e) => saveQuestion(e)
            }
          >
            {quizQuestion.questionType === "multiple choice" ? (
              <>
                <QuestionRow
                  thirdColumn={true}
                  questionText={quizQuestion.questionText}
                  handleQuestionTextChange={handleQuestionTextChange}
                />
                {quizQuestion.multipleChoice.length > 0
                  ? quizQuestion.multipleChoice.map((item, i) => (
                      <MultipleChoiceRow
                        item={item}
                        i={i}
                        handle_MultipleChoice_ChoiceText={
                          handle_MultipleChoice_ChoiceText
                        }
                        handle_MultipleChoice_CorrectAnswer={
                          handle_MultipleChoice_CorrectAnswer
                        }
                        MultipleChoice_AddChoice_Button={
                          MultipleChoice_AddChoice_Button
                        }
                        MultipleChoice_deleteChoice={
                          MultipleChoice_deleteChoice
                        }
                      />
                    ))
                  : null}
              </>
            ) : null}
            {quizQuestion.questionType === "true false" ? (
              <>
                <QuestionRow
                  thirdColumn={false}
                  questionText={quizQuestion.questionText}
                  handleQuestionTextChange={handleQuestionTextChange}
                />
                <TrueFalseRow
                  quizQuestion={quizQuestion}
                  setQuizQuestion={setQuizQuestion}
                  handleQuestionTrueFalse={handleQuestionTrueFalse}
                />
              </>
            ) : null}
            {quizQuestion.questionType === "open ended" ? (
              <>
                <QuestionRow
                  thirdColumn={false}
                  questionText={quizQuestion.questionText}
                  handleQuestionTextChange={handleQuestionTextChange}
                />
              </>
            ) : null}
            <HintExplanation
              quizQuestion={quizQuestion}
              handle_Hint_Explanation={handle_Hint_Explanation}              
              handleOrderChange={handleOrderChange}
              questionNumberError={questionNumberError}
              questionNumberErrorText={questionNumberErrorText}
            />
            <ActionsRow
              quizQuestion={quizQuestion}
              handleCancleButton={handleCancleButton}
              setAddNewQuizBtn={setAddNewQuizBtn}
              saveQuestion={saveQuestion}
              editingQuestion={editingQuestion}
              updateQuestion={updateQuestion}
              deleteItemQuestion={deleteItemQuestion}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
