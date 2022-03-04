import { messageConstants } from "../constants";
const { CLEAR_MESSAGE_NOTIFICATION, MESSAGE_NOTIFICATION } = messageConstants;
const initialState = {
  clearMessageNotification: null,
  cMessageNotification: 0,
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_MESSAGE_NOTIFICATION:
      return {
        ...state,
        clearMessageNotification: action.payload,
      };
    case MESSAGE_NOTIFICATION:
      return {
        ...state,
        cMessageNotification: action.payload,
      };
    default:
      return state;
  }
};
