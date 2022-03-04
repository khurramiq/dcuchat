/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Detail from "./detail";
import Content from "./content";
import General from "./general";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    color: "#1976D2",
  },
  indicator: {
    backgroundColor: "#1976D2",
  },
});

const AddNewCourse = ({
  course,    
  setCourse,
  setNewCourseForm,
  saveCourse,
  editingCourse,
  updateCourse,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(2);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={tab}
          onChange={handleChange}
          classes={{
            indicator: classes.indicator,
          }}
          textColor="#1976D2"
          left
          fullWidth
        >
          <Tab label="Content" />
          <Tab label="General" />
          <Tab label="Course Detail" />
        </Tabs>
      </Paper>
      {tab === 0 ? <Content course={course} /> : null}
      {tab === 1 ? <General
        course={course}
        setCourse={setCourse}
      /> : null}
      {tab === 2 ? (
        <Detail          
          updateCourse={updateCourse}
          editingCourse={editingCourse}
          saveCourse={saveCourse}
          setTab={setTab}
          course={course}
          setCourse={setCourse}
          setNewCourseForm={setNewCourseForm}
        />
      ) : null}
    </div>
  );
};

export default AddNewCourse;
