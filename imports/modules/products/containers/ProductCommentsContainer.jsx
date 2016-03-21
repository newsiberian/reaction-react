import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Comments } from "meteor/sunlark:reaction-comments-core";
import ProductImageGallery from "../components/productDetail/images/ProductImageGallery";
import * as mediaActions from "../actions/media";

const ProductCommentsContainer = props => <ProductComments {...props} />

ProductCommentsContainer.propTypes = {
  
};

function mapStateToProps(state) {
  return {
    mediaIdsArray: state.shop.product.mediaIdsArray
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mediaActions: bindActionCreators(mediaActions, dispatch)
    //productActions: bindActionCreators(productActions, dispatch)
  };
}

function composer(props, onData) {
  debugger;
  const handle = Meteor.subscribe("Comments", props.productId);
  if (handle.ready()) {
    const comments = Comments.find({ sourceId: props.productId }).fetch();

    onData(null, { comments });
  }
}

const ProductCommentsContainerWithData = composeWithTracker(
  composer
)(ProductCommentsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCommentsContainerWithData);
