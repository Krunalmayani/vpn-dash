import { combineReducers } from "redux";

import authReducer from "./authReducer"
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    user: authReducer,
    application: appReducer

});

export default rootReducer;