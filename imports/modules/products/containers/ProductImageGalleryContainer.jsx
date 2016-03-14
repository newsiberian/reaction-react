import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
//import { FS } from "meteor/cfs:base-package";
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

const ProductImageGalleryContainer = props => {
  //constructor(props, context) {
  //  super(props, context);
  //  this.state = { media: [] };
  //
  //  this.getMediaArray = this.getMediaArray.bind(this);
  //  this.moveMedia = this.moveMedia.bind(this);
  //  this.handleDrop = this.handleDrop.bind(this);
  //  this.handleDropMedia = this.handleDropMedia.bind(this);
  //  this.handleRemoveClick = this.handleRemoveClick.bind(this);
  //}
  //
  //componentWillReceiveProps(nextProps) {
  //  if (nextProps.selectedVariant || nextProps.product) {
  //    let mediaArray = this.getMediaArray(nextProps);
  //    this.setState(update(this.state, {
  //      media: { $set: this.extractDataFromMedia(mediaArray) }}));
  //  }
  //}

  ///**
  // * @private
  // * @function extractDataFromMedia
  // * @description extract media _id from media cursor
  // * @summary We keep all the fields in the state in order not to update the db
  // * with every movement of the image.
  // */
  //extractDataFromMedia(mediaArray) {
  //  return mediaArray.map((media) => { return {
  //    _id: media._id,
  //    name: media.name(),
  //    url: media.url({
  //      uploading: "/resources/placeholder.gif",
  //      storing: "/resources/placeholder.gif",
  //      store: "large"
  //    }),
  //    thumb: media.url({ store: "thumbnail" })
  //  } });
  //}
  //
  //
  //getMediaArray(props) {
  //  let mediaArray = [];
  //  const { product, selectedVariant } = props;
  //
  //  if (selectedVariant) {
  //    mediaArray = Media.find({
  //      "metadata.variantId": selectedVariant._id
  //    }, {
  //      sort: {
  //        "metadata.priority": 1
  //      }
  //    });
  //    if (!ReactionCore.hasAdminAccess() && mediaArray.count() < 1) {
  //      mediaArray = Media.find({
  //        "metadata.variantId": product.variants[0]._id
  //      }, {
  //        sort: {
  //          "metadata.priority": 1
  //        }
  //      });
  //    }
  //  } else {
  //    // todo непонятно для чего эта часть. Нужно это переделать после того как
  //    // выбор разных вариантов будет реализован.
  //    if (product) {
  //      let ids = [];
  //      for (let variant of product.variants) {
  //        ids.push(variant._id);
  //      }
  //      mediaArray = Media.find({
  //        "metadata.variantId": {
  //          $in: ids
  //        }
  //      }, {
  //        sort: {
  //          "metadata.priority": 1
  //        }
  //      });
  //    }
  //  }
  //  return mediaArray;
  //}
  //

  //

  //
  ///**
  // * @function handleDrop
  // * @description onDrop handler for image upload
  // * @summary this method is a copy of "uploadHandler" reaction template method
  // * @param {Array} files - list of File objects
  // */
  //handleDrop(files) {
  //  const { product, selectedVariant } = this.props;
  //  const productId = product._id;
  //  // selectedVariant can be false here on page early loading
  //  const variantId = selectedVariant && selectedVariant._id;
  //  const shopId = product.shopId || ReactionCore.getShopId();
  //  const userId = Meteor.userId();
  //  let count = Media.find({
  //    "metadata.variantId": variantId
  //  }).count();
  //
  //  for (let i = 0, ln = files.length; i < ln; i++) {
  //    let fileObj;
  //    fileObj = new FS.File(files[i]);
  //    fileObj.metadata = {
  //      ownerId: userId,
  //      productId: productId,
  //      variantId: variantId,
  //      shopId: shopId,
  //      priority: count
  //    };
  //    Media.insert(fileObj);
  //    count++;
  //  }
  //}
  //

  return (
    <ProductImageGallery {...props} />
  );
};

ProductImageGalleryContainer.propTypes = {
  media: PropTypes.array,
  mediaActions: PropTypes.shape({
    uploadMedia: PropTypes.func,
    removeMedia: PropTypes.func,
    syncMedia: PropTypes.func,
    moveMedia: PropTypes.func
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
