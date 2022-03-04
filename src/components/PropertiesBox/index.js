import React,{lazy} from "react";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemText from "@material-ui/core/ListItemText";
import useStyles from "./styles";

const DesignQuestion = lazy(() => import("../designQuestion"));

const PropertiesBox = (props) => {
  const {
    open,
    handleDrawerClose,
    question,
    setQuestion,
    questionForUpdate,
    setQuestionForUpdate,
    surveyList,
    recentSurvey,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <ListItemText primary={"Design Questions"} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <DesignQuestion
          question={question}
          setQuestion={setQuestion}
          questionForUpdate={questionForUpdate}
          setQuestionForUpdate={setQuestionForUpdate}
          surveyList={surveyList}
          recentSurvey={recentSurvey}
        />
      </Drawer>
    </div>
  );
};

export default PropertiesBox;
