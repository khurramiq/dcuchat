import { aboutUsConstants } from "../constants";
const {
  // get
  ABOUT_US,
  ABOUT_US_REQ,
  ABOUT_US_ERR,
  // edit
  ABOUT_US_EDIT,
  ABOUT_US_EDIT_REQ,
  ABOUT_US_EDIT_ERR,
} = aboutUsConstants;
const initialState = { 
  // get
  aboutUsLoading: false,
  aboutUsErr: false,
  aboutUsErrText: "",
  aboutUs: {},
  // edit
  aboutUsEditLoading: false,
  aboutUsEditErr: false,
  aboutUsEditErrText: "",
};

export const aboutUsReducer = (state = initialState, action) => {
  switch (action.type) {
    // get
    case ABOUT_US_REQ:
      return {
        ...state,
        aboutUsLoading: true,
      };
    case ABOUT_US_ERR:
      return {
        ...state,
        aboutUsLoading: false,
        aboutUsErr: true,
        aboutUsErrText: action.payload,
      };
    case ABOUT_US:
      return {
        ...state,
        aboutUsLoading: false,
        aboutUsErr: false,
        aboutUsErrText: "",
        aboutUs: action.payload,
      };
    // Edit
    case ABOUT_US_EDIT_REQ:
      return {
        ...state,
        aboutUsEditLoading: true,
      };
    case ABOUT_US_EDIT_ERR:
      return {
        ...state,
        aboutUsEditLoading: false,
        aboutUsEditErr: true,
        aboutUsEditErrText: action.payload,
      };
    case ABOUT_US_EDIT:
      return {
        ...state,
        aboutUsEditLoading: false,
        aboutUsEditErr: false,
        aboutUsEditErrText: "",
        aboutUs: action.payload,
      };
    default:
      return state;
  }
};
