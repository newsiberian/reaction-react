import React, { PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
import OrderDetails from "../components/orders/OrderDetails.jsx";
// import Loading from "../../layout/components/Loading.jsx";
// import * as layoutSettingsActions from "../../layout/actions/settings";
// import * as shippingActions from "../../shipping/actions/shipping";


const OrderDetailsContainer = props => <OrderDetails {...props} />;

OrderDetailsContainer.propTypes = {
  order: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
//   return {
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     // layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
//     // shippingActions: bindActionCreators(shippingActions, dispatch)
//   };
// }

function composer(props, onData) {
  const user = ReactionCore.Collections.Accounts.findOne({ userId: props.order.userId });
  onData(null, { userProfile: user ? user.profile : {} });
}

// const OrderDetailsContainerWithData = composeWithTracker(
//   composer,
//   // Loading
// )(OrderDetailsContainer);
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(OrderDetailsContainerWithData);

export default composeWithTracker(
  composer
)(OrderDetailsContainer);
