import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";

import "./style.css";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const QuestionPreviewBox = (props) => {
  const classes = useStyles();  

  return (
    <div className="question-preview-box-main-wrapper">
      <CssBaseline />
      <div className={classes.header}>
        <ListItemText primary={"Question Preview Box"} />
      </div>
      <Divider />
    </div>
  );
};

export default QuestionPreviewBox;
