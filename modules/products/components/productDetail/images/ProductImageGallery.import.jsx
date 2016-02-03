import { _i18n } from "meteor/universe:i18n";
import Dropzone from "/myPackages/react-dropzone";
import shallowCompare from "/myPackages/react-addons-shallow-compare";
import ImageDetail from "./ImageDetail";

import React, { Component, PropTypes } from "react";
const T = _i18n.createComponent("reaction.core.productDetail");

/**
 * @classdesc ProductImageGallery
 */
export default class ProductImageGallery extends Component {

  shouldComponentUpdate(nextProps) {
    // todo разобраться с shallowCompare, возможно применить _.isEqual вместо него.
    // return !shallowCompare(this, nextProps.media);
    return !_.isEqual(nextProps.media, this.props.media);
  }
  render() {
    const { media, permissions, onDrop, onDropMedia, onRemoveClick,
      moveMedia
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
  media: PropTypes.array.isRequired,
  permissions: PropTypes.object.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDropMedia: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  moveMedia: PropTypes.func.isRequired
};
