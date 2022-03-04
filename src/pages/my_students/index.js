import React, { useEffect, useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
  CircularProgress,
  FormControl,
  Select,
  Grid,
} from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Modal from "../../components/alerts/modal";
import useTable from "./components/useTable";
// import * as employeeService from "./services/employeeService";
import Controls from "./components/controls/Controls";
import { Delete, Edit, Search } from "@material-ui/icons";
import CustomizedCheckbox from "../my_courses/components/add_new_course/detail/components/customized_checkbox";
import ProgressBar from "../my_learning/components/progress_bar";
import {
  allStudents,
  accountEnable,
  update_CourseAccess,
} from "../../redux/actions/userActions";
import { reset_CourseProgress } from "../../redux/actions/lessonActions";
import { useDispatch, useSelector } from "react-redux";
import CourseResetModle from "./components/course_reset_modle";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
  },
  searchInput: {
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      width: "25%",
    },
  },
}));

const Students = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  // eslint-disable-next-line no-unused-vars
  const [records, setRecords] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [resetCourseId, setResetCourseId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [lessonsCompleted, setLessonsCompleted] = useState([]);
  const [recentLesson, setRecentLesson] = useState(null);
  const [recentQuiz, setRecentQuiz] = useState(null);
  const [recentChapter, setRecentChapter] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let headCells = [];
  if (_User.profile.role === "admin") {
    headCells = [
      { id: "name", label: "Name" },
      { id: "email", label: "Email" },
      { id: "actions", label: "Actions", disableSorting: true },
      { id: "role", label: "Role" },
      { id: "accountEnabled", label: "Account Enabled" },
      { id: "profileCompleted", label: "Profile Completed" },
      { id: "profileEdited", label: "Profile Edited", disableSorting: true },
      { id: "updateAccess", label: "Access", disableSorting: true },
      { id: "progress", label: "Progress", disableSorting: true },
      { id: "enrollmentDate", label: "Enrollment Date" },
      { id: "lastLearned", label: "Last Learned" },
      { id: "resetProgress", label: "Reset Progress", disableSorting: true },
    ];
  } else if (_User.profile.role === "teacher") {
    headCells = [
      { id: "name", label: "Name" },
      { id: "email", label: "Email" },
      { id: "actions", label: "Actions", disableSorting: true },
      { id: "updateAccess", label: "Update Access", disableSorting: true },
      { id: "progress", label: "Progress", disableSorting: true },
      { id: "resetProgress", label: "Reset Progress", disableSorting: true },
    ];
  }

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    dispatch(allStudents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRecords(_User.allstudents);
    setOpenConfirmationModal(false);
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.allstudents]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        // eslint-disable-next-line eqeqeq
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const filterByRole = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        // eslint-disable-next-line eqeqeq
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.role.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const filterBy = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "fileter_by_account_enabled") {
          return items.filter((x) => x.accountEnabled);
        } else if (target.value === "filter_by_profile_completed") {
          return items.filter((x) => x.profileCompleted);
        } else {
          return items;
        }
      },
    });
  };

  const account_Enable = (data) => {
    dispatch(accountEnable(data));
  };
  const updateCourseAccess = (studentId, courseId, courseAccess) => {
    dispatch(update_CourseAccess({ studentId, courseId, courseAccess }));
  };

  const resetButtonClick = (userId, courseId) => {
    handleClickOpen();
    setSelectedStudentId(userId);
    setResetCourseId(courseId);
  };

  const cancelItem = () => {
    setOpenConfirmationModal(false);
  };

  const handleOpenConfirmationModal = () => {
    setOpenConfirmationModal(true);
  };

  const updateStudentCourseProgressFromDB = () => {
    dispatch(
      reset_CourseProgress({
        studentId: selectedStudentId,
        courseId: resetCourseId,
        lessonId: recentLesson,
        quizId: recentQuiz,
        chapterId: recentChapter,
        lessonsCompleted,
      })
    );
  };

  return (
    <div style={{ width: "auto" }}>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Controls.Input
                style={{ width: "90%", margin: "auto", marginBottom: "20px" }}
                label="Search By Name Or Email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {_User.profile.role === "admin" ? (
                <FormControl
                  variant="outlined"
                  style={{ width: "90%", margin: "auto", marginBottom: "20px" }}
                >
                  <Select
                    native
                    onChange={filterByRole}
                    inputProps={{
                      name: "status",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option value="">--- Filter By Role ---</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </Select>
                </FormControl>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              {_User.profile.role === "admin" ? (
                <FormControl
                  variant="outlined"
                  style={{ width: "90%", margin: "auto", marginBottom: "20px" }}
                >
                  <Select
                    native
                    onChange={filterBy}
                    inputProps={{
                      name: "status",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option value="">--- Filter By ---</option>
                    <option value="fileter_by_account_enabled">
                      Filter By Account Enabled
                    </option>
                    <option value="filter_by_profile_completed">
                      Filter By Profile Completed
                    </option>
                  </Select>
                </FormControl>
              ) : null}
            </Grid>
          </Grid>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <VisibilityOffIcon style={{ color: "#328cc1" }} />
                  &nbsp;
                  <Edit
                    style={{ color: "#328cc1", cursor: "pointer" }}
                    // onClick={() => handleCourseEdit(i)}
                  />
                  &nbsp;
                  <Delete
                    style={{ color: "#d72924", cursor: "pointer" }}
                    // onClick={() => deleteItem(i)}
                  />
                </TableCell>
                {_User.profile.role === "admin" && (
                  <TableCell>{item.role}</TableCell>
                )}
                {_User.profile.role === "admin" && (
                  <TableCell>
                    <CustomizedCheckbox
                      i={i}
                      checked={item.accountEnabled}
                      onChange={() => account_Enable(item)}
                    />
                  </TableCell>
                )}
                {_User.profile.role === "admin" && (
                  <TableCell>
                    <CustomizedCheckbox
                      i={i}
                      checked={item.profileCompleted}
                      // handle_MultipleChoice_CorrectAnswer={() => {}}
                    />
                  </TableCell>
                )}
                {_User.profile.role === "admin" && (
                  <TableCell>{item.profileEdited}</TableCell>
                )}
                <TableCell>
                  {item.coursesEnrolled.map((item1, i) => (
                    <>
                      <CustomizedCheckbox
                        i={i}
                        checked={item1.course.updateAccess}
                        onChange={() =>
                          updateCourseAccess(
                            item._id,
                            item1.course.course,
                            !item1.course.updateAccess
                          )
                        }
                      />
                      <br />
                      <br />
                    </>
                  ))}
                </TableCell>
                <TableCell>
                  {item.coursesEnrolled.map((item1, i) => (
                    <>
                      <ProgressBar
                        key={i}
                        progress={parseInt(item1.course.courseProgress)}
                      />{" "}
                      {item1.course.courseTitle}
                      <br />
                      <br />
                    </>
                  ))}
                </TableCell>
                {_User.profile.role === "admin" && (
                  <TableCell>{item.enrollmentDate}</TableCell>
                )}
                {_User.profile.role === "admin" && (
                  <TableCell>
                    {item.lastLearned
                      ? moment(item.lastLearned).format("MMMM") +
                        " " +
                        moment(item.lastLearned).format("DD") +
                        ", " +
                        moment(item.lastLearned).format("YYYY") +
                        "at " +
                        moment(item.lastLearned).format("hh:mm A")
                      : null}
                  </TableCell>
                )}
                <TableCell>
                  {item.coursesEnrolled.map((item1, i) => (
                    <>
                      <Button
                        variant="outlined"
                        style={{ color: "#d72924", borderColor: "#d72924" }}
                        onClick={() =>
                          resetButtonClick(item._id, item1.course.course)
                        }
                      >
                        Reset
                      </Button>
                      <br />
                      <br />
                    </>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <>
          {_User.allStudentsLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <CircularProgress />
            </div>
          ) : null}
        </>
        <TblPagination />
      </Paper>
      <CourseResetModle
        open={open}
        handleClose={handleClose}
        selectedStudentId={selectedStudentId}
        resetCourseId={resetCourseId}
        handleOpenConfirmationModal={handleOpenConfirmationModal}
        lessonsCompleted={lessonsCompleted}
        setLessonsCompleted={setLessonsCompleted}
        setRecentLesson={setRecentLesson}
        setRecentQuiz={setRecentQuiz}
        setRecentChapter={setRecentChapter}
      />
      <Modal
        setOpen={cancelItem}
        text={"Confirmation"}
        open={openConfirmationModal}
        performAction={updateStudentCourseProgressFromDB}
        description={
          "Are you sure you want to Reset this student's course progress?"
        }
      />
    </div>
  );
};
export default Students;
