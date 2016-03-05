import React, { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { FS } from "meteor/cfs:base-package";
import ProductImageGallery from "../components/productDetail/images/ProductImageGallery";

const { Media } = ReactionCore.Collections;

/**
 * @class ProductImageGalleryContainer
 */
export default class ProductImageGalleryContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { media: [] };

    this.getMediaArray = this.getMediaArray.bind(this);
    this.moveMedia = this.moveMedia.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropMedia = this.handleDropMedia.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedVariant || nextProps.product) {
      let mediaArray = this.getMediaArray(nextProps);
      this.setState(update(this.state, {
        media: { $set: this.extractDataFromMedia(mediaArray) }}));
    }
  }

  /**
   * @private
   * @function extractDataFromMedia
   * @description extract media _id from media cursor
   * @summary We keep all the fields in the state in order not to update the db
   * with every movement of the image.
   */
  extractDataFromMedia(mediaArray) {
    return mediaArray.map((media) => { return {
      _id: media._id,
      name: media.name(),
      url: media.url({
        uploading: "/resources/placeholder.gif",
        storing: "/resources/placeholder.gif",
        store: "large"
      }),
      thumb: media.url({ store: "thumbnail" })
    } });
  }

  /**
   * @private
   * @function getMediaArray
   * @description
   * @summary copy of "media" method from Reaction template
   */
  getMediaArray(props) {
    let mediaArray = [];
    const { product, selectedVariant } = props;

    if (selectedVariant) {
      mediaArray = Media.find({
        "metadata.variantId": selectedVariant._id
      }, {
        sort: {
          "metadata.priority": 1
        }
      });
      if (!ReactionCore.hasAdminAccess() && mediaArray.count() < 1) {
        mediaArray = Media.find({
          "metadata.variantId": product.variants[0]._id
        }, {
          sort: {
            "metadata.priority": 1
          }
        });
      }
    } else {
      // todo непонятно для чего эта часть. Нужно это переделать после того как
      // выбор разных вариантов будет реализован.
      if (product) {
        let ids = [];
        for (let variant of product.variants) {
          ids.push(variant._id);
        }
        mediaArray = Media.find({
          "metadata.variantId": {
            $in: ids
          }
        }, {
          sort: {
            "metadata.priority": 1
          }
        });
      }
    }
    return mediaArray;
  }

  /**
   * @function moveMedia
   * @description handler on image moving
   * @param dragIndex
   * @param hoverIndex
   */
  moveMedia(dragIndex, hoverIndex) {
    const { media } = this.state;
    const dragMedia = media[dragIndex];

    this.setState(update(this.state, {
      media: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragMedia]
        ]
      }
    }));
  }

  /**
   * @function handleDropMedia
   * @description onDrop handler for images
   * @summary this will be called from ImageDetail component
   * @fires Media.update
   */
  handleDropMedia() {
    const { media } = this.state;
    for (let image of media) {
      Media.update(image._id, {
        $set: {
          "metadata.priority": _.indexOf(media, image)
        }
      });
    }
  }

  /**
   * @function handleDrop
   * @description onDrop handler for image upload
   * @summary this method is a copy of "uploadHandler" reaction template method
   * @param {Array} files - list of File objects
   */
  handleDrop(files) {
    const { product, selectedVariant } = this.props;
    const productId = product._id;
    // selectedVariant can be false here on page early loading
    const variantId = selectedVariant && selectedVariant._id;
    const shopId = product.shopId || ReactionCore.getShopId();
    const userId = Meteor.userId();
    let count = Media.find({
      "metadata.variantId": variantId
    }).count();

    for (let i = 0, ln = files.length; i < ln; i++) {
      let fileObj;
      fileObj = new FS.File(files[i]);
      fileObj.metadata = {
        ownerId: userId,
        productId: productId,
        variantId: variantId,
        shopId: shopId,
        priority: count
      };
      Media.insert(fileObj);
      count++;
    }
  }

  /**
   * @function handleRemoveClick
   * @description onClick handler for remove Image Button
   * @fires FS.File.remove
   */
  handleRemoveClick(event) {
    if (!this.props.permissions.createProduct) {
      return false;
    }

    const _id = event.target.nodeName === "I"
      ? event.target.parentNode.dataset.id
      : event.target.dataset.id;
    const image = Media.findOne(_id);

    image.remove();
    this.updateImagePriorities();
  }

  render() {
    const { permissions } = this.props;
    return (
      <ProductImageGallery
        media={ this.state.media }
        getMedia={ this.getMedia }
        permissions={ permissions }
        onDrop={ this.handleDrop }
        onDropMedia={ this.handleDropMedia }
        onRemoveClick={ this.handleRemoveClick }
        moveMedia={ this.moveMedia }
      />
    );
  }
}

ProductImageGalleryContainer.propTypes = {
  product: PropTypes.object.isRequired,
  selectedVariant: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  permissions: PropTypes.object.isRequired
};
