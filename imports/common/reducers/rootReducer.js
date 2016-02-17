import { routeReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import layout from "../../modules/layout/reducers";
import dashboard from "../../modules/dashboard/reducers";

const rootReducer = combineReducers({
  layout,
  dashboard,
  form: formReducer,
  routing: routeReducer
});

export default rootReducer;
