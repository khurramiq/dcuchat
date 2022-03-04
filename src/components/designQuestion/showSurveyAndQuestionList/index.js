import React from "react";
import Dropdown from "./QDropdown";

const showSurveyAndQuestionList = ({
  surveyList,
  recentSurvey,
  questionList,
  recentQuestion,
  initialState,
  setQuestion,
}) => {
  let recent_survey;
  if (surveyList.length === 1) {
    recent_survey = surveyList[0].title;
  }
  return surveyList.length > 1 ? (
    <div style={{ marginTop: "10px" }}>
      <Dropdown
        label="Choose Survey"
        list={surveyList}
        recent={recentSurvey}
        surveyId={recentSurvey}
        doption="Choose Survey"
        initialState={initialState}
        setQuestion={setQuestion}
        flag="s"
      />
      <div style={{ marginTop: "10px" }} />
      <Dropdown
        label="Choose Question"
        list={questionList}
        recent={recentQuestion}
        surveyId={recentSurvey}
        doption="Choose Question"
        initialState={initialState}
        setQuestion={setQuestion}
        flag="q"
      />
    </div>
  ) : (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      Survey: <b style={{ color: "#111" }}>{recent_survey}</b>
      <Dropdown
        label="Choose Question"
        list={questionList}
        recent={recentQuestion}
        surveyId={recentSurvey}
        doption="Choose Question"
        initialState={initialState}
        setQuestion={setQuestion}
        flag="q"
      />
    </div>
  );
};

export default showSurveyAndQuestionList;
