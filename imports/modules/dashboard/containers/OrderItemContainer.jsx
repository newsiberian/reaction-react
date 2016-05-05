import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import OrderItem from "../components/orders/OrderItem.jsx";
import { getMedia } from "../../../client/helpers/cart";

const OrderItemContainer = props => <OrderItem {...props} />;

OrderItemContainer.propTypes = {
  item: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  media: PropTypes.instanceOf(FS.File)
};

function composer(props, onData) {
  // const handle = Meteor.subscribe("Media", props.userId);

  // if (handle.ready()) {
  const media = getMedia(props.item);
  onData(null, { media });
  // }
}


export default composeWithTracker(
  composer
)(OrderItemContainer);
