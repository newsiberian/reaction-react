import Dashboard from "./containers/Dashboard.jsx";
import DashboardGridContainer from "./containers/DashboardGridContainer.jsx";
import DashboardGrid from "./components/grid/DashboardGrid.jsx";
import Settings from "./components/grid/Settings.jsx";
import ShopSettings from "./components/shop/Settings.jsx";
// import AccountsSettings from "./components/accounts/Settings.jsx";
import AccountsSettingsContainer from
  "./containers/AccountsSettingsContainer.jsx";

// TODO add auth flow to all routes
export default {
  path: "/dashboard",
  component: Dashboard,
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
