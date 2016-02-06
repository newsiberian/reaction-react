import Dashboard from "./containers/Dashboard.jsx";
import DashboardGrid from "./containers/DashboardGridContainer.jsx";

export default {
  path: "/dashboard",
  component: Dashboard,
  indexRoute: { component: DashboardGrid },
  childRoutes: [
    //{
    //  path: "/dashboard",
    //  component: DashboardGrid
    //}
  ]
};
