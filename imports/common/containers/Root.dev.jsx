import React, { Component, PropTypes } from "react";
import { Provider } from "react-redux";
import routes from "../routes";
import DevTools from "./DevTools.jsx";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
// todo do we need this here?
import "meteor/reactioncommerce:reaction-collections/client/subscriptions";

export default class Root extends Component {
  render() {
    const { store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
