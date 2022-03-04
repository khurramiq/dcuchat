import api from "../../utils/api";
import { contactUsConstants, snackBarConstants } from "../constants";
const {
  // get
  CONTACT_US_FORM_SEND_MESSAGE_REQ,
  CONTACT_US_FORM_SEND_MESSAGE_ERR,
  CONTACT_US_FORM_SEND_MESSAGE,
} = contactUsConstants;
const { ShowSnack } = snackBarConstants;

export const updateContactUsPageText = (data) => async (dispatch) => {
  dispatch({ type: CONTACT_US_FORM_SEND_MESSAGE_REQ });
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
        type: CONTACT_US_FORM_SEND_MESSAGE,
        payload: res.data.updatedContactUsPageText,
      });
    } else {
      dispatch({
        type: CONTACT_US_FORM_SEND_MESSAGE_ERR,
        payload: res.data.error,
      });
    }
  } catch (e) {
    dispatch({ type: CONTACT_US_FORM_SEND_MESSAGE_ERR, payload: e.message });
  }
};

// export const delete_Ad = (data) => async (dispatch) => {
//   dispatch({ type: ADReq });
//   try {
//     var res = await api.delete(`/ad/adId/${data._id}`, {
//       headers: { authorization: `${localStorage.getItem("token")}` },
//     });
//     if (!res.data.error) {
//       dispatch({ type: ShowSnack, payload: "Ad deleted successfully" });
//       dispatch({ type: ADDel, payload: data });
//     } else {
//       dispatch({ type: ADErr, payload: res.data.error });
//     }
//   } catch (e) {
//     dispatch({ type: ADErr, payload: e.message });
//   }
// };
