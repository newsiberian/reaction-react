import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Dashboard from "./containers/Dashboard.jsx";
import DashboardGridContainer from "./containers/DashboardGridContainer.jsx";
import AccountsManagementContainer from "./containers/AccountsManagementContainer.jsx";
import CommentsManagementContainer from "./containers/CommentsManagementContainer.jsx";

const requireAuth = (nextState, replace) => {
  if (!ReactionCore.hasPermission("dashboard", Meteor.userId())) {
    replace({
      pathname: "/unauthorized",
      state: { prevPath: nextState.location.pathname }
    });
  }
};

// TODO add auth flow to all routes
export default {
  path: "/dashboard",
  component: Dashboard,
  onEnter: requireAuth,
  indexRoute: { component: DashboardGridContainer },
  childRoutes: [
    {
      path: "settings",
      component: DashboardGridContainer
    },
    {
      path: "accounts",
      component: AccountsManagementContainer
    },
    {
      path: "comments",
      component: CommentsManagementContainer
    }
  ]
};
