import api from "../../utils/api";
import { aboutUsConstants, snackBarConstants } from "../constants";
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
const { ShowSnack } = snackBarConstants;

export const getAboutUs = () => async (dispatch) => {
  dispatch({ type: ABOUT_US_REQ });
  try {
    var res = await api.get(`/aboutUs/`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });    
    if (res.data && !res.data.error) {
      dispatch({ type: ABOUT_US, payload: res.data.lastItem });
    } else {
      dispatch({ type: ABOUT_US_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: ABOUT_US_ERR, payload: e.message });
  }
};

export const updateAboutUs = (data) => async (dispatch) => {
  dispatch({ type: ABOUT_US_EDIT_REQ });
  try {
    var res = await api.post("/aboutUs/update", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.updatedAboutUs && !res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "About Us updated successfully",
      });
      dispatch({
        type: ABOUT_US_EDIT,
        payload: res.data.updatedAboutUs,
      });
    } else {
      dispatch({
        type: ABOUT_US_EDIT_ERR,
        payload: res.data.error,
      });
    }
  } catch (e) {
    dispatch({ type: ABOUT_US_EDIT_ERR, payload: e.message });
  }
};