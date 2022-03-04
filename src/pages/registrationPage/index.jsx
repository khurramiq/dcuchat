import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

import "./style.css";

const Register = () => {
  const dispatch = useDispatch();
  // const _User = useSelector((state) => state.User);
  const imageInputRef = React.useRef();
  const [img, setImg] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interestedInAge: "",
    interestedInGender: "",
    desc: "",
    profilePic: null,
  });

  const [registrationClientSideErr, setRegistrationClientSideErr] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interestedInAge: "",
    interestedInGender: "",
    desc: "",
    profilePic: "",
  });

  const handleField = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const registerManually = () => {
    if (user.firstName.length === 0) {
      setRegistrationClientSideErr({
        firstName: "* Enter First Name",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interestedInAge: "",
        interestedInGender: "",
        desc: "",
        profilePic: "",
      });
    } else if (user.lastName.length === 0) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "* Enter Last Name",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interestedInAge: "",
        interestedInGender: "",
        desc: "",
        profilePic: "",
      });
    } else if (!validateEmail(user.email)) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "* Invalid Email",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interestedInAge: "",
        interestedInGender: "",
        desc: "",
        profilePic: "",
      });
    } else if (user.password.length === 0) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "",
        password: "* Enter Password",
        confirmPassword: "",
        age: "",
        gender: "",
        interestedInAge: "",
        interestedInGender: "",
        desc: "",
        profilePic: "",
      });
    } else if (user.password.length < 6) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "",
        password: "* Password must be at least 6 characters",
        confirmPassword: "",
        age: "",
        gender: "",
        interestedInAge: "",
        interestedInGender: "",
        desc: "",
        profilePic: "",
      });
    } else if (user.password !== user.confirmPassword) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "* Password and confirm password doesn't match.",
        age: "",
        gender: "",
        interestedInAge: "",
        interestedInGender: "",
        desc: "",
        profilePic: "",
      });
    } else if (user.age.length === 0) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "* Enter You Age",
        gender: "",
        interestedInAge: "",
        interestedInGender: "",
        desc: "",
        profilePic: "",
      });
    } else if (user.gender.length === 0) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "* Select Gender",
        interestedInAge: "",
        interestedInGender: "",
        desc: "",
        profilePic: "",
      });
    } else if (user.interestedInAge.length === 0) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interestedInAge: "* Enter Interested In Age",
        interestedInGender: "",
        desc: "",
        profilePic: "",
      });
    } else if (user.interestedInGender.length === 0) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interestedInAge: "",
        interestedInGender: "* Select Interested In Gender",
        desc: "",
        profilePic: "",
      });
    } else if (user.desc.length === 0) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interestedInAge: "",
        interestedInGender: "",
        desc: "* Write some info about yourself",
        profilePic: "",
      });
    } else if (!user.profilePic) {
      setRegistrationClientSideErr({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interestedInAge: "",
        interestedInGender: "",
        desc: "",
        profilePic: "* Upload you profile Pic",
      });
    } else {
      console.log("User", user);
      let myform = new FormData();
      myform.append("firstName", user.firstName);
      myform.append("lastName", user.lastName);
      myform.append("email", user.email);
      myform.append("password", user.password);
      myform.append("age", user.age);
      myform.append("gender", user.gender);
      myform.append("interestedInAge", user.interestedInAge);
      myform.append("interestedInGender", user.interestedInGender);
      myform.append("desc", user.desc);
      myform.append("profilePic", user.profilePic);
      dispatch(registerUser(myform));
    }
  };
  const handleUploadClick = (e) => {
    var file = e.target.files[0];
    setImg(URL.createObjectURL(file));
    setUser({ ...user, profilePic: file });
  };
  return (
    <div className="register-page-wrapper">
      <div className="register-page-heading-wrapper">
        <h1>Quick Login</h1>
        <p>
          Already have an account? <Link to="/login">Sign In!</Link>
        </p>
      </div>
      <Paper variant="outlined" className="register-page-content-wrapper">
        <Grid container>
          <Grid item xs={12} sm={4} style={{ marginLeft: "20px" }}>
            <TextField
              className="inputfields"
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleField}
              fullWidth
              label="First Name"
              variant="outlined"
              required
            />
            <p style={{ color: "red" }}>
              {registrationClientSideErr.firstName}
            </p>
            <TextField
              className="inputfields"
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleField}
              fullWidth
              label="Last Name"
              variant="outlined"
              required
            />
            <p style={{ color: "red" }}>{registrationClientSideErr.lastName}</p>
            <TextField
              className="inputfields"
              fullWidth
              name="email"
              type="email"
              value={user.email}
              onChange={handleField}
              label="Email"
              variant="outlined"
              required
            />
            <p style={{ color: "red" }}>{registrationClientSideErr.email}</p>
            <TextField
              className="inputfields"
              fullWidth
              name="password"
              type="password"
              value={user.password}
              onChange={handleField}
              label="Password"
              variant="outlined"
              required
            />
            <p style={{ color: "red" }}>{registrationClientSideErr.password}</p>
            <TextField
              className="inputfields"
              fullWidth
              name="confirmPassword"
              value={user.confirmPassword}
              type="password"
              onChange={handleField}
              label="Confirm Password"
              variant="outlined"
              required
            />
            <p style={{ color: "red" }}>
              {registrationClientSideErr.confirmPassword}
            </p>
          </Grid>
          <Grid item xs={12} sm={4} style={{ marginLeft: "20px" }}>
            <TextField
              className="inputfields"
              type="number"
              name="age"
              value={user.age}
              onChange={handleField}
              fullWidth
              label="Your Age"
              variant="outlined"
              required
            />
            <p style={{ color: "red" }}>{registrationClientSideErr.age}</p>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">
                Gender
              </InputLabel>
              <Select
                native
                value={user.gender}
                onChange={handleField}
                label="Gender"
                inputProps={{
                  name: "gender",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
            <p style={{ color: "red" }}>{registrationClientSideErr.gender}</p>
            <TextField
              className="inputfields"
              type="number"
              name="interestedInAge"
              value={user.interestedInAge}
              onChange={handleField}
              fullWidth
              label="Interested In Age"
              variant="outlined"
              required
            />
            <p style={{ color: "red" }}>
              {registrationClientSideErr.interestedInAge}
            </p>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">
                Interested In Gender
              </InputLabel>
              <Select
                native
                value={user.interestedInGender}
                onChange={handleField}
                label="Interested In Gender"
                inputProps={{
                  name: "interestedInGender",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
            <p style={{ color: "red" }}>
              {registrationClientSideErr.interestedInGender}
            </p>
            <TextareaAutosize
              aria-label="minimum height"
              name="desc"
              value={user.desc}
              onChange={handleField}
              minRows={10}
              placeholder="Tell something about yourself"
              style={{ minHeight: "55px", width: "100%" }}
            />
            <p style={{ color: "red" }}>{registrationClientSideErr.desc}</p>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {img ? (
                  <img
                    style={
                      img
                        ? {
                            width: "100px",
                            height: "100px",
                            marginTop: "20px",
                            marginBottom: "20px",
                            borderRadius: "50px",
                          }
                        : null
                    }
                    src={img}
                    alt="featured"
                  />
                ) : null}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  component="label"
                  style={{
                    borderColor: "#ff8c00",
                    color: "#ff8c00",
                    backgroundColor: "#fff",
                  }}
                >
                  Upload Profile Pic ...
                  <input
                    accept="image/*"
                    name="img"
                    type="file"
                    onChange={handleUploadClick}
                    ref={imageInputRef}
                    hidden
                  />
                </Button>
              </div>
              <p style={{ color: "red" }}>
                {registrationClientSideErr.profilePic}
              </p>
            </div>
          </Grid>
          <Grid container xs={12} style={{ marginTop: "20px" }}>
            <Grid item xs={6} sm={6}></Grid>
            <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#3E9DB2", color: "#fff" }}
                onClick={() => registerManually()}
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid container xs={12} style={{ marginTop: "20px" }}>
            <Grid
              item
              xs={12}
              sm={12}
              className="already-registered-link-wrapper"
            >
              Already Registered?&nbsp;&nbsp;&nbsp;
              <Link to="/login">Go and Log in</Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Register;
