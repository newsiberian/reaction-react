import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { arrayCompare } from "../../../client/helpers/utilities";
import { replace } from "react-router-redux";
import * as metafieldActions from "../actions/metafield";
import * as productActions from "../actions/product";
import * as tagActions from "../actions/tag";
import Loading from "../../layout/components/Loading";
import ProductDetail from "../components/productDetail/ProductDetail";
//import Unauthorized from "../../layout/components/Unauthorized";
// import ProductNotFound from "../../layout/components/ProductNotFound";
// import NotFound from "../../layout/components/NotFound";

const { Products, Tags } = ReactionCore.Collections;

const productFields = {
  title: 1,
  pageTitle: 1,
  description: 1,
  vendor: 1,
  isVisible: 1,
  hashtags: 1,
  metafields: 1
};

const variantFields = {};

const getProduct = handle => {
  if (!handle.match(/^[A-Za-z0-9]{17}$/)) {
    const possibleHandle = handle.toLowerCase();
    return Products.findOne({ handle: possibleHandle }, { fields: productFields });
  }
  return Products.findOne({ _id: handle }, { fields: productFields });
};

const getSelectedVariant = variantId => {
  if (variantId) {
    return Products.findOne({ _id: variantId }, { fields: variantFields });
  }
  return {};
};

/**
 * getTags
 * @summary fetch tags for a product
 * @param product
 * @return {Array}
 */
const getTags = product => {
  if (product) {
    if (product.hashtags) {
      return product.hashtags.map(id => Tags.findOne({ _id: id }, {
        fields: {
          name: 1,
          slug: 1
        }
      }));
    }
  }
};

const getTagsIdsArray = tags => tags.map(tag => tag._id);

class ProductDetailContainer extends Component {
  componentWillMount() {
    const { product, productActions, tagActions, tags } = this.props;
    const { variantId } = this.props.params;
    // TODO maybe we don't need this logic at all. Review this Ids after pdp will
    // be done.
    // productActions.setProductId(product._id);

    // sometimes product is undefined. That's why this check exists
    if (typeof product !== "undefined") {
      productActions.setVariantId(product._id, variantId);
      const tagsIdsArray = getTagsIdsArray(tags);
      tagActions.syncTags(tagsIdsArray);
    } else {
      // @link https://github.com/reactjs/react-router/issues/3210
      // FIXME keep an eye on RR changes with `notFound` route
      this.props.replace("/404");
    }
  }

  componentWillReceiveProps(nextProps) {
    // if we receive new tags, we should extract `_id` from it and rebuild
    // `store` `tagsIdsArray` to keep things in sync
    // this is the similar logic that we use with media
    if (!arrayCompare(nextProps.tags, this.props.tags, "_id")) {
      const tagsIdsArray = getTagsIdsArray(nextProps.tags);
      this.props.tagActions.syncTags(tagsIdsArray);
    }
  }

  render() {
    return (<ProductDetail {...this.props} />);
  }
}

ProductDetailContainer.propTypes = {
  //productId: PropTypes.string,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  variantId: PropTypes.string,
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
  tags: PropTypes.arrayOf(PropTypes.object),
  tagActions: PropTypes.shape({
    changeTag: PropTypes.func,
    changeNewTag: PropTypes.func,
    clearNewTagName: PropTypes.func,
    removeTag: PropTypes.func,
    updateTag: PropTypes.func,
    syncTags: PropTypes.func,
    moveTag: PropTypes.func,
    dropTag: PropTypes.func,
    clearSuggestions: PropTypes.func,
    updateSuggestions: PropTypes.func
  }).isRequired,
  tagsIdsArray: PropTypes.arrayOf(PropTypes.string),
  metafieldActions: PropTypes.shape({
    changeMetafield: PropTypes.func,
    updateMetafield: PropTypes.func,
    removeMetafields: PropTypes.func
  }).isRequired,
  newMetafield: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  }),
  newTag: PropTypes.object,
  replace: PropTypes.func
};

function mapStateToProps(state) {
  return {
    locale: state.layout.locale,
    //productId: state.shop.product.productId,
    variantId: state.shop.product.ids.variantId,
    productState: state.shop.product.fields,
    newTag: state.shop.product.newTag,
    tagsIdsArray: state.shop.product.tagsIdsArray,
    newMetafield: state.shop.product.newMetafield
  };
}

function mapDispatchToProps(dispatch) {
  return {
    metafieldActions: bindActionCreators(metafieldActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch),
    tagActions: bindActionCreators(tagActions, dispatch),
    replace: bindActionCreators(replace, dispatch)
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
    // const locale = ReactionCore.Locale;
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
