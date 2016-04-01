import { ReactionCore } from "meteor/reactioncommerce:core";
// import { TR } from "meteor/ongoworks:transliteration";

const defaultProductFields = {
  title: 1,
  pageTitle: 1,
  description: 1,
  vendor: 1,
  isVisible: 1,
  hashtags: 1,
  metafields: 1
};

const defaultVariantFields = {};

/**
 * getSelected
 * @summary get the currently active/requested product/variant object
 * @return {Object} currently selected product/variant cursor
 */
export const getSelected = id => {
  return ReactionCore.Collections.Products.findOne(id);
};

/**
 * getProduct
 * @summary fetch product object by given `handle`
 * @param {String} handle - could be route slug or product _id
 * @param {Object} productFields
 * @return {*|{}|159|any}
 */
export const getProduct = (handle, productFields = defaultProductFields) => {
  if (!handle.match(/^[A-Za-z0-9]{17}$/)) {
    const possibleHandle = handle.toLowerCase();
    return ReactionCore.Collections.Products.findOne({ handle: possibleHandle }, { fields: productFields });
  }
  return ReactionCore.Collections.Products.findOne({ _id: handle }, { fields: productFields });
};

/**
 * getSelectedVariant
 * @summary get the currently active/requested variant object
 * @param {String} variantId - product variant _id
 * @param {Object} variantFields - `fields` selector for mongodb `find`
 * @return {Object} currently selected variant object
 */
export const getSelectedVariant = (variantId, variantFields = defaultVariantFields) => {
  if (variantId) {
    return ReactionCore.Collections.Products.findOne({ _id: variantId }, { fields: variantFields });
  }
  return {};
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
 * getVariantPriceRange
 * @summary get price range of a variant if it has child options.
 * if no child options, return main price value
 * @todo remove string return and replace with object
 * @param {String} [id] - current variant _Id
 * @return {String} formatted price or price range
 */
export const getVariantPriceRange = id => ReactionCore.getVariantPriceRange(id);

/**
 * getVariantQuantity
 * @description middleware method which calls the same named common method.
 * @todo maybe we could remove this after 1.3. But for now I like how it looks.
 * @param {Object} doc - variant object
 * @return {Number} summary of options quantity or top-level variant
 * inventoryQuantity
 */
export const getVariantQuantity = doc => ReactionCore.getVariantQuantity(doc);

/**
 * @method getTopVariants
 * @description Get only product top level variants
 * @param {String} id - product _id
 * @return {Array} Product top level variants or empty array
 */
export const getTopVariants = id => ReactionCore.getTopVariants(id);

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
 * getChildVariants
 * @summary get a list of children for variant
 * @param {String} productId - product _id
 * @param {Object} parentVariant - could be current selected variant or just
 * one of the top level variants
 * @return {Array} with children variants data
 */
export const getChildVariants = (productId, parentVariant) => {
  const childVariants = [];
  const variants = getVariants(productId);
  if (variants.length) {
    const current = parentVariant;

    if (!current || typeof current._id !== "string") {
      return;
    }

    if (current.ancestors.length === 1) {
      variants.forEach(variant => {
        if (~variant.ancestors.indexOf(current._id) &&
          variant.type !== "inventory") {
          childVariants.push(variant);
        }
      });
    } else {
      // TODO not sure we need this part...
      variants.forEach(variant => {
        if (typeof variant.ancestors[1] === "string" &&
          variant.ancestors.length === current.ancestors.length &&
          variant.ancestors[1] === current.ancestors[1] &&
          variant.optionTitle) {
          childVariants.push(variant);
        }
      });
    }

    return childVariants;
  }
};

/**
 * getTag
 * @summary This needed for naming `positions` object. Method could return `tag`
 * route name or shop name as default name.
 * @param {Object} location - `history` location object
 * @param {Object} params - react router `params` object
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
