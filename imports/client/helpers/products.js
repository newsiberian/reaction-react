import { ReactionCore } from "meteor/reactioncommerce:core";

/**
 * getSelectedProduct
 * @summary get the currently active/requested product object
 * @return {Object|undefined} currently selected product cursor
 */
export const getSelectedProduct = id => {
  return ReactionCore.Collections.Products.findOne(id);
};
