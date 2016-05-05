import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as layoutSettingsActions from "../../layout/actions/settings";
import * as ordersActions from "../actions/orders";
import { routerActions } from "react-router-redux";
import Loading from "../../layout/components/Loading.jsx";
import Orders from "../components/orders/Orders.jsx";

const makeQuery = filter => {
  switch (filter) {
  // New orders
  case "new":
    return {
      "workflow.status": "new"
    };
  // Orders that have yet to be captured & shipped
  case "processing":
    return {
      "workflow.status": "coreOrderWorkflow/processing"
    };
  // Orders that have been shipped, based on if the items have been shipped
  case "shipped":
    return {
      "items.workflow.status": "coreOrderItemWorkflow/shipped"
    };
  // Orders that are complete, including all items with complete status
  case "completed":
    return {
      "workflow.status": "coreOrderWorkflow/completed",
      "items.workflow.workflow": {
        $in: ["coreOrderItemWorkflow/completed"]
      }
    };
  // Orders that have been captured, but not yet shipped
  case "captured":
    return {
      "billing.paymentMethod.status": "completed",
      "shipping.shipped": false
    };
  case "canceled":
    return {
      "workflow.status": "canceled"
    };
  // Orders that have been refunded partially or fully
  case "refunded":
    return {
      "billing.paymentMethod.status": "captured",
      "shipping.shipped": true
    };
  default:
    return {};
  }
};

const getOrders = filter => {
  const query = makeQuery(filter);
  return ReactionCore.Collections.Orders.find(query, {
    sort: { updatedAt: -1 }
  }).fetch();
};

class OrdersContainer extends Component {
  componentDidMount() {
    // we already have this check within router, but this is sensitive place,
    // so we check again
    if (!ReactionCore.hasPermission("orders")) {
      // redirect if no permission
      this.props.routerActions.push({
        pathname: "/unauthorized",
        state: { prevPath: this.props.location.pathname }
      });
    }
  }

  getCount(name) {
    // TODO this should be reactive. need tests
    return ReactionCore.Collections.Orders.find(makeQuery(name)).count();
  }

  render() {
    return (
      <Orders
        {...this.props}
        getCount={this.getCount}
      />
    );
  }
}

OrdersContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  location: PropTypes.object,
  note: PropTypes.shape({
    isChanged: PropTypes.bool
  }),
  orders: PropTypes.arrayOf(PropTypes.object),
  ordersActions: PropTypes.shape({
    changeOrdersFilter: PropTypes.func,
    startOrderProcessing: PropTypes.func,
    updateOrderNote: PropTypes.func,
    rollbackOrderState: PropTypes.func
  }).isRequired,
  routerActions: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {
    locale: state.layout.locale,
    filter: state.dashboard.orders.filter,
    note: state.dashboard.orders.note
  };
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    ordersActions: bindActionCreators(ordersActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  };
}

function composer(props, onData) {
  // todo remove this if no needed
  // ReactionCore.Subscriptions.Orders = Meteor.subscribe("Orders");
  const handle = Meteor.subscribe("Orders");
  if (handle.ready()) {
    // todo test this
    const orders = getOrders(props.filter);
    onData(null, { orders });
  }
}

const OrdersContainerWithData = composeWithTracker(
  composer,
  Loading
)(OrdersContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersContainerWithData);
