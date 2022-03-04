import { userConstants, snackBarConstants } from "../constants";
import api from "../../utils/api";
import history from "../../utils/history";
const {
  ALL_USERS,
  CU_Req,
  CUErr,
  CUSuc,
  ULErr,
  URErr,
  UProfile,
  UList,
  UListDel,
  UListUpt,
  UData,
  USER_SECURITY_QUESTIONS_REQ,
  USER_SECURITY_QUESTIONS,
  USER_SECURITY_QUESTION_ERR,
  MATCH_SECURITY_ANSWERS_REQ,
  MATCH_SECURITY_ANSWERS,
  MATCH_SECURITY_ANSWERS_ERR,
  CAN_RESET_PASSWORD,
  PASSWORD_CHANGE_REQ,
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_ERR,
  ALL_STUDENTS_REQ,
  ALL_STUDENTS,
  ALL_STUDENTS_ERR,
  ALL_TEACHERS_REQ,
  ALL_TEACHERS,
  ALL_TEACHERS_ERR,
  ACCOUNT_ENABLE_REQ,
  ACCOUNT_ENABLE,
  ACCOUNT_ENABLE_ERR,
  UPDATE_COURSEACCESS_REQ,
  UPDATE_COURSEACCESS_ERR,
  UPDATE_COURSEACCESS,
  SEARCH_STUDENTS_REQ,
  SEARCH_STUDENTS_ERR,
  SEARCH_STUDENTS,
  ALL_ADMINS,
  ALL_ADMINS_REQ,
  ALL_ADMINS_ERR,
  CLEAR_NOTIFICATION_REQ,
  CLEAR_NOTIFICATION_ERR,
  COMPLETED_LESSONS_REQ,
  COMPLETED_LESSONS_ERR,
  COMPLETED_LESSONS,
} = userConstants;
const { ShowSnack, HideSnack } = snackBarConstants;

export const loginUser = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/signin", data);
    if (res.data.token && !res.data.error) {
      dispatch({ type: ShowSnack, payload: "Logged in successfully" });
      dispatch(setCurrentUser(res.data.token));
    } else {
      dispatch({ type: ULErr, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: ULErr, payload: e.message });
  }
};

export const loginWithGoogle = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/googlelogin", data);
    if (res.data.token && !res.data.error) {
      dispatch({ type: ShowSnack, payload: "Logged in successfully" });
      dispatch(setCurrentUser(res.data.token));
    } else {
      dispatch({ type: ULErr, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: ULErr, payload: e.message });
  }
};

export const loginWithFacebook = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/facebooklogin", data);
    if (res.data.token && !res.data.error) {
      dispatch({ type: ShowSnack, payload: "Logged in successfully" });
      dispatch(setCurrentUser(res.data.token));
    } else {
      dispatch({ type: ULErr, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: ULErr, payload: e.message });
  }
};

export const getUserSecurityQuestionsByEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_SECURITY_QUESTIONS_REQ });
    var res = await api.get(
      `/account/user_security_questions/user_email/${email}`
    );
    if (res.data.user_security_questions && !res.data.error) {
      dispatch({
        type: USER_SECURITY_QUESTIONS,
        payload: res.data.user_security_questions,
      });
    } else {
      dispatch({ type: USER_SECURITY_QUESTION_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: ULErr, payload: e.message });
  }
};

export const matchUserAnswersToResetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: MATCH_SECURITY_ANSWERS_REQ });
    var res = await api.post(
      `/account/match_user_answers_to_reset_password`,
      data
    );
    if (res.data.matched && !res.data.error) {
      dispatch({
        type: MATCH_SECURITY_ANSWERS,
        payload: res.data.matched,
      });
    } else {
      if (!res.data.canReset) {
        dispatch({ type: CAN_RESET_PASSWORD, payload: false });
      }
      dispatch({ type: MATCH_SECURITY_ANSWERS_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: MATCH_SECURITY_ANSWERS_ERR, payload: e.message });
  }
};

export const clearSnack = () => (dispatch) => {
  dispatch({ type: HideSnack });
};

export const registerUser = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/signup", data);
    if (res.data.token && !res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Account registration successfully",
      });
      dispatch(setCurrentUser(res.data.token));
    } else {
      dispatch({ type: URErr, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: URErr, payload: e.message });
  }
};

export const add_ToLikeList = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/add_ToLikeList", data);
    if (!res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Added to Like list",
      });
      dispatch({ type: UProfile, payload: res.data.user });
    } else {
      dispatch({ type: URErr, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: URErr, payload: e.message });
  }
};

const setCurrentUser = (token) => (dispatch) => {
  localStorage.setItem("token", token);
  dispatch(getCurrentUser());
};

export const getCurrentUser = () => (dispatch) => {
  if (!localStorage.getItem("token")) dispatch({ type: CUErr });
  else {
    dispatch({ type: CU_Req });
    dispatch(getProfile());
  }
};

export const fetchAllUsers = (searchText) => async (dispatch) => {
  try {
    var res = await api.get(`/account/fetchAllUsers`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (!res.data.error) {
      dispatch({ type: ALL_USERS, payload: res.data.allUsers });
    } else {
      dispatch({ type: SEARCH_STUDENTS_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: SEARCH_STUDENTS_ERR, payload: res.data.error });
  }
};
export const searchStudents = (searchText) => async (dispatch) => {
  dispatch({ type: SEARCH_STUDENTS_REQ });
  try {
    var res = await api.get(`/account/search_students/${searchText}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.students && !res.data.error) {
      dispatch({ type: SEARCH_STUDENTS, payload: res.data.students });
    } else {
      dispatch({ type: SEARCH_STUDENTS_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: SEARCH_STUDENTS_ERR, payload: res.data.error });
  }
};

export const allTeachers = () => async (dispatch) => {
  dispatch({ type: ALL_TEACHERS_REQ });
  try {
    var res = await api.get("/account/teachers", {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.teachers && !res.data.error) {
      dispatch({ type: ALL_TEACHERS, payload: res.data.teachers });
    } else {
      dispatch({ type: ALL_TEACHERS_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: ALL_TEACHERS_ERR, payload: res.data.error });
  }
};

export const getAllAdmins = () => async (dispatch) => {
  dispatch({ type: ALL_ADMINS_REQ });
  try {
    var res = await api.get("/account/admins", {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.admins && !res.data.error) {
      dispatch({ type: ALL_ADMINS, payload: res.data.admins });
    } else {
      dispatch({ type: ALL_ADMINS_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: ALL_ADMINS_ERR, payload: res.data.error });
  }
};

export const accountEnable = (data) => async (dispatch) => {
  dispatch({ type: ACCOUNT_ENABLE_REQ });
  try {
    var res = await api.post("/account/account_enable", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.accountEnabled && !res.data.error) {
      dispatch({ type: ACCOUNT_ENABLE, payload: data });
    } else {
      dispatch({ type: ACCOUNT_ENABLE_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: ACCOUNT_ENABLE_ERR, payload: res.data.error });
  }
};

export const update_CourseAccess = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_COURSEACCESS_REQ });
  try {
    var res = await api.post("/account/update_course_access", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.user && !res.data.error) {
      dispatch({ type: UPDATE_COURSEACCESS, payload: res.data.user });
    } else {
      dispatch({ type: UPDATE_COURSEACCESS_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: UPDATE_COURSEACCESS_ERR, payload: res.data.error });
  }
};

export const allStudents = () => async (dispatch) => {
  dispatch({ type: ALL_STUDENTS_REQ });
  try {
    var res = await api.get("/account/allStudents", {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.students && !res.data.error) {
      dispatch({ type: ALL_STUDENTS, payload: res.data.students });
    } else {
      dispatch({ type: ALL_STUDENTS_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: ALL_STUDENTS_ERR, payload: res.data.error });
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    var res = await api.get("/account/profile", {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.user && !res.data.error) {
      dispatch({ type: CUSuc });
      dispatch({ type: UProfile, payload: res.data.user });
    } else {
      localStorage.removeItem("token");
      dispatch(getCurrentUser());
    }
  } catch (e) {
    localStorage.removeItem("token");
    dispatch(getCurrentUser());
  }
};

export const updateRecentCourse = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/update_recent_course", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.user && !res.data.error) {
      dispatch({ type: CUSuc });
      dispatch({ type: UProfile, payload: res.data.user });
    } else {
      localStorage.removeItem("token");
      dispatch(getCurrentUser());
    }
  } catch (e) {
    localStorage.removeItem("token");
    dispatch(getCurrentUser());
  }
};

export const enrollToCourse = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/enroll_course", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.user && res.data.message && !res.data.error) {
      dispatch({ type: CUSuc });
      dispatch({ type: ShowSnack, payload: res.data.message });
      dispatch({ type: UProfile, payload: res.data.user });
    } else {
      localStorage.removeItem("token");
      dispatch(getCurrentUser());
    }
  } catch (e) {
    localStorage.removeItem("token");
    dispatch(getCurrentUser());
  }
};

export const updateExperience = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/update_experience", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.user && !res.data.error) {
      dispatch({ type: CUSuc });
      dispatch({ type: UProfile, payload: res.data.user });
    } else {
      localStorage.removeItem("token");
      dispatch(getCurrentUser());
    }
  } catch (e) {
    localStorage.removeItem("token");
    dispatch(getCurrentUser());
  }
};

export const updateAcceptTerms = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/update_AcceptTerms", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.user && !res.data.error) {
      dispatch({ type: CUSuc });
      dispatch({ type: UProfile, payload: res.data.user });
      dispatch(getCurrentUser());
    } else {
      localStorage.removeItem("token");
      dispatch(getCurrentUser());
    }
  } catch (e) {
    localStorage.removeItem("token");
    dispatch(getCurrentUser());
  }
};

export const updateSecurityQuestions = (data) => async (dispatch) => {
  try {
    var res = await api.post("/account/update_securityQuestions", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.user && !res.data.error) {
      dispatch({ type: CUSuc });
      dispatch({ type: UProfile, payload: res.data.user });
    } else {
      localStorage.removeItem("token");
      dispatch(getCurrentUser());
    }
  } catch (e) {
    localStorage.removeItem("token");
    dispatch(getCurrentUser());
  }
};

export const clearNotification = (data) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_NOTIFICATION_REQ });
    var res = await api.post("/account/clear_notification", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.user && !res.data.error) {
      dispatch({ type: UProfile, payload: res.data.user });
    } else {
      dispatch({ type: CLEAR_NOTIFICATION_ERR, payload: res.data.error });
    }
  } catch (e) {
    console.log("Error", e);
    // dispatch({ type: CLEAR_NOTIFICATION_ERR, payload: res.data.error });
  }
};

export const getCompletedLessons = (data) => async (dispatch) => {
  try {
    dispatch({ type: COMPLETED_LESSONS_REQ });
    var res = await api.post("/account/lessons-completed", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.lessonsCompleted && !res.data.error) {
      dispatch({ type: COMPLETED_LESSONS, payload: res.data.lessonsCompleted });
    } else {
      dispatch({ type: COMPLETED_LESSONS_ERR, payload: res.data.error });
    }
  } catch (e) {
    console.log("Error", e);
    dispatch({ type: COMPLETED_LESSONS_ERR, payload: res.data.error });
  }
};

export const changePassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_CHANGE_REQ });
    var res = await api.post("/account/change_password", data);
    if (res.data.passwordChanged && !res.data.error) {
      dispatch({ type: PASSWORD_CHANGE, payload: res.data.passwordChanged });
    } else {
      dispatch({ type: PASSWORD_CHANGE_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: PASSWORD_CHANGE_ERR, payload: res.data.error });
  }
};

export const getDetails = (_id) => async (dispatch) => {
  var res = await api.get(`/account/details/${_id}`, {
    headers: { authorization: `${localStorage.getItem("token")}` },
  });
  if (res.data.user && !res.data.error) {
    dispatch({ type: UData, payload: res.data.user });
  }
};

export const updateDetails = (data) => async (dispatch) => {
  var res = await api.post(`/account/update/profile`, data, {
    headers: { authorization: `${localStorage.getItem("token")}` },
  });
  if (!res.data.error)
    dispatch({
      type: ShowSnack,
      payload: "Account details updated successfully",
    });
  history.push("/user/manager");
};

export const getAll = () => async (dispatch) => {
  var res = await api.get("/account/all", {
    headers: { authorization: `${localStorage.getItem("token")}` },
  });
  if (res.data.users && !res.data.error) {
    dispatch({ type: CUSuc });
    dispatch({ type: UList, payload: res.data.users });
  }
};

export const deleteUser = (_id) => async (dispatch) => {
  var res = await api.delete(`/account/user/${_id}`, {
    headers: { authorization: `${localStorage.getItem("token")}` },
  });
  if (res.data.success && !res.data.error) {
    dispatch({ type: ShowSnack, payload: "Account deleted successfully" });
    dispatch({ type: UListDel, payload: _id });
  }
};

export const updateActiveUser = (data) => async (dispatch) => {
  var res = await api.post(`/account/update/active`, data, {
    headers: { authorization: `${localStorage.getItem("token")}` },
  });
  if (res.data.user && !res.data.error) {
    dispatch({
      type: ShowSnack,
      payload: data.active
        ? "Account activated successfully"
        : "Account deactivated successfully",
    });
    dispatch({ type: UListUpt, payload: res.data.user });
  }
};

export const updateApprovedUser = (data) => async (dispatch) => {
  var res = await api.post(`/account/update/approve`, data, {
    headers: { authorization: `${localStorage.getItem("token")}` },
  });
  if (res.data.user && !res.data.error) {
    dispatch({ type: ShowSnack, payload: "Account approved successfully" });
    dispatch({ type: UListUpt, payload: res.data.user });
  }
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(getCurrentUser());
};
