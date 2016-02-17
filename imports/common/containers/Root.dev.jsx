import React, { Component, PropTypes } from "react";
import { Provider } from "react-redux";
import routes from "../routes";
import DevTools from "./DevTools.jsx";
import { Router, browserHistory } from "react-router";
// todo do we need this here?
import "meteor/reactioncommerce:core/client/subscriptions";

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div style={{height: "100%"}}>
          <Router history={browserHistory} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
