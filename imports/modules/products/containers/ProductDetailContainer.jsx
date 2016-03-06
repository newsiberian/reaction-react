import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import * as alertActions from "../../layout/actions/alert";
import * as productActions from "../actions/product";
import Loading from "../../layout/components/Loading";
import ProductDetail from "../components/productDetail/ProductDetail";
//import Unauthorized from "../../layout/components/Unauthorized";
//import ProductNotFound from "../../layout/components/ProductNotFound";

const { Products, Tags } = ReactionCore.Collections;

const getProduct = handle => {
  if (!handle.match(/^[A-Za-z0-9]{17}$/)) {
    const possibleHandle = handle.toLowerCase();
    return Products.findOne({
      handle: possibleHandle
    });
  }
  return Products.findOne({
    _id: handle
  });
};

const getSelectedVariant = variantId => {
  if (variantId) {
    return Products.findOne({ _id: variantId });
  }
  return {};
};

const getTags = product => {
  if (product) {
    if (product.hashtags) {
      return product.hashtags.map(id => Tags.findOne(id));
    }
  }
  // let it looks nice
  return [];
};

class ProductDetailContainer extends Component {
  componentWillMount() {
    const { product, productActions } = this.props;
    const { variantId } = this.props.params;
    // TODO maybe we don't need this logic at all. Review this Ids after pdp will
    // be done.
    productActions.setProductId(product._id);
    productActions.setVariantId(product._id, variantId);
  }

  render() {
    return (<ProductDetail {...this.props} />);
  }
}

ProductDetailContainer.propTypes = {
  productId: PropTypes.string,
  variantId: PropTypes.string,
  //alertActions: PropTypes.shape({
  //  displayAlert: PropTypes.func
  //}).isRequired,
  productActions: PropTypes.shape({
    setProductId: PropTypes.func,
    setVariantId: PropTypes.func,
    toggleVisibility: PropTypes.func,
    changeProductField: PropTypes.func,
    updateProductField: PropTypes.func
  }).isRequired,
  params: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  selectedVariant: PropTypes.object,
  tags: PropTypes.array
};

function mapStateToProps(state) {
  return {
    //alert: state.layout.alert,
    productId: state.shop.product.productId,
    variantId: state.shop.product.variantId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //alertActions: bindActionCreators(alertActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  };
}

function composer(props, onData) {
  const { handle } = props.params;
  const productsHandle = Meteor.subscribe("Product", handle);

  if (productsHandle.ready() && ReactionCore.Subscriptions.Tags.ready()) {
    const product = getProduct(handle);
    const tags = getTags(product);
    const selectedVariant = getSelectedVariant(props.variantId);

    onData(null, {
      product: product,
      selectedVariant: selectedVariant,
      tags: tags
    });
  }
}

const ProductDetailContainerWithData = composeWithTracker(
  composer,
  Loading
)(ProductDetailContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainerWithData);
