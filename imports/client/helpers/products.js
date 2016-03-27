import { ReactionCore } from "meteor/reactioncommerce:core";
import { TR } from "meteor/ongoworks:transliteration";

/**
 * getSelected
 * @summary get the currently active/requested product/variant object
 * @return {Object} currently selected product/variant cursor
 */
export const getSelected = id => {
  return ReactionCore.Collections.Products.findOne(id);
};

/**
 * getProductPriceRange
 * @summary get price range of a product if no only one price available, return
 * it otherwise return a string range
 * @todo remove string return and replace with object
 * @param {String} [id] - current product _id
 * @return {String} formatted price or price range
 */
export const getProductPriceRange = id => ReactionCore.getProductPriceRange(id);

/**
 * @method getVariants
 * @description Get all parent variants
 * @summary could be useful for products and for top level variants
 * @param {String} id - product _id
 * @param {String} [type] - type of variant
 * @return {Array} Parent variants or empty array
 */
export const getVariants = (id, type) => ReactionCore.getVariants(id, type);

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

export const getSlug = slugString => {
  if (slugString) return TR.slugify(slugString);
};
