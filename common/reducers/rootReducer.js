import { routeReducer } from "react-router-redux";
import { combineReducers } from "redux";
// todo remove this in future if will be not using
import { ReactionCore } from "meteor/reactioncommerce:core";
import dashboard from "../../modules/dashboard/reducers";

const rootReducer = combineReducers({
  dashboard,
  routing: routeReducer
});

export default rootReducer;
