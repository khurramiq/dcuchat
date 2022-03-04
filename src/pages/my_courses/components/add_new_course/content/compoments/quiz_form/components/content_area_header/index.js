import React from "react";

const ContentAreaHeader = ({ questionType }) => {
  return (
    <div className="quiz_form_header" style={{backgroundColor:'#328cc1'}}>
      <span className="quiz_form_header_text">
        {questionType === "multiple choice" && "Multiple Choice "}
        {questionType === "true false" && "True/False "}
        {questionType === "open ended" && "Open Ended "}
        Question
      </span>
    </div>
  );
};

export default ContentAreaHeader;
