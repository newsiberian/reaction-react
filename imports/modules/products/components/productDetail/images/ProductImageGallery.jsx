import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { FS } from "meteor/cfs:base-package";
import Dropzone from "react-dropzone";
import shallowCompare from "react-addons-shallow-compare";
import ImageDetail from "./ImageDetail";

const { Media, Products } = ReactionCore.Collections;

/**
 * @classdesc ProductImageGallery
 */
class ProductImageGallery extends Component {
  shouldComponentUpdate(nextProps) {
    // todo разобраться с shallowCompare, возможно применить _.isEqual вместо него.
    // return !shallowCompare(this, nextProps.media);
    return !_.isEqual(nextProps.media, this.props.media);
  }

  /**
   * getMedia
   * @summary copy of "media" method from Reaction template
   */
  getMedia() {
    let mediaArray = [];
    const { selectedVariant } = this.props;

    if (selectedVariant) {
      mediaArray = Media.find({
        "metadata.variantId": selectedVariant._id
      }, {
        sort: {
          "metadata.priority": 1
        }
      });
    }
    return mediaArray;
  }

  render() {
    const { media, permissions, onDrop, onDropMedia, onRemoveClick,
      moveMedia, t
    } = this.props;
    console.log("ProductImageGallery: rendering...");
    return (
      <div>
        <div className="ui images">
          { media.length !== 0
            ? media.map((image, i) => {
              return (
                <ImageDetail
                  key={ image._id }
                  index={ i }
                  media={ image }
                  permissions={ permissions }
                  onRemoveClick={ onRemoveClick }
                  moveMedia={ moveMedia }
                  onDropMedia={ onDropMedia }
                />
              );
            })
            : <img className="ui fluid image" src="/resources/placeholder.gif" />
          }
        </div>
        { permissions.createProduct &&
          <Dropzone className="ui huge fluid basic button" onDrop={ onDrop }>
            <div><T>dropFiles</T></div>
          </Dropzone>
        }
      </div>
    );
  }
}

ProductImageGallery.propTypes = {
  //media: PropTypes.array.isRequired,
  //permissions: PropTypes.object.isRequired,
  //onDrop: PropTypes.func.isRequired,
  //onDropMedia: PropTypes.func.isRequired,
  //onRemoveClick: PropTypes.func.isRequired,
  //moveMedia: PropTypes.func.isRequired
  product: PropTypes.object.isRequired,
  productActions: PropTypes.shape({
    setProductId: PropTypes.func,
    setVariantId: PropTypes.func,
    toggleVisibility: PropTypes.func,
    changeProductField: PropTypes.func,
    updateProductField: PropTypes.func
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(ProductImageGallery);
