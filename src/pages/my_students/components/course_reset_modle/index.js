import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CourseContent from "../../../../components/course_content";
import { getAllChaptersByCourse } from "../../../../redux/actions/chapterActions";
import { getCompletedLessons } from "../../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
// import CourseContent from "./components/course_content";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ResetCourseDialog = ({
  open,
  handleClose,
  selectedStudentId,
  resetCourseId,
  handleOpenConfirmationModal,
  lessonsCompleted,
  setLessonsCompleted,
  setRecentLesson,
  setRecentQuiz,
  setRecentChapter,  
}) => {
  const dispatch = useDispatch();
  const _chapter = useSelector((state) => state.chapter);
  const _User = useSelector((state) => state.User);

  useEffect(() => {
    dispatch(getAllChaptersByCourse(resetCourseId));
    dispatch(
      getCompletedLessons({
        userId: selectedStudentId,
        courseId: resetCourseId,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCourseId, selectedStudentId]);

  useEffect(() => {
    if (_User?.completedLessons) {
      setLessonsCompleted(_User?.completedLessons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User?.completedLessons]);

  const resetStudentProgress = (lessonId, quizId, chapterId) => {
    let temporaryArray = [];
    for (let i = 0; i < lessonsCompleted?.length; i++) {
      if (lessonId === lessonsCompleted[i]?.lesson) {
        break;
      } else {
        temporaryArray.push(lessonsCompleted[i]);
      }
    }
    setLessonsCompleted(temporaryArray);    
    setRecentLesson(lessonId);
    setRecentQuiz(quizId);
    setRecentChapter(chapterId);    
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        width="100%"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Reset Course Progress
        </DialogTitle>
        <DialogContent dividers style={{ height: "100vh" }}>
          <Typography gutterBottom>
            This page resets your course progress back to beginning or whatever
            lesson you choose.
          </Typography>
          {!_chapter.loading ? (
            _chapter.data.map((item, i) => (
              <CourseContent
                chapter={item}
                chapterIndex={i}
                isCourseEnrolled={false}
                courseCompletedLessons={lessonsCompleted}
                updateAccess={false}
                courseAccessType="Automatic"
                startedLearning={new Date()}
                resetStudentProgress={resetStudentProgress}
                type="course reset"
              />
            ))
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>
                <CircularProgress />
              </span>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="small"
            style={{ borderColor: "#ff8c00", color: "#ff8c00" }}
            onClick={() => handleOpenConfirmationModal()}
          >
            Reset
          </Button>
          &nbsp;
          <Button
            variant="outlined"
            size="small"
            style={{ borderColor: "#ff8c00", color: "#ff8c00" }}
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResetCourseDialog;
