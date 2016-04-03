import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import ProductImageGallery from "../components/productDetail/images/ProductImageGallery";
import * as mediaActions from "../actions/media";

const getMedia = id => {
  const mediaArray = ReactionCore.Collections.Media.find({
    "metadata.variantId": id
  }, {
    sort: {
      "metadata.priority": 1
    }
  });

  return mediaArray.fetch();
  //return mediaArray.map(media => {
  //  return {
  //    _id: media._id,
  //    name: media.name(),
  //    url: media.url({
  //      uploading: "/resources/placeholder.gif",
  //      storing: "/resources/placeholder.gif",
  //      store: "large"
  //    }),
  //    thumb: media.url({ store: "thumbnail" })
  //  };
  //});
};

// const ProductImageGalleryContainer = props => <ProductImageGallery {...props} />;
class ProductImageGalleryContainer extends Component {
  componentWillUnmount() {
    // cleanup product store state
    this.props.mediaActions.destroyMedia();
  }

  render() {
    return <ProductImageGallery {...this.props} />;
  }
}

ProductImageGalleryContainer.propTypes = {
  media: PropTypes.array,
  mediaActions: PropTypes.shape({
    uploadMedia: PropTypes.func,
    removeMedia: PropTypes.func,
    syncMedia: PropTypes.func,
    moveMedia: PropTypes.func,
    destroyMedia: PropTypes.func
  }),
  mediaIdsArray: PropTypes.arrayOf(PropTypes.string),
  product: PropTypes.object.isRequired,
  selectedVariant: PropTypes.object
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
  // TODO: Maybe we need subscribe to product Media here.
  //const handle = Meteor.subscribe("Media");
  //if (handle.ready()) {
  if (ReactionCore.Subscriptions.Media.ready()) {
    // sometimes `selectedVariant` is not ready to this moment
    if (props.selectedVariant) {
      const media = getMedia(props.selectedVariant._id);

      onData(null, { media });
    }
  }
}

const ProductImageGalleryContainerWithData = composeWithTracker(
  composer
)(ProductImageGalleryContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductImageGalleryContainerWithData);
