import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { browserHistory } from "react-router";
//import { syncHistoryWithStore } from "react-router-redux";
import { routerMiddleware } from "react-router-redux";
import createLogger from "redux-logger";
import DevTools from "../containers/DevTools.jsx";
import rootReducer from "../reducers/rootReducer";

// Sync dispatched route actions to the history
//const reduxRouterMiddleware = syncHistoryWithStore(browserHistory);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(browserHistory), createLogger()),
      DevTools.instrument()
    )
  );

  // Required for replaying actions from devtools to work
  //reduxRouterMiddleware.listenForReplays(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
