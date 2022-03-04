import React from "react";
import { Button, TextField } from "@material-ui/core";

const ChapterForm = ({
  chapter,
  handleField,
  classes,
  saveChapter,
  handleCloseChapterForm,
  editingChapter,
  deleteItem,
  updateChapter,
  chapterNumberError,
  chapterNumberErrorText,
  chapterTitleError,
  chapterTitleErrorText,
}) => {
  return (
    <>
      <form
        onSubmit={
          editingChapter ? (e) => updateChapter(e) : (e) => saveChapter(e)
        }
      >
        <TextField
          label="Chapter Title"
          name="title"
          placeholder="Enter the Chapter Title."
          value={chapter.title}
          onChange={handleField}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{ shrink: true }}          
          error={chapterTitleError}
          helperText={chapterTitleErrorText}
        />
        <TextField
          label="Chapter Number"
          name="order"
          placeholder="Enter the Chapter Number."
          value={chapter.order}
          type="number"
          onChange={handleField}
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: "20px" }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{
            className: classes.lableColor,
          }}
          error={chapterNumberError ? true : false}
          helperText={chapterNumberErrorText}
        />
        {editingChapter ? (
          <Button
            variant="outlined"
            type="submit"
            style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
          >
            Update
          </Button>
        ) : (
          <Button
            variant="outlined"
            type="submit"
            style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
          >
            Save
          </Button>
        )}
        &nbsp;&nbsp;&nbsp;
        <Button
          variant="outlined"
          style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
          onClick={() => handleCloseChapterForm()}
        >
          Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;
        {editingChapter && (
          <Button
            variant="outlined"
            style={{ color: "#fff", borderColor: "#d72924", backgroundColor:'#d72924' }}
            onClick={() => deleteItem(chapter)}
          >
            Delete
          </Button>
        )}
        <br />
        <br />
      </form>
    </>
  );
};

export default ChapterForm;
