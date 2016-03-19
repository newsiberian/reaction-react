import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { ReactionProductAPI } from "meteor/reactioncommerce:reaction-catalog";
import { displayAlert } from "../../layout/actions/alert";
import { FS } from "meteor/cfs:base-package";

const { Media } = ReactionCore.Collections;

export const uploadMedia = (files, product, variant) => {
  return dispatch => {
    if (!ReactionCore.hasPermission("createProduct")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    const productId = product._id;
    const variantId = variant._id;
    const shopId = product.shopId || ReactionCore.getShopId();
    const userId = Meteor.userId();
    let count = Media.find({
      "metadata.variantId": variantId
    }).count();
    const toGrid = variant.ancestors.length === 1;

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

      let result = Media.insert(fileObj);
      count++;

      dispatch({
        type: types.UPLOAD_MEDIA,
        variantId: variantId,
        mediaId: result && result._id
      });
    });
  };
};

export const removeMedia = mediaId => {
  return dispatch => {
    ReactionProductAPI.methods.removeMedia.call({ mediaId }, error => {
      if (error) {
        dispatch(displayAlert({ message: error.reason }));
      }
      dispatch({ type: types.REMOVE_MEDIA, mediaId: mediaId });
    });
  };
};

export const syncMedia = mediaIdsArray => {
  return { type: types.SYNC_MEDIA, mediaIdsArray: mediaIdsArray };
};

export const moveMedia = (dragIndex, hoverIndex) => {
  return { type: types.MOVE_MEDIA, dragIndex: dragIndex, hoverIndex: hoverIndex };
};

export const dropMedia = mediaIdsArray => {
  return dispatch => {
    // convert to reaction array format
    const sortedMedias = mediaIdsArray.map(id => {
      return { mediaId: id };
    });
    ReactionProductAPI.methods.updateMediaPriorities.call({ sortedMedias });
    dispatch({ type: types.DROP_MEDIA });
  };
};
