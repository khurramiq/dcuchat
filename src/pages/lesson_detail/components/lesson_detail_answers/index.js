import React from "react";
import { useSelector } from "react-redux";

const LessonDetailAnswers = ({ quizQuestions }) => {
  const _User = useSelector((state) => state.User);  
  const showAnswer = (i, question) => {
    let yourAnswer = {};
    for (let i = 0; i < question.attemptedAnswers.length; i++) {
      if (
        _User.profile._id === question.attemptedAnswers[i].answer.answeredBy
      ) {
        yourAnswer = question.attemptedAnswers[i].answer;
      }
    }
    let yAnswer = "";
    if (question.questionType === "open ended") {
      yAnswer = yourAnswer?.answer?.openEndedAnswer;
    } else if (question.questionType === "true false") {
      if (yourAnswer?.answer?.trueFalseAnswer?._false) {
        yAnswer = "False";
      } else {
        yAnswer = "True";
      }
    } else if (question.questionType === "multiple choice") {
      // eslint-disable-next-line array-callback-return
      yAnswer = yourAnswer?.answer?.multipleChoiceAnswer.map((item) => {
        if (item.correctAnswer) {
          return item.choice + ", ";
        }
      });
    }
    return (
      <>
        <p className="lesson_detail_question">
        <span style={{ color: "#0000ff" }}>Question # {i + 1}</span> {question.questionText}
        </p>
        <p>
          <span style={{ color: "#0000ff" }}>Your Answer: </span>
          {yAnswer}
        </p>
        <p>
          <span style={{ color: "#0000ff" }}>Explanation: </span>
          {question.explanation}
        </p>
        <hr />
      </>
    );
  };
  return (
    <>
      <div className="lesson_detail_questions_wrapper" style={{backgroundColor:'#efefef', border:'1px solid #c5c1c1'}}>
        {quizQuestions.map((question, i) => showAnswer(i, question))}
      </div>
    </>
  );
};

export default LessonDetailAnswers;
