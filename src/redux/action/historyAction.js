import { api, GET } from "../../Constants/apiConstants";
import { makeAPIRequest } from "../../utils/globalFunctions";
import { showNotification } from "../../utils/tostyMessage";
import { GET_TOKEN_HISTORY } from "./type";


export const getAllWithdrawHistory = () => async (dispath) => {

  return makeAPIRequest({
    method: GET,
    url: api.withdrawHistory,
    token: true
  }).then((response) => {
    console.log('response ::', response);
    if (response?.data?.success === true) {
      dispath({ type: GET_TOKEN_HISTORY, payload: response?.data })
    } else {
      showNotification('error', response?.data?.message)
    }
  }).catch((err) => {
    showNotification('error', err?.message)
  });
}  
