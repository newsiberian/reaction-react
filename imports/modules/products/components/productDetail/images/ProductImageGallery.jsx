import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import look, { StyleSheet } from "react-look";
import { FS } from "meteor/cfs:base-package";
import Dropzone from "react-dropzone";
//import shallowCompare from "react-addons-shallow-compare";
import ImageDetail from "./ImageDetail";

const styles = StyleSheet.create({
  images: {
    //fontSize: 0,
    //margin: "0 -.25rem",
    textAlign: "center"
  },
  bigImage: {},
  dropzone: { // taken from SUI "ui basic button"
    display: "inline-block",
    cursor: "pointer",
    minHeight: "1em",
    borderRadius: ".28571429rem",
    outline: 0,
    border: "none",
    verticalAlign: "baseline",
    margin: "1rem 0 1rem 0",
    padding: ".78571429em 1.5em",
    textAlign: "center",
    textDecoration: "none",
    transition: "opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease",
    background: "0 0",
    color: "rgba(0,0,0,.6)",
    fontWeight: "400",
    boxShadow: "0 0 0 1px rgba(34,36,38,.15) inset",
    ":hover": {
      backgroundColor: "#fff",
      color: "rgba(0,0,0,.8)",
      boxShadow: "0 0 0 1px rgba(34,36,38,.35) inset,0 0 0 0 rgba(34,36,38,.15) inset"
    },
    ":active": {
      background: "#f8f8f8",
      color: "rgba(0,0,0,.9)",
      boxShadow: "0 0 0 1px rgba(0,0,0,.15) inset,0 1px 4px 0 rgba(34,36,38,.15) inset"
    }
  }
});
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
    // act only if at least one variant exists. `selectedVariant` could be empty
    // or fulfilled object
    if (typeof selectedVariant._id === "string") {
      mediaActions.uploadMedia(files, product, selectedVariant);
    }
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
        <div /*className="ui images"*/ className={styles.images}>
          {media.length ? media.map((image, i) => {
            // TODO the same as below
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
            <img src="/resources/placeholder.gif" className={styles.bigImage} />
          }
        </div>
        {ReactionCore.hasPermission("createProduct") &&
          // TODO should we add check of existence of variant here? If yes, we will
          // be not see this until varaint is created, but with productBundle type
          // it could be messy
          <Dropzone
            className={styles.dropzone}
            onDrop={files => this.handleDrop(files)}
            accept="image/*"
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

export default translate("core")(look(ProductImageGallery));
