import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Settings from "../components/productsGrid/Settings.jsx";
import * as layoutSettingsActions from "../../layout/actions/settings";
import * as productActions from "../actions/product";
import { routeActions } from "react-router-redux";

const ProductsSettingsContainer = props => <Settings {...props} />;

ProductsSettingsContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  products: PropTypes.array,
  productActions: PropTypes.shape({
    cloneProduct: PropTypes.func,
    maybeDeleteProduct: PropTypes.func,
    publishProduct: PropTypes.func,
    updateProductWeight: PropTypes.func
  }).isRequired,
  routeActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    location: state.routing.location,
    selectedProducts: state.shop.productsGrid.selectedProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch),
    // to redirect to PDP
    routeActions: bindActionCreators(routeActions, dispatch)
  };
}

function composer(props, onData) {
  // we are using our own `ProductsSettings` publication here, because we need
  // to have access to selected products from different routes.
  const handle = Meteor.subscribe("ProductsSettings", props.selectedProducts);
  if (handle.ready()) {
    const products = ReactionCore.Collections.Products.find({
      _id: { $in: props.selectedProducts }
    }).fetch();
    onData(null, { products });
  }
}

const ProductsSettingsContainerWithData = composeWithTracker(
  composer
)(ProductsSettingsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsSettingsContainerWithData);
