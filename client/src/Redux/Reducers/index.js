
import {combineReducers} from "redux"
import AuthReducer from "./AuthReducer"
import ErrorReducer from "./ErrorReducer"
import PostReducer from "./PostReducer"

const rootReducer = combineReducers({AuthReducer,ErrorReducer,PostReducer})

export default rootReducer