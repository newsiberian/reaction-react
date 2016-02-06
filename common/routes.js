//import { render } from "react-dom";
//import { createStore, combineReducers, applyMiddleware } from "redux";
//import { Provider } from "react-redux";
//import { Router, browserHistory } from "react-router";
//import { syncHistory, routeReducer } from "react-router-redux";
import Layout from "../modules/layout/routes";
//import reducers from "<project-path>/reducers";
// import history from "history";

//const reducer = combineReducers(Object.assign({}, reducers, {
//  routing: routeReducer
//}));
//
//// Sync dispatched route actions to the history
//const reduxRouterMiddleware = syncHistory(browserHistory);
//const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(
//  createStore);
//
//const store = createStoreWithMiddleware(reducer);
//
//// Required for replaying actions from devtools to work
//reduxRouterMiddleware.listenForReplays(store);

export default {
  childRoutes: [
    Layout
  ]
};

//Meteor.startup(() => {
//  const root = document.createElement("div");
//  root.setAttribute("id", "root");
//  document.body.appendChild(root);
//
//  //render(
//  //  <Provider store={ store }>
//  //    <Router history={ browserHistory } routes={ rootRoute }/>
//  //  </Provider>,
//  //  root
//  //);
//});
