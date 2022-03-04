import React, { useEffect } from "react";

import { initialState } from "../../pages/myTests/actions";

import { createQuestion, updateQuestion } from "../../redux/actions/questionActions";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import ShowSurveyAndQuestionList from "./showSurveyAndQuestionList";
import CreateQuestion from "./createQuestion";

const DesignQuestion = (props) => {
  const classes = useStyles();
  const {
    question,
    setQuestion,
    questionForUpdate,
    setQuestionForUpdate,
    surveyList,
    recentSurvey,
  } = props;

  const dispatch = useDispatch();
  const _question = useSelector((state) => state.question);
  const _survey = useSelector(state => state.survey);

  useEffect(() => {
    setQuestion({ ...question, survey: recentSurvey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_question.isSuccess) {
      setQuestion({ ...initialState, survey: recentSurvey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_question.isSuccess]);

  useEffect(() => {
    setQuestion({ ...question, survey: _survey.recentSurvey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_survey.recentSurvey]);

  const isExist = _id => {
    for (let i = 0; i < _question.data.length; i++){
      if (_question.data[i]._id === _id) {
        return true;
      }
    }
    return false;
  }
  

  const submit = (e) => {
    e.preventDefault();
    dispatch(createQuestion(question));       
  };

  const submitUpt = (e) => {
    e.preventDefault();
    dispatch(updateQuestion(questionForUpdate));         
  };
  

  return (
    <div className={classes.main}>
      {/* {question.type} */}
      <ShowSurveyAndQuestionList
        surveyList={surveyList}
        recentSurvey={recentSurvey}
        questionList={_question.data}
        recentQuestion={_question.recentQuestion} 
        initialState={initialState}
        setQuestion={setQuestion}
      />
      {question.type === "" ? (
        _question.data.length > 0 && isExist(_question.recentQuestion)?
        <CreateQuestion
          question={questionForUpdate}
          setQuestion={setQuestionForUpdate}
          submit={submitUpt}
          submitBtnText="Update"
          _question={_question}
        />:null
      ) : (
        <CreateQuestion
          question={question}
          setQuestion={setQuestion}
          submit={submit}
          submitBtnText="Save"
          _question={_question}
        />
      )}
    </div>
  );
};

export default DesignQuestion;
