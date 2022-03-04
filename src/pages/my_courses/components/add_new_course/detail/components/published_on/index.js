import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    width: 300,
  },
}));

const PublishedDate = ({ course, handleField }) => {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Published On"
        type="datetime-local"
        defaultValue={`${new Date(course.publishedOn).getFullYear()}-${moment(course.publishedOn).format("MM")}-${moment(course.publishedOn).format("DD")}T${moment(course.publishedOn).format("HH")}:${moment(course.publishedOn).format("mm")}`}
        name="publishedOn"
        onChange={handleField}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </form>
  );
};

export default PublishedDate;
