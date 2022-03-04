import {
  userConstants,
  snackBarConstants,
  navBarConstants,
} from "../constants";
const {
  ALL_USERS,
  CU_Req,
  CUErr,
  CUSuc,
  URErr,
  ULErr,
  UProfile,
  UList,
  UListUpt,
  UListDel,
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
  SELECTED_NOTIFICATION,
  COMPLETED_LESSONS_REQ,
  COMPLETED_LESSONS_ERR,
  COMPLETED_LESSONS,
} = userConstants;

const { SETCount } = navBarConstants;
const { ShowSnack, HideSnack } = snackBarConstants;
const initialState = {
  allUsers: [],
  Auth: false,
  isError: false,
  isProfile: false,
  isLoading: false,
  userSecurityQuestionsLoading: false,
  matchSecurityAnswersLoading: false,
  userSecurityQuestions: [],
  userSecurityQuestionErr: "",
  matchSecurityAnswersErr: "",
  matchSecurityAnswers: false,
  canReset: true,
  passwordChangeLoading: false,
  passwordchange: false,
  passwordChangeErr: "",
  allStudentsLoading: false,
  allstudents: [],
  allStudentsErr: "",
  allTeachersLoading: false,
  allTeachers: [],
  allTeachersErr: "",
  accountEnableLoading: false,
  accountEnableErr: "",
  updateCourseAccessLoading: false,
  updateCourseAccessErr: "",
  searchStudentsLoading: false,
  searchStudents: [],
  searchStudentsErr: false,
  searchStudentsErrText: "",
  // ALL ADMINS
  allAdminsLoading: false,
  allAdmins: [],
  allAdminsErr: false,
  allAdminsErrText: "",
  selectedNotification: {},
  // COMPLETED LESSONS
  completedLessonsLoading: false,
  completedLessonsErr: false,
  completedLessonsErrText: "",
  completedLessons: [],
  // RESET COURSE PROGRESS
  resetCourseProgressLoading: false,
  resetCourseProgressErr: false,
  resetCourseProgressErrText: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case CU_Req:
      return {
        ...state,
        isLoading: true,
      };
    case SELECTED_NOTIFICATION:
      return {
        ...state,
        selectedNotification: action.payload,
      };
    case ALL_TEACHERS_REQ:
      return {
        ...state,
        allTeachersLoading: true,
      };
    case ACCOUNT_ENABLE_REQ:
      return {
        ...state,
        accountEnableLoading: true,
      };
    case UPDATE_COURSEACCESS_REQ:
      return {
        ...state,
        updateCourseAccessLoading: true,
      };
    // Search Students
    case SEARCH_STUDENTS_REQ:
      return {
        ...state,
        searchStudentsLoading: true,
      };
    case SEARCH_STUDENTS_ERR:
      return {
        ...state,
        searchStudentsLoading: false,
        searchStudentsErr: true,
        searchStudentsErrText: action.payload,
      };
    case SEARCH_STUDENTS:
      return {
        ...state,
        searchStudentsLoading: false,
        searchStudentsErr: false,
        searchStudentsErrText: "",
        searchStudents: action.payload,
      };
    // COMPLETED LESSONS
    case COMPLETED_LESSONS_REQ:
      return {
        ...state,
        completedLessonsLoading: true,
      };
    case COMPLETED_LESSONS_ERR:
      return {
        ...state,
        completedLessonsLoading: false,
        completedLessonsErr: true,
        completedLessonsErrText: action.payload,
      };
    case COMPLETED_LESSONS:
      return {
        ...state,
        completedLessonsLoading: false,
        completedLessonsErr: false,
        completedLessonsErrText: "",
        completedLessons: action.payload,
      };
    // All Admins
    case ALL_ADMINS_REQ:
      return {
        ...state,
        allAdminsLoading: true,
      };
    case ALL_ADMINS_ERR:
      return {
        ...state,
        allAdminsLoading: false,
        allAdminsErr: true,
        allAdminsErrText: action.payload,
      };
    case ALL_ADMINS:
      return {
        ...state,
        allAdminsLoading: false,
        allAdminsErr: false,
        allAdminsErrText: "",
        allAdmins: action.payload,
      };
    case UPDATE_COURSEACCESS_ERR:
      return {
        ...state,
        updateCourseAccessLoading: false,
        updateCourseAccessErr: action.payload,
      };
    case ALL_STUDENTS_ERR:
      return {
        ...state,
        allTeachersLoading: false,
        allTeachersErr: action.payload,
      };
    case ACCOUNT_ENABLE_ERR:
      return {
        ...state,
        accountEnableLoading: false,
        accountEnableErr: action.payload,
      };
    case ALL_TEACHERS:
      return {
        ...state,
        allTeachersLoading: false,
        allTeachersErr: "",
        allTeachers: action.payload,
      };

    case ALL_STUDENTS_REQ:
      return {
        ...state,
        allStudentsLoading: true,
      };
    case ALL_TEACHERS_ERR:
      return {
        ...state,
        accountEnableLoading: false,
        allStudentsErr: action.payload,
      };
    case ALL_STUDENTS:
      return {
        ...state,
        allStudentsLoading: false,
        allStudentsErr: "",
        allstudents: action.payload,
      };
    case ACCOUNT_ENABLE:
      return {
        ...state,
        accountEnableLoading: false,
        accountEnableErr: "",
        allstudents: state.allstudents.map((item) => {
          if (item._id === action.payload._id) {
            item = { ...item, accountEnabled: !item.accountEnabled };
          }
          return item;
        }),
      };
    case UPDATE_COURSEACCESS:
      return {
        ...state,
        updateCourseAccessLoading: false,
        updateCourseAccessErr: "",
        allstudents: state.allstudents.map((item) => {
          if (item._id === action.payload._id) {
            item = action.payload;
          }
          return item;
        }),
      };
    case USER_SECURITY_QUESTIONS_REQ:
      return {
        ...state,
        userSecurityQuestionsLoading: true,
      };
    case MATCH_SECURITY_ANSWERS_REQ:
      return {
        ...state,
        matchSecurityAnswersLoading: true,
      };
    case PASSWORD_CHANGE_REQ:
      return {
        ...state,
        passwordChangeLoading: true,
      };
    case CAN_RESET_PASSWORD:
      return {
        ...state,
        canReset: action.payload,
      };
    case CUErr:
      return {
        ...state,
        Auth: false,
        isLoading: false,
        isProfile: false,
      };
    case CUSuc:
      return {
        ...state,
        Auth: true,
        isLoginError: false,
        isRegError: false,
      };
    case ULErr:
      return {
        ...state,
        isLoginError: true,
        errorText: action.payload,
      };
    case USER_SECURITY_QUESTIONS:
      return {
        ...state,
        userSecurityQuestionErr: "",
        userSecurityQuestionsLoading: false,
        userSecurityQuestions: action.payload,
      };
    case MATCH_SECURITY_ANSWERS:
      return {
        ...state,
        userSecurityQuestionErr: "",
        matchSecurityAnswersLoading: false,
        matchSecurityAnswers: action.payload,
      };
    case PASSWORD_CHANGE:
      return {
        ...state,
        passwordChangeErr: "",
        passwordChangeLoading: false,
        passwordchange: action.payload,
      };
    case USER_SECURITY_QUESTION_ERR:
      return {
        ...state,
        userSecurityQuestionsLoading: false,
        userSecurityQuestionErr: action.payload,
      };
    case MATCH_SECURITY_ANSWERS_ERR:
      return {
        ...state,
        matchSecurityAnswersLoading: false,
        matchSecurityAnswersErr: action.payload,
      };
    case PASSWORD_CHANGE_ERR:
      return {
        ...state,
        passwordChangeLoading: false,
        passwordChangeErr: action.payload,
      };
    case URErr:
      return {
        ...state,
        isRegError: true,
        errorText: action.payload,
      };
    case UProfile:
      return {
        ...state,
        isProfile: true,
        profile: action.payload,
        isLoading: false,
      };
    case UList:
      return {
        ...state,
        list: action.payload,
      };
    case UListDel:
      return {
        ...state,
        list:
          state.list && state.list.length > 0
            ? state.list.filter((item) => item._id !== action.payload)
            : [],
      };
    case UData:
      return {
        ...state,
        details: action.payload,
      };
    case UListUpt:
      return {
        ...state,
        list:
          state.list && state.list.length > 0
            ? state.list.map((item) => {
                if (item._id === action.payload._id) item = action.payload;
                return item;
              })
            : [],
      };
    default:
      return state;
  }
};

export const snackbarReducer = (state = { isShow: false }, action) => {
  switch (action.type) {
    case ShowSnack:
      return {
        ...state,
        isShow: true,
        successText: action.payload,
      };
    case HideSnack:
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
};

export const navbarReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case SETCount:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};
