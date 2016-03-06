import { ReactionCore } from "meteor/reactioncommerce:core";

/**
 * getSelected
 * @summary get the currently active/requested product/variant object
 * @return {Object} currently selected product/variant cursor
 */
export const getSelected = id => {
  return ReactionCore.Collections.Products.findOne(id);
};
