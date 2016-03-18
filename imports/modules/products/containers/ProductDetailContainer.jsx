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

/**
 * getTags
 * @summary fetch tags for a product
 * @param product
 * @return {Array|Object} for admin user we return an object due to drag'n'drop,
 * for customer we return an array with cursors
 */
const getTags = product => {
  if (product) {
    if (product.hashtags) {
      if (ReactionCore.hasPermission("createProduct")) {
        let tags = {};
        product.hashtags.forEach(id => {
          const tag = Tags.findOne({ _id: id }, {
            fields: {
              name: 1,
              slug: 1
            }
          });
          tags[tag._id] = tag;
        });
        return tags;
      }
      return product.hashtags.map(id => Tags.findOne({ _id: id }, {
        fields: {
          name: 1,
          slug: 1
        }
      }));
    }
  }
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
  tags: PropTypes.oneOfType([
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string
    }),
    PropTypes.arrayOf(PropTypes.object)
  ])
  //tags: PropTypes.arrayOf(PropTypes.object)
  //tags: PropTypes.shape({
  //  _id: PropTypes.string,
  //  name: PropTypes.string,
  //  slug: PropTypes.string
  //})
};

function mapStateToProps(state) {
  return {
    //productId: state.shop.product.productId,
    variantId: state.shop.product.ids.variantId,
    productState: state.shop.product.fields
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
    // this needed to prevent endless loading message. Seems we can't pass null
    // or undefined to `onData` object
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
