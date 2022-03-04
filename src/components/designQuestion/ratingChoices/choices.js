import React from 'react';
import { handleRatingChange } from '../../../pages/myTests/actions';

import "./style.css";

const Choices = ({flag, question, setQuestion}) => {
    const showRatingSteps = () => {
      const minRate = question.rating.minRate;
      const maxRate = question.rating.maxRate;
      const rateStep = question.rating.rateStep;
      let temp = [];
      let output = "";
      const limit = 10;
      let count = 0;
      for (let i = minRate; i <= maxRate; i = i + rateStep) {
        temp.push(i);
        count++;
        if (count === limit) {
          break;
        }
      }
      output = temp.map((item, i) => {
        if (flag === "default") {
          return (
            <span
              className={`rate-item ${
                question.rating.defaultAnswer === i ? "selected" : ""
              }`}
              key={i}
              onClick={() => handleRatingChange("defaultAnswer", parseInt(i), question, setQuestion)}
            >
              {item}
            </span>
          );
        }                       
        else {
          return (
            <span
              className={`rate-item ${
                question.rating.correctAnswer === i ? "selected" : ""
              }`}
              key={i}
              onClick={() => handleRatingChange("correctAnswer", parseInt(i), question, setQuestion)}
            >
              {item}
            </span>
          );
        }
      });
      return output;
    };
    return (
      <div style={{ width: "100%", margin: "auto", marginTop: "10px" }}>
        <div className="rating-wrapper">
          <span className="rating-disc">{question.rating.minRateDisc}</span>
          {showRatingSteps()}
          <span className="rating-disc">{question.rating.maxRateDisc}</span>
        </div>
      </div>
    );
  };

export default Choices;
