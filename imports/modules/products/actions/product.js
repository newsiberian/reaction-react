import { ReactionCore } from "meteor/reactioncommerce:core";
import * as types from "../constants";

export const setProductId = productId => {
  return { type: types.SET_PRODUCT_ID, productId: productId };
};

export const setVariantId = (productId, variantId) => {
  if (!variantId) {
    const product = ReactionCore.Collections.Products.findOne({
      _id: productId
    });
    if (product) {
      // set the first variant as the default.
      const variants = ReactionCore.getTopVariants(productId);
      variantId = Array.isArray(variants) && variants.length &&
        variants[0]._id || null;
    }
  }

  return {
    type: types.SET_VARIANT_ID,
    variantId: variantId
  };
};
