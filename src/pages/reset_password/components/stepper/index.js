import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StepContent from "./step_content";
import {
  getUserSecurityQuestionsByEmail,
  matchUserAnswersToResetPassword,
  changePassword,
} from "../../../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userConstants } from "../../../../redux/constants";
const { PASSWORD_CHANGE } = userConstants;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Enter your email", "Security Questions", "Reset your password"];
}

const ResetPasswordSteps = () => {
  let history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordClientSideError, setPasswordClientSideError] = useState("");
  const [userSecurityAnswers, setUserSecurityAnswers] = useState([
    {
      answer: "",
    },
    {
      answer: "",
    },
    {
      answer: "",
    },
  ]);
  const [clientSideEmailErr, setClientSideEmailErr] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  useEffect(() => {
    if (_User.userSecurityQuestions.length > 0) {
      setActiveStep(1);
    }
  }, [_User.userSecurityQuestions]);

  useEffect(() => {
    if (_User.matchSecurityAnswers) {
      setActiveStep(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.matchSecurityAnswers]);

  useEffect(() => {
    if (_User.passwordchange) {
      dispatch({ type: PASSWORD_CHANGE, payload: false });
      setActiveStep(0);
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.passwordchange]);

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const validateEmail = (email) => {
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (validateEmail(email)) {
        setClientSideEmailErr("");
        dispatch(getUserSecurityQuestionsByEmail(email));
      } else {
        setClientSideEmailErr("* Invalid email");
      }
    } else if (activeStep === 1) {
      dispatch(
        matchUserAnswersToResetPassword({ email, answers: userSecurityAnswers })
      );
    } else if (activeStep === 2) {
      if (password !== confirmPassword) {
        setPasswordClientSideError(
          "* Password did not match, please try again"
        );
      } else {
        setPasswordClientSideError("");
        dispatch(
          changePassword({
            email,
            password,
          })
        );
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              <StepContent                
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                passwordClientSideError={passwordClientSideError}
                clientSideEmailErr={clientSideEmailErr}
                step={activeStep}
                userSecurityAnswers={userSecurityAnswers}
                setUserSecurityAnswers={setUserSecurityAnswers}
              />
            </Typography>
            <div style={{ marginBottom: "20px" }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResetPasswordSteps;
