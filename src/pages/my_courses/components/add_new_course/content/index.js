import { Button, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ChapterAccordion from "./compoments/chapter_accordion";
import { makeStyles } from "@material-ui/core/styles";
import ChapterForm from "./compoments/chapter_form";
import {
  delete_Chapter,
  update_Chapter,
  createChapter,
  getAllChaptersByCourse,
} from "../../../../../redux/actions/chapterActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../../components/alerts/modal";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
    width: "50%",
  },
}));

const Content = ({ course }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const _chapter = useSelector((state) => state.chapter);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [chapterToDelete, setChapterToDelete] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [editChapterId, setEditChapterId] = useState(-1);
  const [editingChapter, setEditingChapter] = useState(false);
  const [chapterForm, setChapterForm] = useState(false);
  const [addNewChapterButton, setAddNewChapterButton] = useState(true);
  const [chapterNumberError, setChapterNumberError] = useState(false);
  const [chapterNumberErrorText, setChapterNumberErrorText] = useState("");
  const [chapterTitleError, setChapterTitleError] = useState(false);
  const [chapterTitleErrorText, setChapterTitleErrorText] = useState("");
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState({
    course: localStorage.getItem("courseId"),
    title: "",
    order: chapters.length + 1,
  });

  useEffect(() => {
    dispatch(getAllChaptersByCourse(localStorage.getItem("courseId")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setChapters(_chapter.data);
    setChapter({ ...chapter, order: _chapter.data.length + 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_chapter.data]);

  const saveChapter = (e) => {
    e.preventDefault();
    if (chapter.title.length === 0) {
      setChapterTitleError(true);
      setChapterTitleErrorText(
        "Chapter title is required, please enter a unique title"
      );
    }
    else if (chapterTitleError) {
      return;
    }
    else if (chapterNumberError) {
      return;
    }
    else {
      setChapter({
        course: localStorage.getItem("courseId"),
        title: "",
        order: chapters.length + 1,
      });
      dispatch(createChapter(chapter));
      setChapterForm(false);
      setAddNewChapterButton(true);
    }
  };

  const varifyChapterTitleIsAlreadyExist = (title) => {
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].title === title) {
        return true;
      }
    }
    return false;
  };

  const varifyChapterNumberIsAlreadyExist = (n) => {
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].order === n) {
        return true;
      }
    }
    return false;
  };

  const handleField = ({ target }) => {
    if (target.name === "order") {
      // check if chapter number is already exist
      if (target.value.length === 0) {
        setChapter({ ...chapter, [target.name]: target.value });
        setChapterNumberError(true);
        setChapterNumberErrorText("Please, Enter the Correct chapter number.");
      } else if (!varifyChapterNumberIsAlreadyExist(parseInt(target.value))) {
        setChapterNumberError(false);
        setChapterNumberErrorText("");
        setChapter({ ...chapter, [target.name]: target.value });
      } else {
        setChapter({ ...chapter, [target.name]: target.value });
        setChapterNumberError(true);
        setChapterNumberErrorText(
          "Please, Enter unique number."
        );
      }
    } else if (target.name === "title") {
      // check if chapter number is already exist
      // varifyChapterTitleIsAlreadyExist
      if (!varifyChapterTitleIsAlreadyExist(target.value)) {
        setChapterTitleError(false);
        setChapterTitleErrorText("");
        setChapter({ ...chapter, [target.name]: target.value });
      } else {
        setChapterTitleError(true);
        setChapterTitleErrorText("Chapter Title must be unique.");
        setChapter({ ...chapter, [target.name]: target.value });
      }
    }
  };

  const handleOpenChapterForm = () => {
    setChapterForm(true);
    setAddNewChapterButton(false);
  };
  const handleCloseChapterForm = () => {
    setChapterForm(false);
    setAddNewChapterButton(true);
    setChapterTitleError(false);
    setChapterTitleErrorText("");
    setChapterNumberError(false);
    setChapterNumberErrorText("");
    setChapter({
      course: localStorage.getItem("courseId"),
      title: "",
      order: chapters.length + 1,
    });
  };

  const handleChapterEdit = (chapter) => {
    setAddNewChapterButton(false);
    setChapter(chapter);
    setEditingChapter(true);
    setChapterForm(true);
  };

  const updateChapter = (e) => {
    e.preventDefault();
    if (chapter.title.length === 0) {
      setChapterTitleError(true);
      setChapterTitleErrorText(
        "Chapter title is required, please enter a unique title"
      );
    }
    else if (chapterTitleError) {
      return;
    }
    else if (chapterNumberError) {
      return;
    }
    else {
      setEditingChapter(false);
      setChapter({
        course: localStorage.getItem("courseId"),
        title: "",
        order: chapters.length + 1,
      });
      dispatch(update_Chapter(chapter));
      setChapterForm(false);
      setAddNewChapterButton(true);
     }
  };

  const deleteChapter = () => {
    setChapter({
      course: localStorage.getItem("courseId"),
      title: "",
    });
    dispatch(delete_Chapter(localStorage.getItem("courseId"), chapterToDelete));
    setChapterForm(false);
    setEditingChapter(false);
    setAddNewChapterButton(true);
    setOpen(false);
  };

  const deleteItem = (item) => {
    setChapterToDelete(item);
    setOpen(true);
  };

  const cancelItem = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginTop: "30px", marginLeft: "10px", marginRight: "10px" }}>
      {addNewChapterButton && (
        <Button
          variant="outlined"          
          style={{
            color: "#ff8c00", borderColor: "#ff8c00",
            marginBottom: "20px",
          }}
          onClick={() => handleOpenChapterForm()}
        >
          Add New Chapter
        </Button>
      )}
      {course.title !== "" ? (
        <span
          style={{
            marginLeft: "10%",
            color: "#111",
            fontSize: "24px",
            fontWeight: "300",
          }}
        >
          {course.title} [{course.status}]
        </span>
      ) : null}

      {_chapter.loading ? (
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <span>
            <CircularProgress />
          </span>
        </div>
      ) : null}

      {chapterForm ? (
        <ChapterForm
          chapter={chapter}
          handleField={handleField}
          classes={classes}
          saveChapter={saveChapter}
          handleCloseChapterForm={handleCloseChapterForm}
          editingChapter={editingChapter}
          deleteItem={deleteItem}
          updateChapter={updateChapter}
          chapterNumberError={chapterNumberError}
          chapterNumberErrorText={chapterNumberErrorText}
          chapterTitleError={chapterTitleError}
          chapterTitleErrorText={chapterTitleErrorText}
        />
      ) : null}
      {chapters.length > 0
        ? chapters
            .sort(function (a, b) {
              return a.order - b.order;
            })
            .map((chapter, i) => (
              <ChapterAccordion
                chapter={chapter}
                chapterIndex={i}
                handleChapterEdit={handleChapterEdit}
                deleteItem={deleteItem}
              />
            ))
        : null}
      <Modal
        setOpen={cancelItem}
        text={"Confirmation"}
        open={open}
        performAction={deleteChapter}
        description={"Are you sure you want to delete this item?"}
      />
    </div>
  );
};

export default Content;
