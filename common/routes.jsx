import Layout from "../modules/layout/routes";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
// import history from "history";

// const { Router } = ReactRouter;
// const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();

const rootRoute = {
  childRoutes: [
    Layout
    // Accounts
  ]
};

Meteor.startup(() => {
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.appendChild(root);

  ReactDOM.render(
    <Router history={ browserHistory } routes={ rootRoute }/>,
    root
  );
});
