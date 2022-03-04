import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import Visibility from "./components/visibility";
import PublishedOn from "./components/published_on";
import FeaturedImage from "./components/featured_image";
import * as moment from "moment";
import {
  Button,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import RichTextEditor from "../../../../../components/richTextEditor";
import { convertToRaw } from "draft-js";
import { allTeachers } from "../../../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Teachers from "./components/teachers";

const useStyles = makeStyles({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#1976D2 !important",
  },  
  formControl: {
    minWidth: 300,
  },
  select: {
    "&:before": {
      borderColor: "#07377f !important",
    },
    "&:after": {
      borderColor: "#07377f !important",
    },
  },
  icon: {
    fill: "#07377f !important",
  },
  datepic: {
    width: 300,
  },
});

const Detail = ({
  setTab,
  updateCourse,
  editingCourse,
  course,
  setCourse,
  setNewCourseForm,
  saveCourse,
}) => {
  const classes = useStyles();
  const imageInputRef = React.useRef();
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (_User.profile.role === "admin") {
      dispatch(allTeachers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleField = ({ target }) => {
    setCourse({ ...course, [target.name]: target.value });
  };

  const handleUploadClick = (e) => {
    var file = e.target.files[0];
    // var name = e.target.name;
    setImg(URL.createObjectURL(file));
    setCourse({ ...course, featuredImage: file });
    // setImage1(file);
  };

  const handleDescriptionChange = (editorState) => {
    const data = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(data));
    setCourse({ ...course, description: content });
  };

  return (
    <div style={{ marginTop: "30px", marginLeft: "10px", marginRight: "10px" }}>
      <TextField
        label="Title"
        name="title"
        placeholder="Enter the unique Title."
        value={course.title}
        onChange={handleField}
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}               
      />
      <RichTextEditor
        handleChange={handleDescriptionChange}
        isEditing={editingCourse}
        editorState={course.description}
      />
      <CardContent>
        <h4>Featured Image</h4>
        <FeaturedImage
          img={img}
          handleUploadClick={handleUploadClick}
          imageInputRef={imageInputRef}
          featuredImage={course.featuredImage}
          isEditing={editingCourse}
        />
        <Grid container xs={12}>
          <Grid item xs={12} sm={4}>
            <h4>Status</h4>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Status
              </InputLabel>
              <Select
                native
                value={course.status}
                name="status"
                onChange={handleField}
                label="Status"
                inputProps={{
                  name: "status",
                  id: "outlined-age-native-simple",
                }}
              >
                <option selected value="Draft">
                  Draft
                </option>
                <option value="Published">Published</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h4>Published On</h4>
            <PublishedOn course={course} handleField={handleField} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <h4>Enrollment Start Date:</h4>
            <TextField
              type="date"
              name="enrollmentStartDate"
              defaultValue={`${moment(course.enrollmentStartDate).format(
                "YYYY"
              )}-${moment(course.enrollmentStartDate).format("MM")}-${moment(
                course.enrollmentStartDate
              ).format("DD")}`}
              onChange={handleField}
              className={classes.datepic}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12} sm={4}>
            <h4>Course Start Date:</h4>
            <TextField
              type="date"
              name="startDate"
              defaultValue={`${moment(course.startDate).format(
                "YYYY"
              )}-${moment(course.startDate).format("MM")}-${moment(
                course.startDate
              ).format("DD")}`}
              onChange={handleField}
              className={classes.datepic}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <h4>Course End Date:</h4>
            <TextField
              type="date"
              name="endDate"
              defaultValue={`${moment(course.endDate).format("YYYY")}-${moment(
                course.endDate
              ).format("MM")}-${moment(course.endDate).format("DD")}`}
              onChange={handleField}
              className={classes.datepic}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <h4>Visibility:</h4>
            <Visibility course={course} handleField={handleField} /> */}
          </Grid>
        </Grid>
        {_User.profile.role === "admin" ? (
          _User.allTeachersLoading ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>
                <CircularProgress />
              </span>
            </div>
          ) : (
            <>
              <h4>Teacher:</h4>
              {_User.allTeachers.map((item, i) => (
                <Teachers
                  item={item}
                  i={i}
                  course={course}
                  setCourse={setCourse}
                />
              ))}
            </>
          )
        ) : (
          <>
            <br />
          </>
        )}
        {editingCourse ? (
          <Button
            variant="outlined"
            style={{
              color: "#ff8c00",
              borderColor: "#ff8c00",
              padding: "8px",
              width: "120px",
            }}
            onClick={() => updateCourse()}
          >
            Update
          </Button>
        ) : (
          <Button
            variant="outlined"
            style={{
              color: "#ff8c00",
              borderColor: "#ff8c00",
              padding: "8px",
              width: "120px",
            }}
            // onClick={() => setTab(0)}
            onClick={() => saveCourse()}
          >
            Save
          </Button>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="outlined"
          style={{
            color: "#ff8c00",
            borderColor: "#ff8c00",
            padding: "8px",
            width: "120px",
          }}
          onClick={() => setNewCourseForm(false)}
        >
          Cancel
        </Button>
      </CardContent>
    </div>
  );
};

export default Detail;
