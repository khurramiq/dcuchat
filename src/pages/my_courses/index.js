import React, { useEffect, useState } from "react";
import CoursesTable from "./components/courses_table";
import Modal from "../../components/alerts/modal";
import AddNewCourse from "./components/add_new_course";
import {
  getAllCourses,
  getCoursesByTeacher,
  copyCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} from "../../redux/actions/courseActions";
import { chapterConstants } from "../../redux/constants";
import { useDispatch, useSelector } from "react-redux";
const { ALL_CHAPTERS } = chapterConstants;

const MyCourses = () => {
  // let history = useHistory();
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(false);
  const [newCourseForm, setNewCourseForm] = useState(false);
  const [courseDeleteId, setCourseDeleteId] = useState(-1);
  const [copyCourseTitle, setCopyCourseTitle] = useState("");
  const [copyCourseDescription, setCopyCourseDescription] = useState("");

  const dispatch = useDispatch();
  const _course = useSelector((state) => state.course);
  const _User = useSelector((state) => state.User);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    chapters: [],
    featuredImage: null,
    status: "Draft",
    publishedOn: new Date(),
    enrollmentStartDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    visibility: "private",
    teachers: [],
  });
  const [courses, setCourses] = useState(_course.data);

  useEffect(() => {
    if (_User.profile.role==="admin") {      
      dispatch(getAllCourses());
    } else {
      dispatch(getCoursesByTeacher());      
    }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCourses(_course.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_course.data]);

  const handleCopyFormOpening = (index, change) => {
    var newArray = [...courses];
    newArray[index] = { ...newArray[index], courseCopyForm: change };
    setCourses(newArray);
  };

  const copyCoures = (index) => {
    var newArray = [...courses];
    newArray[index] = { ...newArray[index], courseCopyForm: false };
    let copy_course = {
      ...courses[index],
      title: copyCourseTitle,
      description: copyCourseDescription,
      courseCopyForm: false,
    };
    newArray.splice(index + 1, 0, copy_course);
    dispatch(copyCourse(copy_course));
    setCopyCourseTitle("");
    setCopyCourseDescription("");
    setCourses(newArray);
  };

  const cancelItem = () => {
    setOpen(false);
  };

  const deleteItem = (index) => {
    setCourseDeleteId(index);
    setOpen(true);
  };

  const deleteCourse1 = () => {
    dispatch(deleteCourse({ _id: courseDeleteId }));
    setOpen(false);
  };

  const saveCourse = () => {
    setCourses([...courses, course]);    
    let myform = new FormData();
    myform.append("title", course.title);
    myform.append("description", course.description);
    myform.append("featuredImage", course.featuredImage);
    myform.append("status", course.status);
    myform.append("publishedOn", course.publishedOn);
    myform.append("enrollmentStartDate", course.enrollmentStartDate);
    myform.append("startDate", course.startDate);
    myform.append("endDate", course.endDate);
    myform.append("visibility", course.visibility);
    course.teachers.forEach((item) => {
      myform.append(`teachers[]`, JSON.stringify(item));
    });
    myform.append("createdByName", _User.profile.name);
    myform.append("modifiedByName", _User.profile.name);
    dispatch(createCourse(myform));
    setNewCourseForm(false);
    resetCourseForm();
  };

  const resetCourseForm = () => {
    if (_User.profile.role === "admin") {
      setCourse({
        title: "",
        description: "",
        featuredImage: "",
        status: "Draft",
        publishedOn: new Date(),
        enrollmentStartDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        visibility: "private",
        teachers: [],
      });
    } else {
      setCourse({
        title: "",
        description: "",
        featuredImage: "",
        status: "Draft",
        publishedOn: new Date(),
        enrollmentStartDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        visibility: "private",
        teachers: [{ teacher: _User.profile._id, name: _User.profile.name }],
      });
    }
  }

  const handleAddNewCourse = () => {
    setNewCourseForm(true);
    localStorage.removeItem("courseId");
    dispatch({ type: ALL_CHAPTERS, payload: [] });
    resetCourseForm();
  };

  const handleCourseEdit = (row) => {
    setCourse(row);
    localStorage.setItem("courseId", row._id);
    setEditingCourse(true);
    setNewCourseForm(true);
  };

  const updateCourse1 = () => {
    setEditingCourse(false);
    let myform = new FormData();
    myform.append("_id", course._id);
    myform.append("title", course.title);
    myform.append("description", course.description);
    myform.append("featuredImage", course.featuredImage);
    myform.append("status", course.status);
    myform.append("publishedOn", course.publishedOn);
    myform.append("enrollmentStartDate", course.enrollmentStartDate);
    myform.append("startDate", course.startDate);
    myform.append("endDate", course.endDate);
    myform.append("visibility", course.visibility);
    course.teachers.forEach((item) => {
      myform.append(`teachers[]`, JSON.stringify(item));
    });    
    myform.append("modifiedByName", _User.profile.name);    
    dispatch(updateCourse(myform));
    resetCourseForm();
    setNewCourseForm(false);
  };

  return (
    <>
      {newCourseForm ? (
        <AddNewCourse
          course={course}
          setCourse={setCourse}
          setNewCourseForm={setNewCourseForm}
          saveCourse={saveCourse}
          editingCourse={editingCourse}
          updateCourse={updateCourse1}
        />
      ) : (
        <CoursesTable
          courses={courses}
          copyCourseTitle={copyCourseTitle}
          setCopyCourseTitle={setCopyCourseTitle}
          copyCourseDescription={copyCourseDescription}
          setCopyCourseDescription={setCopyCourseDescription}
          copyCoures={copyCoures}
          handleCopyFormOpening={handleCopyFormOpening}
          handleCourseEdit={handleCourseEdit}
          deleteItem={deleteItem}
          handleAddNewCourse={handleAddNewCourse}
        />
      )}
      <Modal
        setOpen={cancelItem}
        text={"Confirmation"}
        open={open}
        performAction={deleteCourse1}
        description={"Are you sure you want to delete this item?"}
      />
    </>
  );
};

export default MyCourses;
