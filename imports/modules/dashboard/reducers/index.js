import { combineReducers } from "redux";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import permissions from "./permissions";
import packages from "./packages";
import coreSettings from "./coreSettings";
import orders from "./orders";

const dashboardReducer = combineReducers({
  coreSettings,
  orders,
  packages,
  permissions
});

// this will work only then user login as admin and refresh page, so this way is
// bad for us

// if (ReactionCore.hasDashboardAccess()) {
//   dashboardReducer = combineReducers({
//     coreSettings,
//     orders,
//     packages,
//     permissions
//   });
// } else {
//   // we don't need to add dashboard reducers for non admin
//   dashboardReducer = {};
// }

export default dashboardReducer;
