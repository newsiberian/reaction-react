import Dashboard from "./containers/Dashboard.jsx";
import DashboardGrid from "./containers/DashboardGridContainer.jsx";
import Settings from "./components/grid/Settings.jsx";

export default {
  path: "/dashboard",
  component: Dashboard,
  //components: { main: Dashboard, actionBar: null },
  indexRoute: { component: DashboardGrid },
  childRoutes: [
    {
      path: "packages",
      components: { main: DashboardGrid, actionBar: Settings }

      // component: DashboardGrid,
      //childRoutes: [
      //  {
      //    path: "?settings=true",
      //    components: { main: DashboardGrid, actionBar: Settings }
      //  }
      //]
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
