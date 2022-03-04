import React, { useState } from "react";
import Text from "../../inputs/text";
import MultiLine from "../../inputs/multiLine";
import Switch from "../../Switch";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Choices from "../../../components/choices";
import CheckBoxDefaultChoices from "../checkBoxChoices/checkBoxDefault";
import CheckBoxCorrectChoices from "../checkBoxChoices/checkBoxCorrect";
import RadioGroupDefaultChoices from "../radioGroupChoices/radioGroupDefault";
import RadioGroupCorrectChoices from "../radioGroupChoices/radioGroupCorrect";
import RatingChoices from "../ratingChoices";
import DropDownChoices from "../dropDownChoices";
import ValidationTypes from "../validationTypes";
import ShowValidationFields from "../showValidationFields";
import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Modal from "../../../components/alerts/modal";
import { deleteQuestion } from "../../../redux/actions/questionActions";
import { useDispatch } from "react-redux";

import {
  handleField,
  handleFieldBool,
  handleSingleDataDefaultValue,
  resetSingleDataDefaultValue,
  handleSingleDataCorrectAnswer,
  handleRatingChange,
  resetRating,
} from "../../../pages/myTests/actions";

const alertStyle = {
  marginTop: "10px",
  marginBottom: "20px",
};

const CreateQuestion = ({
  question,
  setQuestion,
  submit,
  _question,
  submitBtnText,
}) => {
  const validatorsList = ["Text", "Numeric", "Email"];
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const cancelItem = () => {
    setOpen(false);
  };

  const deleteItem = () => {
    dispatch(deleteQuestion({ _id: _question.recentQuestion }));
    cancelItem();
  };

  return (
    <>
      <h3>General :</h3>
      <Text
        label="Name"
        name="name"
        type="text"
        value={question.name}
        handleInput={(e) => handleField(e.target, question, setQuestion)}
      />
      <Text
        label="Title"
        name="title"
        type="text"
        value={question.title}
        handleInput={(e) => handleField(e.target, question, setQuestion)}
      />
      <MultiLine
        label="Description"
        name="description"
        type="text"
        value={question.description}
        handleInput={(e) => handleField(e.target, question, setQuestion)}
      />
      <Switch
        check={question.isVisible}
        name="isVisible"
        handleInput={(e) =>
          handleFieldBool(e.target, !question.isVisible, question, setQuestion)
        }
        label="visible?"
      />
      {question.type !== "Boolean" ? (
        <Switch
          check={question.isRequired}
          name="isRequired"
          handleInput={(e) =>
            handleFieldBool(
              e.target,
              !question.isRequired,
              question,
              setQuestion
            )
          }
          label="required?"
        />
      ) : null}
      {question.type !== "Single Input" &&
      question.type !== "Comment" &&
      question.type !== "Boolean" &&
      question.type !== "Matrix (Single choice)" &&
      question.type !== "Multiple Text" ? (
        <Switch
          check={question.hasComment}
          name="hasComment"
          handleInput={(e) =>
            handleFieldBool(
              e.target,
              !question.hasComment,
              question,
              setQuestion
            )
          }
          label="comment?"
        />
      ) : null}
      {question.type === "Single Input" && (
        <Text
          label="Placeholder"
          name="placeholder"
          type="text"
          value={question.placeholder || ""}
          handleInput={(e) => handleField(e.target, question, setQuestion)}
        />
      )}
      {question.type === "Checkbox" ||
      question.type === "Radiogroup" ||
      question.type === "Dropdown" ? (
        <>
          <h3>Choices :</h3>
          <Choices question={question} setQuestion={setQuestion} />
        </>
      ) : null}
      {question.type === "Rating" ? (
        <>
          <h3>Rate Values :</h3>
          <Text
            label="Minimum Rate"
            type="number"
            value={question.rating.minRate}
            handleInput={(e) =>
              handleRatingChange(
                "minRate",
                parseInt(e.target.value),
                question,
                setQuestion
              )
            }
          />
          <Text
            label="Maximum Rate"
            type="number"
            value={question.rating.maxRate}
            handleInput={(e) =>
              handleRatingChange(
                "maxRate",
                parseInt(e.target.value),
                question,
                setQuestion
              )
            }
          />
          <Text
            label="Rate Step"
            type="number"
            value={question.rating.rateStep}
            handleInput={(e) =>
              handleRatingChange(
                "rateStep",
                parseInt(e.target.value),
                question,
                setQuestion
              )
            }
          />
          <Text
            label="Minimum Rate Discription"
            type="text"
            value={question.rating.minRateDisc}
            handleInput={(e) =>
              handleRatingChange(
                "minRateDisc",
                e.target.value,
                question,
                setQuestion
              )
            }
          />
          <Text
            label="Maximum Rate Discription"
            type="text"
            value={question.rating.maxRateDisc}
            handleInput={(e) =>
              handleRatingChange(
                "maxRateDisc",
                e.target.value,
                question,
                setQuestion
              )
            }
          />
          <p>Note: you can only create 10 Ratings</p>
        </>
      ) : null}
      <h3>Data :</h3>
      <Text
        label="Value name"
        name="valueName"
        type="text"
        value={question.valueName}
        handleInput={(e) => handleField(e.target, question, setQuestion)}
      />
      {question.type === "Single Input" || question.type === "Comment" ? (
        <>
          <Text
            label="Default value"
            type="text"
            value={question.singleData.defaultValue}
            handleInput={(e) =>
              handleSingleDataDefaultValue(
                e.target.value,
                question,
                setQuestion
              )
            }
          />
          <Button
            style={{ width: "100px" }}
            variant="contained"
            color="secondary"
            onClick={() => resetSingleDataDefaultValue(question, setQuestion)}
          >
            Reset
          </Button>
          <Text
            label="Correct answer"
            type="text"
            value={question.singleData.correctAnswer}
            handleInput={(e) =>
              handleSingleDataCorrectAnswer(
                e.target.value,
                question,
                setQuestion
              )
            }
          />
        </>
      ) : null}

      {question.type === "Checkbox" ? (
        <>
          <CheckBoxDefaultChoices
            question={question}
            setQuestion={setQuestion}
          />
          <CheckBoxCorrectChoices
            question={question}
            setQuestion={setQuestion}
          />
        </>
      ) : null}
      {question.type === "Radiogroup" ? (
        <>
          <RadioGroupDefaultChoices
            question={question}
            setQuestion={setQuestion}
          />
          <RadioGroupCorrectChoices
            question={question}
            setQuestion={setQuestion}
          />
        </>
      ) : null}
      {question.type === "Dropdown" ? (
        <>
          <DropDownChoices
            label="Default Value"
            name="dropDownDefaultAnswer"
            question={question}
            setQuestion={setQuestion}
          />
          <DropDownChoices
            label="Correct Answer"
            name="dropDownCorrectAnswer"
            question={question}
            setQuestion={setQuestion}
          />
        </>
      ) : null}
      {question.type === "Rating" ? (
        <>
          <RatingChoices
            label="Default Value"
            flag="default"
            question={question}
            setQuestion={setQuestion}
          />
          <RatingChoices
            label="Correct Answer"
            flag="correct"
            question={question}
            setQuestion={setQuestion}
          />
          <Button
            style={{ width: "100px", marginTop: "10px" }}
            variant="contained"
            color="secondary"
            onClick={() => resetRating(question, setQuestion)}
          >
            Reset
          </Button>
        </>
      ) : null}

      <h3>Validation :</h3>
      {question.type === "Single Input" || question.type === "Comment" ? (
        <>
          <ValidationTypes
            list={validatorsList}
            question={question}
            setQuestion={setQuestion}
          />
          <ShowValidationFields
            type={question.validators.validatorType}
            question={question}
            setQuestion={setQuestion}
          />
        </>
      ) : null}

      <Divider />
      <Grid item xs={12}>
        {_question.isError && (
          <Grid item xs={12}>
            <Alert variant="filled" severity="error" style={alertStyle}>
              {_question.errorText}
            </Alert>
          </Grid>
        )}
      </Grid>
      <div style={{ textAlign: "right" }}>
        {submitBtnText === "Update" ? (
          <Button
            variant="contained"
            color="secondary"
            style={{
              marginTop: "8px",
              marginRight: "20px",
            }}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        ) : null}

        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#1769AA",
            marginTop: "8px",
            marginRight: "20px",
          }}
          onClick={(e) => submit(e)}
        >
          {submitBtnText}
        </Button>
        <Modal
          setOpen={cancelItem}
          text={"Confirmation"}
          open={open}
          performAction={deleteItem}
          description={
            "This action will delete all the information related to this question. Are you sure you want to perform that?"
          }
        />
      </div>
    </>
  );
};

export default CreateQuestion;
