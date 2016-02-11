import Dashboard from "./containers/Dashboard.jsx";
import DashboardGridContainer from "./containers/DashboardGridContainer.jsx";
import DashboardGrid from "./components/grid/DashboardGrid.jsx";
import Settings from "./components/grid/Settings.jsx";
import ShopSettings from "./components/shop/Settings.jsx";

export default {
  path: "/dashboard",
  component: Dashboard,
  indexRoute: { component: DashboardGridContainer },
  childRoutes: [
    {
      path: "packages",
      component: DashboardGridContainer,
      childRoutes: [
        {
          path: "test",
          component: Settings
        },
        {
          path: "core",
          component: ShopSettings
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
