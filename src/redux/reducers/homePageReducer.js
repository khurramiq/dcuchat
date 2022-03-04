import { homePageConstants } from "../constants";
const {
  // get
  HOME_PAGE,
  HOME_PAGE_REQ,
  HOME_PAGE_ERR,
  // edit
  HOME_PAGE_EDIT,
  HOME_PAGE_EDIT_REQ,
  HOME_PAGE_EDIT_ERR,
  // upload logo
  HOME_PAGE_UPLOAD_LOGO,
  HOME_PAGE_UPLOAD_LOGO_REQ,
  HOME_PAGE_UPLOAD_LOGO_ERR,
} = homePageConstants;
const initialState = {
  // get
  homePageLoading: false,
  homePageErr: false,
  homePageErrText: "",
  homePage: {},
  // edit
  homePageEditLoading: false,
  homePageEditErr: false,
  homePageEditErrText: "",
  // upload logo
  uploadLogoLoading: false,
  uploadLogoErr: false,
  uploadLogoErrText: "",
};

export const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    // get
    case HOME_PAGE_REQ:
      return {
        ...state,
        homePageLoading: true,
      };
    case HOME_PAGE_ERR:
      return {
        ...state,
        homePageLoading: false,
        homePageErr: true,
        homePageErrText: action.payload,
      };
    case HOME_PAGE:
      return {
        ...state,
        homePageLoading: false,
        homePageErr: false,
        homePageErrText: "",
        homePage: action.payload,
      };
    // Edit
    case HOME_PAGE_EDIT_REQ:
      return {
        ...state,
        homePageEditLoading: true,
      };
    case HOME_PAGE_EDIT_ERR:
      return {
        ...state,
        homePageEditLoading: false,
        homePageEditErr: true,
        homePageEditErrText: action.payload,
      };
    case HOME_PAGE_EDIT:
      return {
        ...state,
        homePageEditLoading: false,
        homePageEditErr: false,
        homePageEditErrText: "",
        homePage: action.payload,
      };
    // upload logo
    case HOME_PAGE_UPLOAD_LOGO_REQ:
      return {
        ...state,
        uploadLogoLoading: true,
      };
    case HOME_PAGE_UPLOAD_LOGO_ERR:
      return {
        ...state,
        uploadLogoLoading: false,
        uploadLogoErr: true,
        uploadLogoErrText: action.payload,
      };
    case HOME_PAGE_UPLOAD_LOGO:
      return {
        ...state,
        uploadLogoLoading: false,
        uploadLogoErr: false,
        uploadLogoErrText: "",
        homePage: action.payload,
      };
    default:
      return state;
  }
};
