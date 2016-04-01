import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { composeWithTracker } from "react-komposer";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import { getTopVariants } from "../../../client/helpers/products";
import * as variantsActions from "../actions/variants";
import * as productActions from "../actions/product";
import { displayAlert } from "../../layout/actions/alert";
import VariantList from "../components/productDetail/variants/VariantList.jsx";
// import Loading from "../../layout/components/Loading";

class ProductVariantListContainer extends Component {
  componentWillMount() {
    // fill the store with the list of top variants
    const topVariants = getTopVariants(this.props.productId);
    if (topVariants.length) {
      // sort variants in correct order
      topVariants.sort((a, b) => a.index - b.index);
      this.props.variantsActions.getTopVariantsArray(topVariants);
    }
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
  productId: PropTypes.string.isRequired,
  topVariantsArray: PropTypes.arrayOf(PropTypes.object),
  variantsActions: PropTypes.shape({
    changeVariantFormVisibility: PropTypes.func,
    createTopVariant: PropTypes.func,
    createChildVariant: PropTypes.func,
    cloneVariant: PropTypes.func,
    deleteVariant: PropTypes.func,
    getTopVariantsArray: PropTypes.func,
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

// function composer(props, onData) {
//   const allVariants = ReactionCore.Collections.Products.find({
//     ancestors: { $in: [props.productId] }
//   }).fetch();
//   onData(null, { allVariants });
//   // if (props.topVariantsArray.length) {
//   //   const topVariantIdList = props.topVariantsArray.map(variant => variant._id);
//   //   const allChildVariants = ReactionCore.Collections.Products.find({
//   //     ancestors: { $in: topVariantIdList }
//   //   }).fetch();
//   //   onData(null, { allChildVariants });
//   // } else {
//   //   // this part needed because w/o it `componentWillMount` never be fired
//   //   onData(null, {});
//   // }
// }

// const ProductVariantListContainerWithData = composeWithTracker(
//   composer,
//   Loading
// )(ProductVariantListContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductVariantListContainer);
