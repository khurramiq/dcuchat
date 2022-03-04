import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import InputText from "../../../components/inputs/text";
import { changeValidationErrorValues } from "../../../pages/myTests/actions";

const ShowValidationFields = ({
  type,
  question,
  setQuestion,
}) => {
  if (type === "Text") {
    return (
      <div>
        <InputText
          label="Error text"
          value={question.validators.textValidator.errorText}
          handleInput={(e) =>
            changeValidationErrorValues(
              "textValidator",
              "errorText",
              e.target.value,
              question,
              setQuestion,
            )
          }
        />
        <InputText
          type="number"
          label="Minimum length"
          value={question.validators.textValidator.minLength}
          handleInput={(e) =>
            changeValidationErrorValues(
              "textValidator",
              "minLength",
              e.target.value,
              question,
              setQuestion,
            )
          }
          fullWidth
        />
        <InputText
          type="number"
          label="Maximum length"
          value={question.validators.textValidator.maxLength}
          handleInput={(e) =>
            changeValidationErrorValues(
              "textValidator",
              "maxLength",
              e.target.value,
              question,
              setQuestion,
            )
          }
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={question.validators.textValidator.allowDigits}
              onChange={(e) =>
                changeValidationErrorValues(
                  "textValidator",
                  "allowDigits",
                  !question.validators.textValidator.allowDigits,
                  question,
                  setQuestion,
                )
              }
              color="primary"
            />
          }
          label="Allow digits"
        />
      </div>
    );
  } else if (type === "Numeric") {
    return (
      <div style={{ textAlign: "center" }}>
        <InputText
          label="Error text"
          value={question.validators.numericValidator.errorText}
          handleInput={(e) =>
            changeValidationErrorValues(
              "numericValidator",
              "errorText",
              e.target.value,
              question,
              setQuestion,
            )
          }
          fullWidth
        />
        <InputText
          label="Minimum value"
          type="number"
          value={question.validators.numericValidator.minValue}
          handleInput={(e) =>
            changeValidationErrorValues(
              "numericValidator",
              "minValue",
              e.target.value,
              question,
              setQuestion,
            )
          }
          fullWidth
        />
        <InputText
          label="Maximum value"
          type="number"
          value={question.validators.numericValidator.maxValue}
          handleInput={(e) =>
            changeValidationErrorValues(
              "numericValidator",
              "maxValue",
              e.target.value,
              question,
              setQuestion,
            )
          }
          fullWidth
        />
      </div>
    );
  } else if (type === "Email") {
    return (
      <div style={{ textAlign: "center" }}>
        <InputText
          label="Error text"
          value={question.validators.emailValidator.errorText}
          handleInput={(e) =>
            changeValidationErrorValues(
              "emailValidator",
              "errorText",
              e.target.value,
              question,
              setQuestion,
            )
          }
          fullWidth
        />
        <InputText
          label="Maximum length"
          type="number"
          value={question.validators.emailValidator.maxLength}
          handleInput={(e) =>
            changeValidationErrorValues(
              "emailValidator",
              "maxLength",
              e.target.value,
              question,
              setQuestion,
            )
          }
          fullWidth
        />
      </div>
    );
  }
};

export default ShowValidationFields;
