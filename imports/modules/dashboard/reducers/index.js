import { combineReducers } from "redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
//import { hasDashboardAccess } from "../../../client/main";
import permissions from "./permissions";
import packages from "./packages";
import coreSettings from "./coreSettings";

let dashboardReducer;
if (ReactionCore.hasDashboardAccess()) {
  dashboardReducer = combineReducers({
    coreSettings,
    packages,
    permissions
  });
} else {
  // we don't need to add dashboard reducers for non admin
  dashboardReducer = {};
}

export default dashboardReducer;
