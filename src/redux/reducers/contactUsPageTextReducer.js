import { contactUsPageTextConstants } from "../constants";
const {
  // get
  CONTACT_US_PAGE_TEXT,
  CONTACT_US_PAGE_TEXT_REQ,
  CONTACT_US_PAGE_TEXT_ERR,
  // edit
  CONTACT_US_PAGE_TEXT_EDIT,
  CONTACT_US_PAGE_TEXT_EDIT_REQ,
  CONTACT_US_PAGE_TEXT_EDIT_ERR,
} = contactUsPageTextConstants;
const initialState = {
  // get
  contactUsPageTextLoading: false,
  contactUsPageTextErr: false,
  contactUsPageTextErrText: "",
  contactUsPageText: {},
  // edit
  contactUsPageTextEditLoading: false,
  contactUsPageTextEditErr: false,
  contactUsPageTextEditErrText: "",
};

export const contactUsPageTextReducer = (state = initialState, action) => {
  switch (action.type) {
    // get
    case CONTACT_US_PAGE_TEXT_REQ:
      return {
        ...state,
        contactUsPageTextLoading: true,
      };
    case CONTACT_US_PAGE_TEXT_ERR:
      return {
        ...state,
        contactUsPageTextLoading: false,
        contactUsPageTextErr: true,
        contactUsPageTextErrText: action.payload,
      };
    case CONTACT_US_PAGE_TEXT:
      return {
        ...state,
        contactUsPageTextLoading: false,
        contactUsPageTextErr: false,
        contactUsPageTextErrText: "",
        contactUsPageText: action.payload,
      };
    // Edit
    case CONTACT_US_PAGE_TEXT_EDIT_REQ:
      return {
        ...state,
        contactUsPageTextEditLoading: true,
      };
    case CONTACT_US_PAGE_TEXT_EDIT_ERR:
      return {
        ...state,
        contactUsPageTextEditLoading: false,
        contactUsPageTextEditErr: true,
        contactUsPageTextEditErrText: action.payload,
      };
    case CONTACT_US_PAGE_TEXT_EDIT:
      return {
        ...state,
        contactUsPageTextEditLoading: false,
        contactUsPageTextEditErr: false,
        contactUsPageTextEditErrText: "",
        contactUsPageText: action.payload,
      };

    // case ADDel:
    //   return {
    //     ...state,
    //     loading: false,
    //     data: state.data.filter((item) => item._id !== action.payload._id),
    //   };
    // case ADUpt:
    //   return {
    //     ...state,
    //     data: state.data.map((ad) => {
    //       if (ad._id === action.payload._id) ad = action.payload;
    //       return ad;
    //     }),
    //     isError: false,
    //     loading: false,
    //   };
    default:
      return state;
  }
};
