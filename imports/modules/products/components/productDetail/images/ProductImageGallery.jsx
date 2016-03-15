import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import look, { StyleSheet } from "react-look";
//import { FS } from "meteor/cfs:base-package";
import Dropzone from "react-dropzone";
//import shallowCompare from "react-addons-shallow-compare";
import ImageDetail from "./ImageDetail";

const styles = StyleSheet.create({
  images: {
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

const getMediaIdsArray = media => media.map(file => file._id);

// @link http://stackoverflow.com/a/22395463
// we comparing only by id
const arrayCompare = (array1, array2) => (array1.length === array2.length) &&
array1.every(function (element, index) {
  return element._id === array2[index]._id;
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

  componentWillReceiveProps(nextProps) {
    // if we receive new media, we should extract `_id` from it and rebuild
    // `store` `mediaIdsArray` to keep things in sync
    if (!arrayCompare(nextProps.media, this.props.media)) {
      const mediaIdsArray = getMediaIdsArray(nextProps.media);
      this.props.mediaActions.syncMedia(mediaIdsArray);
    }
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
    this.props.mediaActions.moveMedia(dragIndex, hoverIndex);
  }

  /**
   * @function handleDropMedia
   * @description onDrop handler for images
   * @summary this will be called from ImageDetail component
   * @fires Media.update
   */
  handleDropMedia() {
    if (!ReactionCore.hasPermission("createProduct")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    const { media, mediaIdsArray } = this.props;
    // we don't mutate `media`. Instead of this we just utilize `mediaIdsArray`
    // as correct indexes provider
    // Looks like we will leave this logic instead of implementing new logic,
    // because of `mediaIdsArray` usage... :(
    // reaction currently uses: ReactionProductAPI.methods.updateMediaPriorities
    media.forEach(image => {
      ReactionCore.Collections.Media.update(image._id, {
        $set: {
          "metadata.priority": _.indexOf(mediaIdsArray, image._id)
        }
      });
    });
  }

  render() {
    const { media, mediaActions, mediaIdsArray, product, t } = this.props;
    console.log("ProductImageGallery: rendering...");
    return (
      <div>
        <div className={styles.images}>
          {mediaIdsArray.length ? mediaIdsArray.map((id, i) => {
            // TODO the same as below
            const files = media.filter(image => image._id === id);
            // this is quickfix for situation then the `mediaIdsArray` is not
            // synced with `media` yet
            if (files.length) {
              return (
                <ImageDetail
                  key={id}
                  index={i}
                  media={files[0]}
                  mediaActions={mediaActions}
                  moveMedia={this.handleMoveMedia}
                  onDropMedia={this.handleDropMedia}
                  productTitle={product.title}
                />
              );
            }
          }) :
            <img src="/resources/placeholder.gif" className={styles.bigImage} />
          }
        </div>
        {ReactionCore.hasPermission("createProduct") &&
          // TODO should we add check of existence of variant here? If yes, we will
          // be not see this until variant is created, but with productBundle type
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
    removeMedia: PropTypes.func,
    syncMedia: PropTypes.func,
    moveMedia: PropTypes.func
  }),
  mediaIdsArray: PropTypes.arrayOf(PropTypes.string),
  product: PropTypes.object.isRequired,
  selectedVariant: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default translate("core")(look(ProductImageGallery));
