import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { displayAlert } from "../../layout/actions/alert";
import { FS } from "meteor/cfs:base-package";
import i18next from "i18next";

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

export const removeMedia = id => {
  return dispatch => {
    if (!ReactionCore.hasPermission("createProduct")) {
      // todo add log message
      return false;
    }
    const image = Media.findOne(id);
    image.remove();
    // todo fix this
    // this.updateImagePriorities();

    dispatch({ type: types.REMOVE_MEDIA, mediaId: id });
  };
};
