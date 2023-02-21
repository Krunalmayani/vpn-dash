import { api, GET, PUT, } from "../../Constants/apiConstants";
import { makeAPIRequest } from "../../utils/globalFunctions";
import { showNotification } from "../../utils/tostyMessage";
import { getAppAllServer } from "./appAction";
import { GET_ALL_SERVER, } from "./type";


export const getAllServer = () => async (dispatch) => {

    return makeAPIRequest({
        method: GET,
        url: api.getAllServer,
        token: false
    }).then((response) => {
        if (response?.data?.success === true) {

            dispatch({ type: GET_ALL_SERVER, payload: response?.data?.data || [] })
        } else {
            showNotification('error', response?.data?.message)
        }
    }).catch((err) => {
        showNotification('error', err?.message)
    });
}

export const manageServerStatus = (body) => async (dispatch) => {

    return makeAPIRequest({
        method: PUT,
        url: api.manageServer,
        data: body,
        token: false
    }).then((response) => {

        if (response?.data?.success === true) {

            dispatch(getAppAllServer({ id: body.id }))
        } else {
            showNotification('error', response?.data?.status)
        }
    }).catch((err) => {
        showNotification('error', err?.message)
    });
}

export const deleteManageServer = (body) => async (dispatch) => {

    return makeAPIRequest({
        method: PUT,
        url: api.deleteAppServer,
        data: body,
        token: false
    }).then((response) => {
        if (response?.data?.success === true) {

            dispatch(getAppAllServer({ id: body.id }))
        } else {
            showNotification('error', response?.data?.status)
        }
    }).catch((err) => {
        showNotification('error', err?.message)
    });
}

