import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import { getVariantQuantity, getTopVariants } from "../../../client/helpers/products";
import * as variantsActions from "../actions/variants";
import * as productActions from "../actions/product";
import { displayAlert } from "../../layout/actions/alert";
import VariantList from "../components/productDetail/variants/VariantList.jsx";

const getProductTopVariants = productId => {
  let inventoryTotal = 0;
  const variants = getTopVariants(productId);

  if (variants.length > 0) {
    // calculate inventory total for all variants
    variants.forEach(variant => {
      let qty = getVariantQuantity(variant);
      if (typeof qty === "number") {
        inventoryTotal += qty;
      }
    });
    // calculate percentage of total inventory of this product
    variants.forEach(variant => {
      let qty = getVariantQuantity(variant);
      variant.inventoryTotal = inventoryTotal;
      variant.inventoryPercentage = parseInt(qty / inventoryTotal * 100, 10);
      if (variant.title) {
        variant.inventoryWidth = parseInt(variant.inventoryPercentage -
          variant.title.length, 10);
      } else {
        variant.inventoryWidth = 0;
      }
    });
    // sort variants in correct order
    variants.sort((a, b) => a.index - b.index);

    return variants;
  }
};

// const ProductVariantListContainer = props => <VariantList {...props} />;
class ProductVariantListContainer extends Component {
  componentWillMount() {
    // fill the store with the list of top variants
    this.props.variantsActions.getTopVariants(getProductTopVariants(this.props.productId));
  }

  render() {
    return (
      <VariantList {...this.props} />
    );
  }
}

ProductVariantListContainer.propTypes = {
  displayAlert: PropTypes.func,
  productActions: PropTypes.shape({
    changeSelectedVariantId: PropTypes.func,
    updateProductField: PropTypes.func
  }).isRequired,
  topVariantsArray: PropTypes.arrayOf(PropTypes.object),
  variantsActions: PropTypes.shape({
    changeVariantFormVisibility: PropTypes.func,
    createChildVariant: PropTypes.func,
    cloneVariant: PropTypes.func,
    deleteVariant: PropTypes.func,
    getTopVariants: PropTypes.func,
    syncWithTitle: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {
    topVariantsArray: state.shop.product.topVariantsArray
  };
}

function mapDispatchToProps(dispatch) {
  return {
    displayAlert: bindActionCreators(displayAlert, dispatch),
    productActions: bindActionCreators(productActions, dispatch),
    variantsActions: bindActionCreators(variantsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductVariantListContainer);
