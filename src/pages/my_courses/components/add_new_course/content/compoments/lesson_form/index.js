import React from "react";
import StyledRadio from "../../../../../../../components/styledRadio";
import RichTextEditor from "../../../../../../../components/richTextEditor";
import * as moment from "moment";
import { Button, FormControl, Select, TextField } from "@material-ui/core";
import UploadVideo from "../../../../../../../components/uploadVideo";
import { baseUrl } from "../../../../../../../utils/api";
import VideoPlayer from "../../../../../../../components/VideoPlayer";

const LessonForm = ({
  lesson,
  handleField,
  classes,
  saveLesson,
  handleCancleLesson,
  editingLesson,
  deleteItem,
  updateLesson,
  handleLessonDrip,
  deleteLessonId,
  handleContent1Change,
  handleContent2Change,
  handleContent3Change,
  handleContent4Change,
  handleContent1TypeChange,
  handleContent2TypeChange,
  handleContent3TypeChange,
  handleContent4TypeChange,
  handleVideoUpload,
  video1InputRef,
  video2InputRef,
  video3InputRef,
  video4InputRef,
  video1,
  video2,
  video3,
  video4,
  video1local,
  video2local,
  video3local,
  video4local,
  lessonNumberError,
  lessonNumberErrorText,
  lessonTitleError,
  lessonTitleErrorText,
}) => {
  var d = new Date();
  return (
    <>
      <form
        onSubmit={editingLesson ? (e) => updateLesson(e) : (e) => saveLesson(e)}
      >
        <h3>Lesson Title:</h3>
        <TextField          
          name="lessonTitle"
          placeholder="Enter the Lesson Title."
          value={lesson.lessonTitle}
          onChange={handleField}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{
            className: classes.lableColor,
          }}
          required
          error={lessonTitleError}
          helperText={lessonTitleErrorText}
        />
        <h3>
          Lesson Content 1: &nbsp;
          <StyledRadio
            checked={lesson.lessonContent1.text}
            onChange={() =>
              handleContent1TypeChange("text", lesson.lessonContent1.text)
            }
          />{" "}
          Rich Text &nbsp;
          <StyledRadio
            checked={lesson.lessonContent1.video}
            onChange={() =>
              handleContent1TypeChange("video", lesson.lessonContent1.video)
            }
          />{" "}
          Video
        </h3>
        {video1 ? <h4>{video1.name}</h4> : null}
        {lesson.lessonContent1.video ? (
          <>
            {lesson.lessonContent1.videoUrl.length > 0 || video1local ? (
              <VideoPlayer
                url={
                  lesson.lessonContent1.videoUrl.length > 0
                    ? `${baseUrl}/public/videos/${lesson.lessonContent1.videoUrl}`
                    : video1local
                }
              />
            ) : null}
            <UploadVideo
              name="video1"
              handleUploadClick={handleVideoUpload}
              videoInputRef={video1InputRef}
            />
          </>
        ) : (
          <RichTextEditor
            handleChange={handleContent1Change}
            isEditing={
              lesson.lessonContent1.richText !== "" ? editingLesson : false
            }
            editorState={lesson.lessonContent1.richText}
          />
        )}
        <h3>
          Lesson Content 2: &nbsp;
          <StyledRadio
            checked={lesson.lessonContent2.text}
            onChange={() =>
              handleContent2TypeChange("text", lesson.lessonContent2.text)
            }
          />{" "}
          Rich Text &nbsp;
          <StyledRadio
            checked={lesson.lessonContent2.video}
            onChange={() =>
              handleContent2TypeChange("video", lesson.lessonContent2.video)
            }
          />{" "}
          Video
        </h3>
        {video2 ? <h4>{video2.name}</h4> : null}
        {lesson.lessonContent2.video ? (
          <>
            {lesson.lessonContent2.videoUrl.length > 0 || video2local ? (
              <VideoPlayer
                url={
                  lesson.lessonContent2.videoUrl.length > 0
                    ? `${baseUrl}/public/videos/${lesson.lessonContent2.videoUrl}`
                    : video2local
                }
              />
            ) : null}
            <UploadVideo
              name="video2"
              handleUploadClick={handleVideoUpload}
              videoInputRef={video2InputRef}
            />
          </>
        ) : (
          <RichTextEditor
            handleChange={handleContent2Change}
            isEditing={
              lesson.lessonContent2.richText !== "" ? editingLesson : false
            }
            editorState={lesson.lessonContent2.richText}
          />
        )}
        <h3>
          Lesson Content 3: &nbsp;
          <StyledRadio
            checked={lesson.lessonContent3.text}
            onChange={() =>
              handleContent3TypeChange("text", lesson.lessonContent3.text)
            }
          />{" "}
          Rich Text &nbsp;
          <StyledRadio
            checked={lesson.lessonContent3.video}
            onChange={() =>
              handleContent3TypeChange("video", lesson.lessonContent3.video)
            }
          />{" "}
          Video
        </h3>
        {video3 ? <h4>{video3.name}</h4> : null}
        {lesson.lessonContent3.video ? (
          <>
            {lesson.lessonContent3.videoUrl.length > 0 || video3local ? (
              <VideoPlayer
                url={
                  lesson.lessonContent3.videoUrl.length > 0
                    ? `${baseUrl}/public/videos/${lesson.lessonContent3.videoUrl}`
                    : video3local
                }
              />
            ) : null}
            <UploadVideo
              name="video3"
              handleUploadClick={handleVideoUpload}
              videoInputRef={video3InputRef}
            />
          </>
        ) : (
          <RichTextEditor
            handleChange={handleContent3Change}
            isEditing={
              lesson.lessonContent3.richText !== "" ? editingLesson : false
            }
            editorState={lesson.lessonContent3.richText}
          />
        )}
        <h3>
          Lesson Content 4: &nbsp;
          <StyledRadio
            checked={lesson.lessonContent4.text}
            onChange={() =>
              handleContent4TypeChange("text", lesson.lessonContent4.text)
            }
          />{" "}
          Rich Text &nbsp;
          <StyledRadio
            checked={lesson.lessonContent4.video}
            onChange={() =>
              handleContent4TypeChange("video", lesson.lessonContent4.video)
            }
          />{" "}
          Video
        </h3>
        {video4 ? <h4>{video4.name}</h4> : null}
        {lesson.lessonContent4.video ? (
          <>
            {lesson.lessonContent4.videoUrl.length > 0 || video4local ? (
              <VideoPlayer
                url={
                  lesson.lessonContent4.videoUrl.length > 0
                    ? `${baseUrl}/public/videos/${lesson.lessonContent4.videoUrl}`
                    : video4local
                }
              />
            ) : null}
            <UploadVideo
              name="video4"
              handleUploadClick={handleVideoUpload}
              videoInputRef={video4InputRef}
            />
          </>
        ) : (
          <RichTextEditor
            handleChange={handleContent4Change}
            isEditing={
              lesson.lessonContent4.richText !== "" ? editingLesson : false
            }
            editorState={lesson.lessonContent4.richText}
          />
        )}

        <h3>Lesson Drip:</h3>
        <p>When should this lesson become available?</p>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          style={{ width: "50%" }}
        >
          <Select
            native
            value={lesson.lessonDrip.dripType}
            name="status"
            onChange={(e) => handleLessonDrip("dripType", e.target.value)}
            inputProps={{
              name: "lessonDrip",
              id: "outlined-age-native-simple",
            }}
          >
            <option selected value="no delay">
              --- No Delay ---
            </option>
            <option value="specific date">On a specific date</option>
            <option value="specific interval">
              A specific interval after the course start date
            </option>
          </Select>
        </FormControl>
        {lesson.lessonDrip.dripType === "specific date" ? (
          <>
            <p>
              Select the date on which this lesson should become available...
            </p>
            <TextField
              type="date"
              defaultValue={`${moment(d).format("YYYY")}-${moment(d).format(
                "MM"
              )}-${moment(d).format("DD")}`}
              onChange={(e) => handleLessonDrip("specificDate", e.target.value)}
              className={classes.datepic}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        ) : null}
        {lesson.lessonDrip.dripType === "specific interval" ? (
          <>
            <p>
              How long after the user is enrolled should this lesson become
              available?
            </p>
            <TextField
              // label="Lesson Title"
              name="lesson_title"
              type="number"
              value={lesson.lessonDrip.specificInterval.invervalNumber}
              onChange={(e) =>
                handleLessonDrip("invervalNumber", e.target.value)
              }
              variant="outlined"
              style={{ marginBottom: "20px", width: "10%" }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              InputLabelProps={{
                className: classes.lableColor,
              }}
            />
            &nbsp;&nbsp;&nbsp;
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ width: "50%" }}
            >
              <Select
                native
                value={lesson.lessonDrip.specificInterval.invervalType}
                onChange={(e) =>
                  handleLessonDrip("invervalType", e.target.value)
                }
                inputProps={{
                  name: "invervalType",
                  id: "outlined-age-native-simple",
                }}
              >
                <option value="hour">Hour(S)</option>
                <option value="day">Day(S)</option>
                <option value="week">Week(S)</option>
                <option value="month">Month(S)</option>
                <option value="year">Year(S)</option>
              </Select>
            </FormControl>
          </>
        ) : null}
        <TextField
          label="Lesson Order"
          name="order"
          placeholder="Enter the lesson Order."
          value={lesson.order}
          type="number"
          onChange={handleField}
          variant="outlined"
          fullWidth
          required
          style={{ marginTop: "20px" }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          error={lessonNumberError}
          helperText={lessonNumberErrorText}
        />
        <div>
          <br />
          {editingLesson ? (
            <Button
              type="submit"
              variant="outlined"
              style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
            >
              Update
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outlined"
              style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
            >
              Save
            </Button>
          )}
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="outlined"
            style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
            onClick={() => handleCancleLesson()}
          >
            Cancel
          </Button>
          &nbsp;&nbsp;&nbsp;
          {editingLesson && (
            <Button
              variant="outlined"
              style={{ color: "#fff", borderColor: "#d72924", backgroundColor:'#d72924' }}
              onClick={() => deleteItem(deleteLessonId)}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default LessonForm;
