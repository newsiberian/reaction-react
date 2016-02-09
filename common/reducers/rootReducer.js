import { routeReducer } from "react-router-redux";
import { combineReducers } from "redux";
import layout from "../../modules/layout/reducers";
import dashboard from "../../modules/dashboard/reducers";

const rootReducer = combineReducers({
  layout,
  dashboard,
  routing: routeReducer
});

export default rootReducer;
