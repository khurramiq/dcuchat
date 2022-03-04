import React from "react";
import { Link } from "react-router-dom";
import { FormControlLabel, Grid, makeStyles, Radio } from "@material-ui/core";
import clsx from "clsx";
import "./style.css";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#328cc1",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const ChapterLesson = ({
  chapterTitle,
  courseTitle,
  lessonNo,
  lessonTitle,
  completed,
  shouldLessonsLearn,
  lesson,
  startedLearning,
  resetStudentProgress,
  type,
  chapterId,
}) => {
  const isLessonAvailable = () => {
    // No Delay
    if (lesson.lessonDrip.dripType === "no delay") {
      return true;
    }
    // specific date
    else if (lesson.lessonDrip.dripType === "specific date") {
      // check the date when arrive
      if (lesson.lessonDrip.specificDate === new Date()) {
        return true;
      } else {
        return false;
      }
    }
    // specific interval
    else if (lesson.lessonDrip.dripType === "specific interval") {
      let studentEnrolledDate = new Date(startedLearning);
      let currentDate = new Date();
      const invervalNumber = lesson.lessonDrip.specificInterval.invervalNumber;
      // Hours
      if (lesson.lessonDrip.specificInterval.invervalType === "hour") {
        const specificInterval = new Date(
          studentEnrolledDate.setHours(
            studentEnrolledDate.getHours() + invervalNumber
          )
        );
        if (currentDate < specificInterval) {
          return false;
        } else {
          return true;
        }
      }
      // Days
      else if (lesson.lessonDrip.specificInterval.invervalType === "day") {
        const specificInterval = new Date(
          studentEnrolledDate.setDate(
            studentEnrolledDate.getDate() + invervalNumber
          )
        );
        if (currentDate < specificInterval) {
          return false;
        } else {
          return true;
        }
      } else if (lesson.lessonDrip.specificInterval.invervalType === "week") {
        const specificInterval = new Date(
          studentEnrolledDate.setDate(
            studentEnrolledDate.getDate() + invervalNumber * 7
          )
        );
        if (currentDate < specificInterval) {
          return false;
        } else {
          return true;
        }
      }
      // Months
      else if (lesson.lessonDrip.specificInterval.invervalType === "month") {
        const specificInterval = new Date(
          studentEnrolledDate.setMonth(
            studentEnrolledDate.getMonth() + invervalNumber
          )
        );
        if (currentDate < specificInterval) {
          return false;
        } else {
          return true;
        }
      }
      // Years
      else if (lesson.lessonDrip.specificInterval.invervalType === "year") {
        const specificInterval = new Date(
          studentEnrolledDate.setFullYear(
            studentEnrolledDate.getFullYear() + invervalNumber
          )
        );

        if (currentDate < specificInterval) {
          return false;
        } else {
          return true;
        }
      }
    }
  };
  return (
    <div className="chapter-lesson-wrapper">
      <Grid container xs={12}>
        <Grid item xs={12} sm={2} style={{ paddingTop: "5px" }}>
          {lessonNo}
        </Grid>
        <Grid item xs={10} sm={9} style={{ paddingTop: "5px" }}>
          {shouldLessonsLearn() && isLessonAvailable() ? (
            <Link
              to={`/courses/${courseTitle}/chapters/${chapterTitle}/lessons/${lessonTitle}`}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#6D93A5" }}>{lessonTitle}</span>
            </Link>
          ) : (
            <span style={{ color: "#6D93A5" }}>{lessonTitle}</span>
          )}
        </Grid>
        <Grid item xs={2} sm={1}>
          <FormControlLabel
            control={
              <StyledRadio
                checked={completed}
                onClick={
                  type === "course reset"
                    ? () =>
                        resetStudentProgress(
                          lesson._id,
                          lesson.quizes[0].quiz,
                          chapterId
                        )
                    : null
                }
              />
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChapterLesson;
