import { ReactionCore } from "meteor/reactioncommerce:core";
import Dashboard from "./containers/Dashboard.jsx";
import DashboardGridContainer from "./containers/DashboardGridContainer.jsx";
import DashboardGrid from "./components/grid/DashboardGrid.jsx";
import ShopSettings from "./components/shop/Settings.jsx";
import AccountsManagementContainer from
  "./containers/AccountsManagementContainer.jsx";
import AccountsSettingsContainer from
  "./containers/AccountsSettingsContainer.jsx";
import Permissions from "./components/accounts/Permissions.jsx";
import AddMember from "./components/accounts/AddMember.jsx";
import i18nSettings from "./components/i18n/Settings.jsx";

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
      //childRoutes: [
      //  {
      //    path: "shop",
      //    component: ShopSettings
      //  },
      //  {
      //    path: "accounts",
      //    component: AccountsSettingsContainer
      //  },
      //  {
      //    path: "i18n",
      //    component: i18nSettings
      //  }
      //]
    },
    {
      path: "accounts",
      component: AccountsManagementContainer
      //childRoutes: [
      //  {
      //    path: "permissions",
      //    component: Permissions
      //  },
      //  {
      //    path: "add",
      //    component: AddMember
      //  }
      //]
    }
  ]
};
