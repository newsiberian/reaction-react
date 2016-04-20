import React, { PropTypes } from "react";
import ReactionCore from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
import OrderItems from "../components/orders/OrderItems.jsx";
// import Loading from "../../layout/components/Loading.jsx";
// import * as layoutSettingsActions from "../../layout/actions/settings";
// import * as shippingActions from "../../shipping/actions/shipping";
import { getMedia } from "../../../client/helpers/cart";

const OrderItemsContainer = props => <OrderItems {...props} />;

OrderItemsContainer.propTypes = {
  item: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  media: PropTypes.instanceof(FS.File)
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
  // const handle = Meteor.subscribe("Media", props.userId);

  // if (handle.ready()) {
    const media = getMedia(props.item);
    onData(null, { media });
  // }
}

// const OrderItemsContainerWithData = composeWithTracker(
//   composer,
//   // Loading
// )(OrderItemsContainer);
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(OrderItemsContainerWithData);

export default composeWithTracker(
  composer
)(OrderItemsContainer);
