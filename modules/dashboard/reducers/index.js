import { combineReducers } from "redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import packages from "./packages";
import settings from "./settings";

let dashboardReducer;
// TODO uncomment this after ReactionCOre become exported
if (ReactionCore.hasDashboardAccess()) {
  dashboardReducer = combineReducers({
    packages,
    settings
  });
} else {
  // we don't need to add dashboard reducers for non admin
  dashboardReducer = {};
}

export default dashboardReducer;
