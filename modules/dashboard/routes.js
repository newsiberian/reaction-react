import Dashboard from "./containers/Dashboard.jsx";
import DashboardGrid from "./containers/DashboardGridContainer.jsx";
import Settings from "./components/grid/Settings.jsx";
import ShopSettings from "./components/shop/Settings.jsx";

export default {
  path: "/dashboard",
  component: Dashboard,
  //components: { main: Dashboard, actionBar: null },
  indexRoute: { component: DashboardGrid },
  childRoutes: [
    {
      path: "packages(/:packageId)",
      //components: { main: DashboardGrid, actionBar: Settings },
      component: DashboardGrid,
      childRoutes: [
        {
          path: "test",
          //components: { main: null, actionBar: Settings }
          component: Settings
        },
        {
          path: "core",
          //components: { main: null, actionBar: Settings }
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
