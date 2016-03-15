import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { browserHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducers/rootReducer";

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, routerMiddleware(browserHistory))
  );
}
