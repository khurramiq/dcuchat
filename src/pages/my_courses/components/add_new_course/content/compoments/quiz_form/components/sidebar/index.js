import React from "react";
import { Button } from "@material-ui/core";

const SideBar = ({ quizQuestion, setQuizQuestion }) => {
  const setQuestionType = (type) => {
    setQuizQuestion({ ...quizQuestion, questionType: type });
  };

  return (
    <div className="sidebar">
      <div className="sidebar_heading" style={{ backgroundColor: "#328cc1", color:'#fff' }}>
        Question Types
      </div>
      <div className="btn_wrapper">
        <Button
          className="sidebar_btn"
          style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
          variant="outlined"
          onClick={() => setQuestionType("multiple choice")}
        >
          Add Multiple Choice
        </Button>
        <Button
          className="sidebar_btn"
          style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
          variant="outlined"
          onClick={() => setQuestionType("true false")}
        >
          Add True/False
        </Button>
        <Button
          className="sidebar_btn"
          style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
          variant="outlined"
          onClick={() => setQuestionType("open ended")}
        >
          Add Open Ended Question
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
