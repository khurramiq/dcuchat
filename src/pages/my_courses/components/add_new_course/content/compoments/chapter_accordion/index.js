import React, { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, CircularProgress } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
// import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LessonAccordion from "../lesson_accordion";
import LessonForm from "../lesson_form";
import { makeStyles } from "@material-ui/core/styles";
import {
  createLesson,
  deleteLesson,
  updateLesson,
} from "../../../../../../../redux/actions/lessonActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../../../../components/alerts/modal";
import { convertToRaw } from "draft-js";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
    width: "50%",
  },
}));

const ChapterAccordion = ({
  chapter,
  chapterIndex,
  deleteItem,
  handleChapterEdit,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const _lesson = useSelector((state) => state.lesson);
  const [open, setOpen] = useState(false);
  const [deleteLessonId, setDeleteLessonId] = useState("");
  const [editingLesson, setEditingLesson] = useState(false);
  const [addNewLessonButton, setAddNewLessonButton] = useState(true);
  const [lessonForm, setLessonForm] = useState(false);
  const [lessonNumberError, setLessonNumberError] = useState(false);
  const [lessonNumberErrorText, setLessonNumberErrorText] = useState("");
  const [lessonTitleError, setLessonTitleError] = useState(false);
  const [lessonTitleErrorText, setLessonTitleErrorText] = useState("");
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState({
    chapter: "",
    lessonTitle: "",
    lessonContent1: {
      text: true,
      video: false,
      richText: "",
      videoUrl: "",
    },
    lessonContent2: {
      text: true,
      video: false,
      richText: "",
      videoUrl: "",
    },
    lessonContent3: {
      text: true,
      video: false,
      richText: "",
      videoUrl: "",
    },
    lessonContent4: {
      text: false,
      video: true,
      richText: "",
      videoUrl: "",
    },
    lessonDrip: {
      dripType: "no delay",
      specificDate: new Date(),
      specificInterval: {
        invervalNumber: 1,
        invervalType: "hour",
      },
    },
    order: lessons.length + 1,
  });
  const video1InputRef = React.useRef();
  const video2InputRef = React.useRef();
  const video3InputRef = React.useRef();
  const video4InputRef = React.useRef();

  const [video1, setVideo1] = useState(null);
  const [video2, setVideo2] = useState(null);
  const [video3, setVideo3] = useState(null);
  const [video4, setVideo4] = useState(null);

  const [video1local, setVideo1local] = useState(null);
  const [video2local, setVideo2local] = useState(null);
  const [video3local, setVideo3local] = useState(null);
  const [video4local, setVideo4local] = useState(null);

  const lessonsByChapter = (allLessons, lessonsArray) => {
    let temp = [];
    for (let i = 0; i < allLessons.length; i++) {
      for (let j = 0; j < lessonsArray.length; j++) {
        if (allLessons[i]._id === lessonsArray[j].lesson) {
          temp.push(allLessons[i]);
        }
      }
    }
    return temp;
  };

  useEffect(() => {
    setLessons(lessonsByChapter(_lesson.data, chapter?.lessons));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_lesson.data, chapter?.lessons]);

  const handleLessonDrip = (type, value) => {
    if (type === "dripType") {
      setLesson({
        ...lesson,
        lessonDrip: { ...lesson.lessonDrip, dripType: value },
      });
    } else if (type === "specificDate") {
      setLesson({
        ...lesson,
        lessonDrip: { ...lesson.lessonDrip, specificDate: value },
      });
    } else if (type === "invervalNumber") {
      setLesson({
        ...lesson,
        lessonDrip: {
          ...lesson.lessonDrip,
          specificInterval: {
            ...lesson.lessonDrip.specificInterval,
            invervalNumber: value,
          },
        },
      });
    } else if (type === "invervalType") {
      setLesson({
        ...lesson,
        lessonDrip: {
          ...lesson.lessonDrip,
          specificInterval: {
            ...lesson.lessonDrip.specificInterval,
            invervalType: value,
          },
        },
      });
    }
  };

  const resetLesson = () => {
    setLesson({
      chapter: chapter._id,
      lessonTitle: "",
      lessonContent1: {
        text: true,
        video: false,
        richText: "",
        videoUrl: "",
      },
      lessonContent2: {
        text: true,
        video: false,
        richText: "",
        videoUrl: "",
      },
      lessonContent3: {
        text: true,
        video: false,
        richText: "",
        videoUrl: "",
      },
      lessonContent4: {
        text: false,
        video: true,
        richText: "",
        videoUrl: "",
      },
      lessonDrip: {
        dripType: "no delay",
        specificDate: new Date(),
        specificInterval: {
          invervalNumber: 1,
          invervalType: "hour",
        },
      },
      order: lessons.length + 1,
    });
    setVideo1(null);
    setVideo2(null);
    setVideo3(null);
    setVideo4(null);

    setVideo1local(null);
    setVideo2local(null);
    setVideo3local(null);
    setVideo4local(null);
  };

  const varifyLessonTitleIsAlreadyExist = (title) => {
    for (let i = 0; i < lessons.length; i++) {
      if (lessons[i].lessonTitle === title) {
        return true;
      }
    }
    return false;
  };

  const varifyLessonNumberIsAlreadyExist = (n) => {
    for (let i = 0; i < lessons.length; i++) {
      if (lessons[i].order === n) {
        return true;
      }
    }
    return false;
  };

  const handleField = ({ target }) => {
    if (target.name === "order") {
      // check if chapter number is already exist
      if (target.value.length === 0) {
        setLesson({ ...lesson, [target.name]: target.value });
        setLessonNumberError(true);
        setLessonNumberErrorText("Please, Enter the Correct lesson number.");
      } else if (!varifyLessonNumberIsAlreadyExist(parseInt(target.value))) {
        setLessonNumberError(false);
        setLessonNumberErrorText("");
        setLesson({ ...lesson, [target.name]: target.value });
      } else {
        setLesson({ ...lesson, [target.name]: target.value });
        setLessonNumberError(true);
        setLessonNumberErrorText("Please, Enter unique number.");
      }
    } else if (target.name === "lessonTitle") {
      // check if lesson number is already exist      
      if (!varifyLessonTitleIsAlreadyExist(target.value)) {
        setLessonTitleError(false);
        setLessonTitleErrorText("");
        setLesson({ ...lesson, [target.name]: target.value });
      } else {
        setLessonTitleError(true);
        setLessonTitleErrorText("Lesson Title must be unique.");
        setLesson({ ...lesson, [target.name]: target.value });
      }
    } else {
      setLesson({ ...lesson, [target.name]: target.value });
    }
  };

  const handleContent1Change = (editorState) => {
    const data = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(data));
    setLesson({
      ...lesson,
      lessonContent1: { ...lesson.lessonContent1, richText: content },
    });
  };

  const handleContent1TypeChange = (clicked, prevValue) => {
    setLesson({
      ...lesson,
      lessonContent1: {
        ...lesson.lessonContent1,
        text: clicked === "text" ? !prevValue : prevValue,
        video: clicked === "video" ? !prevValue : prevValue,
      },
    });
  };
  
  const handleContent2Change = (editorState) => {
    const data = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(data));
    setLesson({
      ...lesson,
      lessonContent2: { ...lesson.lessonContent2, richText: content },
    });
  };

  const handleContent2TypeChange = (clicked, prevValue) => {
    setLesson({
      ...lesson,
      lessonContent2: {
        ...lesson.lessonContent2,
        text: clicked === "text" ? !prevValue : prevValue,
        video: clicked === "video" ? !prevValue : prevValue,
      },
    });
  };

  const handleContent3Change = (editorState) => {
    const data = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(data));
    setLesson({
      ...lesson,
      lessonContent3: { ...lesson.lessonContent3, richText: content },
    });
  };

  const handleContent3TypeChange = (clicked, prevValue) => {
    setLesson({
      ...lesson,
      lessonContent3: {
        ...lesson.lessonContent3,
        text: clicked === "text" ? !prevValue : prevValue,
        video: clicked === "video" ? !prevValue : prevValue,
      },
    });
  };

  const handleContent4Change = (editorState) => {
    const data = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(data));
    setLesson({
      ...lesson,
      lessonContent4: { ...lesson.lessonContent4, richText: content },
    });
  };

  const handleContent4TypeChange = (clicked, prevValue) => {
    setLesson({
      ...lesson,
      lessonContent4: {
        ...lesson.lessonContent4,
        text: clicked === "text" ? !prevValue : prevValue,
        video: clicked === "video" ? !prevValue : prevValue,
      },
    });
  };

  const handleVideoUpload = (e) => {
    var file = e.target.files[0];
    var name = e.target.name;
    if (name === "video1") {
      setVideo1(file);
      setVideo1local(URL.createObjectURL(file));
    } else if (name === "video2") {
      setVideo2(file);
      setVideo2local(URL.createObjectURL(file));
    } else if (name === "video3") {
      setVideo3(file);
      setVideo3local(URL.createObjectURL(file));
    } else if (name === "video4") {
      setVideo4(file);
      setVideo4local(URL.createObjectURL(file));
    }
  };

  const handleAddNewLesson = () => {
    setLessonForm(true);
    setAddNewLessonButton(false);
    resetLesson();
  };

  const handleCancleLesson = () => {
    setLessonForm(false);
    setAddNewLessonButton(true);
    setEditingLesson(false);
    setLessonNumberError(false);
    setLessonNumberErrorText("");
    setLessonTitleError(false);
    setLessonTitleErrorText("");
    resetLesson();
  };

  const handleLessonEdit = (l) => {
    setAddNewLessonButton(false);
    setDeleteLessonId(l._id);
    setLesson(l);
    setEditingLesson(true);
    setLessonForm(true);
  };

  const saveLesson = (e) => {
    e.preventDefault();
    if (chapter.title.length === 0) {
      setLessonTitleError(true);
      setLessonTitleErrorText(
        "Lesson title is required, please enter a unique title"
      );
    }
    else if (lessonTitleError) {
      return;
    }
    else if (lessonNumberError) {
      return;
    }
    else {
      let myform = new FormData();
      myform.append("lesson", JSON.stringify(lesson));
      myform.append("video1", video1);
      myform.append("video2", video2);
      myform.append("video3", video3);
      myform.append("video4", video4);
      dispatch(createLesson(myform));
      resetLesson();
      setLessonForm(false);
      setAddNewLessonButton(true);
    }
  };

  const deleteLesson1 = () => {
    resetLesson();
    dispatch(deleteLesson({ _id: deleteLessonId, chapterId: chapter._id }));
    setLessonForm(false);
    setEditingLesson(false);
    setAddNewLessonButton(true);
    setOpen(false);
  };

  const updateLesson1 = (e) => {
    e.preventDefault();
    if (chapter.title.length === 0) {
      setLessonTitleError(true);
      setLessonTitleErrorText(
        "Lesson title is required, please enter a unique title"
      );
    }
    else if (lessonTitleError) {
      return;
    }
    else if (lessonNumberError) {
      return;
    }
    else {      
      setEditingLesson(false);
      resetLesson();
      let myform = new FormData();
      myform.append("lesson", JSON.stringify(lesson));
      myform.append("video1", video1);
      myform.append("video2", video2);
      myform.append("video3", video3);
      myform.append("video4", video4);
      dispatch(updateLesson(myform));
      setLessonForm(false);
      setAddNewLessonButton(true);
      setOpen(false);
    }
  };

  const deleteItemlesson = (index) => {
    setDeleteLessonId(index);
    setOpen(true);
  };

  const cancelItem = () => {
    setOpen(false);
  };

  return (
    <Accordion key={chapterIndex} style={{ marginBottom: "5px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ backgroundColor: "#328cc1" }}
      >
        <Grid container xs={12}>
          <Grid item xs={9} sm={6}>
            <Typography className={classes.heading}>
              Chapter {chapter.order} - {chapter?.title}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={6} style={{ textAlign: "right" }}>
            {/* style={{ marginLeft: "45%" }} */}
            <span>
              <Edit
                style={{ color: "#fff" }}
                onClick={() => handleChapterEdit(chapter)}
              />
              &nbsp;&nbsp;&nbsp;
              <Delete
                style={{ color: "#d72924" }}
                onClick={() => deleteItem(chapter)}
              />
              {/* &nbsp;&nbsp;&nbsp;  */}
              {/* <VisibilityOffIcon style={{ color: "white" }} /> */}
            </span>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails style={{ display: "block" }}>
        {addNewLessonButton && (
          <Button
            variant="outlined"
            style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
            onClick={() => handleAddNewLesson()}
          >
            Add New Lesson
          </Button>
        )}
        {_lesson.loading ? (
          <div style={{ textAlign: "center" }}>
            <span>
              <CircularProgress />
            </span>
          </div>
        ) : null}
        {lessonForm ? (
          <LessonForm
            classes={classes}
            lesson={lesson}
            handleField={handleField}
            handleLessonDrip={handleLessonDrip}
            lessonNumberError={lessonNumberError}
            lessonNumberErrorText={lessonNumberErrorText}
            lessonTitleError={lessonTitleError}
            lessonTitleErrorText={lessonTitleErrorText}
            saveLesson={saveLesson}
            handleCancleLesson={handleCancleLesson}
            editingLesson={editingLesson}
            deleteItem={deleteItemlesson}
            deleteLessonId={deleteLessonId}
            updateLesson={updateLesson1}
            handleContent1Change={handleContent1Change}
            handleContent2Change={handleContent2Change}
            handleContent3Change={handleContent3Change}
            handleContent4Change={handleContent4Change}
            handleContent1TypeChange={handleContent1TypeChange}
            handleContent2TypeChange={handleContent2TypeChange}
            handleContent3TypeChange={handleContent3TypeChange}
            handleContent4TypeChange={handleContent4TypeChange}
            handleVideoUpload={handleVideoUpload}
            video1InputRef={video1InputRef}
            video2InputRef={video2InputRef}
            video3InputRef={video3InputRef}
            video4InputRef={video4InputRef}
            video1={video1}
            video2={video2}
            video3={video3}
            video4={video4}
            video1local={video1local}
            video2local={video2local}
            video3local={video3local}
            video4local={video4local}
          />
        ) : null}
        <br />
        <br />
        {lessons
          .sort(function (a, b) {
            return a.order - b.order;
          })
          .map((l, index) => (
            <LessonAccordion
              lesson={l}
              chapter={chapter}
              i={index}
              handleLessonEdit={handleLessonEdit}
              deleteItem={deleteItemlesson}
            />
          ))}
      </AccordionDetails>
      <Modal
        setOpen={cancelItem}
        text={"Confirmation"}
        open={open}
        performAction={deleteLesson1}
        description={"Are you sure you want to delete this item?"}
      />
    </Accordion>
  );
};

export default ChapterAccordion;
