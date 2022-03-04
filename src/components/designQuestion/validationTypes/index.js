import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { changeValidationType } from "../../../pages/myTests/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

const ValidationTypes = ({ list, question, setQuestion }) => {
  const classes = useStyles();

  return (
    <div style={{ textAlign: "center" }}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={question.validators.validatorType}
          onChange={(e) =>
            changeValidationType(e.target.value, question, setQuestion)
          }
          name="dropdownlist"
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "dropdownlist" }}
        >
          {list && list.length > 0
            ? list.map((item, i) => <option key={i} value={item}>{item}</option>)
            : null}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default ValidationTypes;
