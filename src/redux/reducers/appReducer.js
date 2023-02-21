import { CLEAR_AUTH_REQUEST, GET_ALL_APP, GET_ALL_APP_SERVER, RESET_STORE } from "../action/type";


const INITIAL_STATE = {
    allAPP: [],
    appServer: []
};

const AppReduce = (state = INITIAL_STATE, action = {}) => {

    switch (action.type) {
        case GET_ALL_APP:
            return { ...state, allAPP: action?.payload?.data || [] };

        case GET_ALL_APP_SERVER:
            return { ...state, appServer: action?.payload?.data || [] };

        case CLEAR_AUTH_REQUEST:
            return INITIAL_STATE;

        case RESET_STORE:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export default AppReduce;

