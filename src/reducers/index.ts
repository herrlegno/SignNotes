import { combineReducers } from "redux";
import signReducer from "./signs";

const rootReducer = combineReducers({
  sign: signReducer
});

export default rootReducer;
