import api from "../../utils/api";
import { contactUsPageTextConstants, snackBarConstants } from "../constants";
const {
  // get
  CONTACT_US_PAGE_TEXT,
  CONTACT_US_PAGE_TEXT_REQ,
  CONTACT_US_PAGE_TEXT_ERR,
  // edit
  CONTACT_US_PAGE_TEXT_EDIT_REQ,
  CONTACT_US_PAGE_TEXT_EDIT_ERR,
  CONTACT_US_PAGE_TEXT_EDIT,
} = contactUsPageTextConstants;
const { ShowSnack } = snackBarConstants;

export const getContactUsPageText = () => async (dispatch) => {
  dispatch({ type: CONTACT_US_PAGE_TEXT_REQ });
  try {
    var res = await api.get(`/contactUsPageText/`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data && !res.data.error) {
      dispatch({ type: CONTACT_US_PAGE_TEXT, payload: res.data.lastItem });
    } else {
      dispatch({ type: CONTACT_US_PAGE_TEXT_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: CONTACT_US_PAGE_TEXT_ERR, payload: e.message });
  }
};

export const updateContactUsPageText = (data) => async (dispatch) => {
  dispatch({ type: CONTACT_US_PAGE_TEXT_EDIT_REQ });
  try {
    var res = await api.post("/contactUsPageText/update", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.updatedContactUsPageText && !res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "ContactUsPageText updated successfully",
      });
      dispatch({
        type: CONTACT_US_PAGE_TEXT_EDIT,
        payload: res.data.updatedContactUsPageText,
      });
    } else {
      dispatch({
        type: CONTACT_US_PAGE_TEXT_EDIT_ERR,
        payload: res.data.error,
      });
    }
  } catch (e) {
    dispatch({ type: CONTACT_US_PAGE_TEXT_EDIT_ERR, payload: e.message });
  }
};