import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
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
    // productActions.setProductId(product._id);
    productActions.setVariantId(product._id, variantId);
  }

  render() {
    return (<ProductDetail {...this.props} />);
  }
}

ProductDetailContainer.propTypes = {
  //productId: PropTypes.string,
  //variantId: PropTypes.string,
  productActions: PropTypes.shape({
    setProductId: PropTypes.func,
    setVariantId: PropTypes.func,
    publishProduct: PropTypes.func,
    changeProductField: PropTypes.func,
    updateProductField: PropTypes.func,
    rollbackFieldState: PropTypes.func,
    validateBeforeToggleVisibility: PropTypes.func
  }).isRequired,
  params: PropTypes.object.isRequired, // TODO why it is here?
  product: PropTypes.object.isRequired,
  productState: PropTypes.shape({ // product state from `store`
    title: PropTypes.object,
    pageTitle: PropTypes.object,
    vendor: PropTypes.object,
    description: PropTypes.object,
    productId: PropTypes.string,
    variantId: PropTypes.string
  }),
  selectedVariant: PropTypes.object,
  tags: PropTypes.array
};

function mapStateToProps(state) {
  return {
    //productId: state.shop.product.productId,
    //variantId: state.shop.product.variantId,
    productState: state.shop.product
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  };
}

function composer(props, onData) {
  //const mediaHandle = Meteor.subscribe("Media");
  //const productsHandle = Meteor.subscribe("Product", props.params.handle);
  if (Meteor.subscribe("Product", props.params.handle).ready() &&
    ReactionCore.Subscriptions.Tags.ready()) {
    const product = getProduct(props.params.handle);
    const tags = getTags(product);
    let selectedVariant = {};
    // variant could be undefined if product doesn't have variants
    if (typeof props.productState.variantId === "string") {
      selectedVariant = getSelectedVariant(props.productState.variantId);
    }
    onData(null, {
      product,
      selectedVariant,
      tags
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
