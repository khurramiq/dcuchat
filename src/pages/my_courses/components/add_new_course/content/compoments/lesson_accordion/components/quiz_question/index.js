import React from "react";
import { Delete, Edit } from "@material-ui/icons";

const QuizQuestion = ({ item, i, deleteItemQuestion, handleQuizQuestionEdit }) => {
  return (
    <div className="quiz_question_wrapper" style={{borderBottom:'1px solid #ccc'}}>
      <p className="quiz_question" style={{ color:'#328cc1' }}>
        {item.order}. {item.questionText}
      </p>
      <span className="quiz_question_icons">
        <Edit style={{ color: "#328cc1" }}
        onClick={()=>handleQuizQuestionEdit(item)}
        />
        &nbsp;&nbsp;&nbsp;
        <Delete style={{ color: "#d72924" }} onClick={() => deleteItemQuestion(item)} />
      </span>
    </div>
  );
};

export default QuizQuestion;
