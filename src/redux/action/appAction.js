import { api, GET, } from "../../Constants/apiConstants";
import { makeAPIRequest } from "../../utils/globalFunctions";
import { showNotification } from "../../utils/tostyMessage";
import { GET_ALL_APP, GET_ALL_APP_SERVER } from "./type";


export const getAllAppList = (body) => async (dispatch) => {

  return makeAPIRequest({
    method: GET,
    url: api.getAllApp,
    token: false,
    data: body,
  }).then((response) => {
    if (response?.data?.success === true) {
      dispatch({ type: GET_ALL_APP, payload: response?.data })
    } else {
      showNotification('error', response?.data?.status)
    }
  }).catch((err) => {
    showNotification('error', err?.message)
  });
}

export const getAppAllServer = (param) => async (dispatch) => {

  return makeAPIRequest({
    method: GET,
    url: api.getAppServer,
    params: param,
    token: false
  }).then((response) => {
    if (response?.data?.success === true) {
      dispatch({ type: GET_ALL_APP_SERVER, payload: response?.data })
    } else {
      showNotification('error', response?.data?.status)
    }
  }).catch((err) => {
    showNotification('error', err?.message)
  });
}



