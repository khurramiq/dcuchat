import React, { useState } from "react";
import { Button, Checkbox, Grid, Paper, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";

const Login = () => {
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const [user, setUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loginClientSideErr, setLoginClientSideErr] = useState({
    email: "",
    password: "",
  });

  const handleField = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleRememberMeCheckBoxClick = (v) => {
    setUser({ ...user, rememberMe: v });
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const loginManually = (e) => {
    e.preventDefault();
    if (user.email.length === 0) {
      setLoginClientSideErr({
        email: "* Please, enter email address.",
        password: "",
      });
    } else if (!validateEmail(user.email)) {
      setLoginClientSideErr({
        email: "* Please, enter a valid email address.",
        password: "",
      });
    } else if (user.password.length === 0) {
      setLoginClientSideErr({
        email: "",
        password: "* Please enter your Password",
      });
    } else {
      dispatch(loginUser(user));
    }
  };
  return (
    <div className="login-page-wrapper">
      <div className="login-page-heading-wrapper">
        <h1>Quick Login</h1>
        <p>
          Don't have an account? <Link to="/register">Sign Up!</Link>
        </p>
      </div>
      <Paper variant="outlined" className="login-page-content-wrapper">
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "60px",
            marginTop: "40px",
          }}
        >
          <Grid item xs={12} sm={5}>
            <form className="form" onSubmit={(e) => loginManually(e)}>
              <div className="heading-wrapper">
                <h2>Sign in manually</h2>
              </div>
              <div className="inputs-fields-container">
                <TextField
                  className="inputfields"
                  name="email"
                  type="email"
                  onChange={handleField}
                  fullWidth
                  label="Phone or email"
                  variant="outlined"
                  required
                />
                <p style={{ color: "red" }}>{loginClientSideErr.email}</p>
                <TextField
                  className="inputfields"
                  fullWidth
                  name="password"
                  onChange={handleField}
                  type="password"
                  label="Password"
                  variant="outlined"
                  required
                />
                <p style={{ color: "red" }}>{loginClientSideErr.password}</p>
                <p style={{ color: "red" }}>
                  {_User.isLoginError ? _User.errorText : null}
                </p>
                <Grid container xs={12} style={{ marginTop: "20px" }}>
                  <Grid item xs={6} sm={6}>
                    <Checkbox
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      checked={user.rememberMe}
                      onChange={() =>
                        handleRememberMeCheckBoxClick(!user.rememberMe)
                      }
                    />
                    &nbsp;
                    <span style={{ color: "#768186" }}>Remember me</span>
                  </Grid>
                  <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                    <Button type="submit" variant="contained" color="secondary">
                      LOGIN
                    </Button>
                  </Grid>
                </Grid>
                <Grid container xs={12} style={{ marginTop: "20px" }}>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    className="register-now-link-wrapper"
                  >
                    <Link to="/register">Register now</Link>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    className="forgot-password-link-wrapper"
                  >
                    <Link to="/login">Forgot password?</Link>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
