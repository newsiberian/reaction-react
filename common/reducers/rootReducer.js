import { routeReducer } from "react-router-redux";
import { combineReducers } from "redux";
import dashboard from "../../modules/dashboard/reducers";

const rootReducer = combineReducers({
  dashboard,
  routing: routeReducer
});

export default rootReducer;
