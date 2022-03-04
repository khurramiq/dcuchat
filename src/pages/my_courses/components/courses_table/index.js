import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Delete, Edit } from "@material-ui/icons";
import { CircularProgress, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import * as moment from "moment";
import RichTextEditor from "../../../../components/richTextEditor";
import { convertToRaw } from "draft-js";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CoursesTable = ({
  courses,
  deleteItem,
  handleCourseEdit,
  handleCopyFormOpening,
  copyCourseTitle,
  setCopyCourseTitle,
  copyCourseDescription,
  setCopyCourseDescription,
  copyCoures,
  handleAddNewCourse,
}) => {
  const classes = useStyles();
  const _course = useSelector((state) => state.course);

  const handleDescriptionChange = (editorState) => {
    const data = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(data));
    setCopyCourseDescription(content);
  };

  const getPublishedCourses = () => {
    let published = 0;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].status === "Published") {
        published++;
      }
    }
    return published;
  };

  const getDraftCourses = () => {
    let draft = 0;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].status === "Draft") {
        draft++;
      }
    }
    return draft;
  };

  return (
    <div style={{ margin: "0 10px" }}>
      <TableContainer component={Paper}>
        <br />
        <div style={{ display: "flex" }}>
          <span style={{ fontSize: "24px", marginLeft: "20px" }}>Courses</span>{" "}
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="outlined"
            style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
            onClick={() => handleAddNewCourse()}
          >
            Add New
          </Button>
        </div>
        <br />
        <div>
          All ({courses.length}) |{" "}
          <span style={{ color: "#1976D2" }}>Published</span> (
          {getPublishedCourses()}) |{" "}
          <span style={{ color: "#1976D2" }}>Draft</span> ({getDraftCourses()})
        </div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#328cc1" }}>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>Title</TableCell>
              <TableCell style={{ color: "#fff" }}>Actions</TableCell>
              <TableCell style={{ color: "#fff" }}>Teacher</TableCell>
              <TableCell style={{ color: "#fff" }}>Students Enrolled</TableCell>
              <TableCell style={{ color: "#fff" }}>Published On</TableCell>
              <TableCell style={{ color: "#fff" }}>Enrollment Start</TableCell>
              <TableCell style={{ color: "#fff" }}>Course Start</TableCell>
              <TableCell style={{ color: "#fff" }}>Course End</TableCell>
              <TableCell style={{ color: "#fff" }}>Updated</TableCell>
              <TableCell style={{ color: "#fff" }}>Modified By</TableCell>
              <TableCell style={{ color: "#fff" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          {!_course.loading && (
            <TableBody>
              {courses.map((row, i) => (
                <>
                  <TableRow key={i}>
                    <TableCell
                      style={{ color: "#1976D2" }}
                      component="th"
                      scope="row"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell>
                      <Edit
                        style={{ color: "#328cc1", cursor: "pointer" }}
                        onClick={() => handleCourseEdit(row)}
                      />
                      &nbsp;
                      <FileCopyIcon
                        style={{ color: "#328cc1", cursor: "pointer" }}
                        onClick={() => handleCopyFormOpening(i, true)}
                      />
                      &nbsp;
                      <Delete
                        style={{ color: "#d72924", cursor: "pointer" }}
                        onClick={() => deleteItem(row._id)}
                      />
                    </TableCell>
                    <TableCell>
                      {row.teachers.map((teacher) => teacher.name + ", ")}
                    </TableCell>
                    <TableCell>{row.studentsEnrolled}</TableCell>
                    <TableCell>
                      {moment(row.publishedOn).format("MMMM")}.{" "}
                      {moment(row.publishedOn).format("DD")},{" "}
                      {moment(row.publishedOn).format("YYYY")} at{" "}
                      {moment(row.publishedOn).format("hh:mm A")}
                    </TableCell>
                    <TableCell>
                      {moment(row.enrollmentStartDate).format("MMMM")}.{" "}
                      {moment(row.enrollmentStartDate).format("DD")},{" "}
                      {moment(row.enrollmentStartDate).format("YYYY")} at{" "}
                      {moment(row.enrollmentStartDate).format("hh:mm A")}
                    </TableCell>
                    <TableCell>
                      {moment(row.startDate).format("MMMM")}.{" "}
                      {moment(row.startDate).format("DD")},{" "}
                      {moment(row.startDate).format("YYYY")} at{" "}
                      {moment(row.startDate).format("hh:mm A")}
                    </TableCell>
                    <TableCell>
                      {moment(row.endDate).format("MMMM")}.{" "}
                      {moment(row.endDate).format("DD")},{" "}
                      {moment(row.endDate).format("YYYY")} at{" "}
                      {moment(row.endDate).format("hh:mm A")}
                    </TableCell>
                    <TableCell>
                      {moment(row.updatedAt).format("MMMM")}.{" "}
                      {moment(row.updatedAt).format("DD")},{" "}
                      {moment(row.updatedAt).format("YYYY")} at{" "}
                      {moment(row.updatedAt).format("hh:mm A")}
                    </TableCell>
                    <TableCell>{row.modifiedByName}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan="11">
                      {row.courseCopyForm && (
                        <div>
                          <TextField
                            label="Title"
                            name="title"
                            placeholder="Enter the unique Title."
                            value={copyCourseTitle}
                            onChange={(e) => setCopyCourseTitle(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: "20px", width: "100%" }}
                            InputProps={{
                              classes: {
                                notchedOutline: classes.notchedOutline,
                              },
                            }}
                            InputLabelProps={{
                              className: classes.lableColor,
                            }}
                          />
                          <RichTextEditor
                            handleChange={handleDescriptionChange}
                            isEditing={false}
                            editorState={copyCourseDescription}
                          />
                          <br />
                          <Button
                            variant="outlined"
                            style={{
                              color: "#1976D2",
                              borderColor: "#1976D2",
                              padding: "8px",
                              width: "120px",
                            }}
                            onClick={() => copyCoures(i)}
                          >
                            copy
                          </Button>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Button
                            variant="outlined"
                            style={{
                              color: "#1976D2",
                              borderColor: "#1976D2",
                              padding: "8px",
                              width: "120px",
                            }}
                            onClick={() => handleCopyFormOpening(i, false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {_course.loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span>
            <CircularProgress />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default CoursesTable;
