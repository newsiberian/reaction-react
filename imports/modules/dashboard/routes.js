// import { Meteor } from "meteor/meteor";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import Dashboard from "./containers/Dashboard.jsx";
import DashboardGridContainer from "./containers/DashboardGridContainer.jsx";
import AccountsManagementContainer from "./containers/AccountsManagementContainer.jsx";
import OrdersContainer from "./containers/OrdersContainer.jsx";
import CommentsManagementContainer from "./containers/CommentsManagementContainer.jsx";

// People sais this is not reactive, so we implement the same but in component's
// lifecycle methods
// const requireAuth = (nextState, replace) => {
//   if (!ReactionCore.hasPermission("dashboard", Meteor.userId())) {
//     replace({
//       pathname: "/unauthorized",
//       state: { prevPath: nextState.location.pathname }
//     });
//   }
// };

// TODO add auth flow to all routes
export default {
  path: "/dashboard",
  component: Dashboard,
  // onEnter: requireAuth,
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
      path: "orders",
      component: OrdersContainer
    },
    {
      path: "comments",
      component: CommentsManagementContainer
    }
  ]
};
