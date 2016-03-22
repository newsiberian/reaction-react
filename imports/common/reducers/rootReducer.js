import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import layout from "../../modules/layout/reducers";
import dashboard from "../../modules/dashboard/reducers";
import shop from "../../modules/products/reducers";
import comments from "../../modules/comments/reducers";

const rootReducer = combineReducers({
  layout,
  dashboard,
  shop,
  comments,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
