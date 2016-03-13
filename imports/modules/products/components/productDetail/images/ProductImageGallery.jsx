import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { FS } from "meteor/cfs:base-package";
import Dropzone from "react-dropzone";
//import shallowCompare from "react-addons-shallow-compare";
//import RaisedButton from "material-ui/lib/raised-button";
import ImageDetail from "./ImageDetail";

const styles = {
  images: {
    fontSize: 0,
    margin: "0 -.25rem",
    textAlign: "center"
  },
  bigImage: {},
  dropzone: {

  }
};
/**
 * @classdesc ProductImageGallery
 */
class ProductImageGallery extends Component {
  constructor(props) {
    super(props);
    this.handleMoveMedia = this.handleMoveMedia.bind(this);
    this.handleDropMedia = this.handleDropMedia.bind(this);
  }

  //shouldComponentUpdate(nextProps) {
  //  // todo разобраться с shallowCompare, возможно применить _.isEqual вместо него.
  //  // return !shallowCompare(this, nextProps.media);
  //  return !_.isEqual(nextProps.media, this.props.media);
  //}

  /**
   * @function handleDrop
   * @description onDrop handler for image upload
   * @summary this method is a copy of "uploadHandler" reaction template method
   * @param {Array} files - list of File objects
   */
  handleDrop(files) {
    const { product, selectedVariant, mediaActions } = this.props;
    //mediaActions.uploadMedia(files, product, selectedVariant);
    if (!ReactionCore.hasPermission("createProduct")) {
      // todo add log message
      return false;
    }
    const productId = product._id;
    const variantId = selectedVariant._id;
    const shopId = product.shopId || ReactionCore.getShopId();
    const userId = Meteor.userId();
    let count = ReactionCore.Collections.Media.find({
      "metadata.variantId": variantId
    }).count();
    const toGrid = selectedVariant.ancestors.length === 1;

    files.forEach(file => {
      let fileObj;
      fileObj = new FS.File(file);
      fileObj.metadata = {
        ownerId: userId,
        productId: productId,
        variantId: variantId,
        shopId: shopId,
        priority: count,
        toGrid: +toGrid // we need number
      };

      ReactionCore.Collections.Media.insert(fileObj);
      count++;
    });
  }

  /**
   * @function handleMoveMedia
   * @description handler on image moving
   * @param dragIndex
   * @param hoverIndex
   */
  handleMoveMedia(dragIndex, hoverIndex) {
    debugger;
    const { media } = this.props;
    const dragMedia = media[dragIndex];

    //this.setState(update(this.state, {
    //  media: {
    //    $splice: [
    //      [dragIndex, 1],
    //      [hoverIndex, 0, dragMedia]
    //    ]
    //  }
    //}));
  }

  /**
   * @function handleDropMedia
   * @description onDrop handler for images
   * @summary this will be called from ImageDetail component
   * @fires Media.update
   */
  handleDropMedia() {
    const { media } = this.props;
    for (let image of media) {
      // todo create method for it?
      Media.update(image._id, {
        $set: {
          "metadata.priority": _.indexOf(media, image)
        }
      });
    }
  }

  render() {
    const { media, mediaActions, product, t } = this.props;
    console.log("ProductImageGallery: rendering...");
    return (
      <div>
        <div /*className="ui images"*/ style={styles.images}>
          {media.length ? media.map((image, i) => {
            return (
              <ImageDetail
                key={image._id}
                index={i}
                media={image}
                mediaActions={mediaActions}
                moveMedia={this.handleMoveMedia}
                onDropMedia={this.handleDropMedia}
                productTitle={product.title}
              />
            );
          }) :
            <img src="/resources/placeholder.gif" style={styles.bigImage} />
          }
        </div>
        {ReactionCore.hasPermission("createProduct") &&
          <Dropzone
            //className="ui huge fluid basic button"
            onDrop={files => this.handleDrop(files)}
            accept="image/*"
            style={styles.dropzone}
          >
            {t("productDetail.dropFiles")}
          </Dropzone>
        }
      </div>
    );
  }
}

ProductImageGallery.propTypes = {
  media: PropTypes.array.isRequired,
  mediaActions: PropTypes.shape({
    uploadMedia: PropTypes.func,
    removeMedia: PropTypes.func
  }),
  //onDrop: PropTypes.func.isRequired,
  //onDropMedia: PropTypes.func.isRequired,
  //onRemoveClick: PropTypes.func.isRequired,
  //moveMedia: PropTypes.func.isRequired
  product: PropTypes.object.isRequired,
  selectedVariant: PropTypes.object,
  //productActions: PropTypes.shape({
  //  setProductId: PropTypes.func,
  //  setVariantId: PropTypes.func,
  //  toggleVisibility: PropTypes.func,
  //  changeProductField: PropTypes.func,
  //  updateProductField: PropTypes.func
  //}).isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(ProductImageGallery);
