import { ReactionCore } from "meteor/reactioncommerce:core";
import Dashboard from "./containers/Dashboard.jsx";
import DashboardGridContainer from "./containers/DashboardGridContainer.jsx";
import DashboardGrid from "./components/grid/DashboardGrid.jsx";
import Settings from "./components/grid/Settings.jsx";
import ShopSettings from "./components/shop/Settings.jsx";
import AccountsManagementContainer from
  "./containers/AccountsManagementContainer.jsx";
// import AccountsSettings from "./components/accounts/Settings.jsx";
import AccountsSettingsContainer from
  "./containers/AccountsSettingsContainer.jsx";

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
      component: DashboardGridContainer,
      childRoutes: [
        {
          path: "test",
          component: Settings
        },
        {
          path: "shop",
          component: ShopSettings
        },
        {
          path: "accounts",
          component: AccountsSettingsContainer
        }
      ]
    },
    {
      path: "accounts",
      component: AccountsManagementContainer,
      childRoutes: [
        //{
        //  path: "manage",
        //  component: Settings
        //}
      ]
    },
    {
      path: "shop",
      components: { main: DashboardGrid, actionBar: Settings }

      // component: DashboardGrid,
      //childRoutes: [
      //  {
      //    path: "?settings=true",
      //    components: { main: DashboardGrid, actionBar: Settings }
      //  }
      //]
    },
  ]
};
