import { ReactionCore } from "meteor/reactioncommerce:core";

/**
 * getSelected
 * @summary get the currently active/requested product/variant object
 * @return {Object} currently selected product/variant cursor
 */
export const getSelected = id => {
  return ReactionCore.Collections.Products.findOne(id);
};

/**
 * getTag
 * @summary This needed for naming `positions` object. Method could return `tag`
 * route name or shop name as default name.
 * @return {String} tag name or shop name
 */
export const getTag = (location, params) => {
  // this should be in a beginning of `pathname`
  if (location.pathname.indexOf("/shop/tag/") === 0) {
    // it could be without slug I suppose
    return params.slug || ReactionCore.getShopName().toLowerCase();
  }
  return ReactionCore.getShopName().toLowerCase();
};
