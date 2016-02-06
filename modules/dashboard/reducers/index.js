import { combineReducers } from "redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import packages from "./packages";

let dashboardReducer;
if (ReactionCore.hasDashboardAccess()) {
  dashboardReducer = combineReducers({
    packages
  });
} else {
  // dashboardReducer = {};
  // todo remove this after adding login functionality
  dashboardReducer = combineReducers({
    packages
  });
}

export default dashboardReducer;
