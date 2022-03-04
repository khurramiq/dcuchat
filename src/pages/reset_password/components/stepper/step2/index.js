import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import Question from "./question";

const Step2 = ({ email, userSecurityAnswers, setUserSecurityAnswers }) => {
  let history = useHistory();
  const _User = useSelector((state) => state.User);

  useEffect(() => {
    if (!_User.canReset) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.canReset]);

  const handleAnswersChange = (index, answer) => {
    let newArray = [...userSecurityAnswers];
    newArray[index] = { ...newArray[index], answer };
    setUserSecurityAnswers(newArray);
  };
  return (
    <div className="reset-password-step-wrapper">
      <form>
        <fieldset>
          <legend>Security Questions:</legend>
          <p>
            Please, answer the following security questions If you don't
            remember the answers{" "}
            <Link to="/" style={{ color: "#5EBCF1", textDecoration: "none" }}>
              Click here
            </Link>{" "}
            to contact us. <br />
            You entered the answers when you create account on the application.
          </p>

          <hr
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              margin: "20px 10px",
            }}
          />
          {_User.userSecurityQuestions.length > 0
            ? _User.userSecurityQuestions.map((item, i) => (
                <Question
                  i={i}
                  item={item}
                  userSecurityAnswers={userSecurityAnswers}
                  handleAnswersChange={handleAnswersChange}
                />
              ))
            : null}
          {_User.matchSecurityAnswersLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <CircularProgress />
            </div>
          ) : (
            <p style={{ color: "red", textAlign: "center" }}>
              {_User.matchSecurityAnswersErr}
            </p>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default Step2;
