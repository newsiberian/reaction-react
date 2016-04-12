import { ReactionCore } from "meteor/reactioncommerce:core";

/**
 * This is a ported copy of Reaction cart helper
 */

// /**
//  * showCartIconWarning
//  * @return {Boolean} return true if low inventory on any item in cart
//  */
// export function showCartIconWarning() {
//   if (showLowInventoryWarning()) {
//     return true;
//   }
//   return false;
//   // todo refactor this to [return !!showLowInventoryWarning();]
// }
//
// /**
//  * showLowInventoryWarning
//  * @return {Boolean} return true if low inventory on any item in cart
//  */
// function showLowInventoryWarning() {
//   let item;
//   let storedCart = ReactionCore.Collections.Cart.findOne();
//   // we're not being picky here - first thing in cart
//   // that is low will trigger a inventory warning
//   if (typeof storedCart === 'object' && storedCart.items) {
//     for (item of storedCart.items) {
//       if (item.variants !== null && item.variants.inventoryPolicy &&
//         item.variants.lowInventoryWarningThreshold) {
//         if (item.variants.inventoryQuantity <= item.variants.lowInventoryWarningThreshold) {
//           return true;
//         }
//       }
//     }
//   }
// }

/**
 * getMedia
 * @summary get images for current cart item from Media
 * @param {Object} item - cart item object
 * @return {FS.File} Blob with media data
 */
export const getMedia = (item) => {
  // const product = ReactionCore.Collections.Products.findOne(item.productId);
  const defaultImage = ReactionCore.Collections.Media.findOne({
    "metadata.variantId": item.variants._id
  });

  if (defaultImage) {
    return defaultImage;
    // if this variant doesn't have a photo, it could mean that his photo could
    // be found in upper level inside top level variant
  } else if (item.variants.ancestors.length > 1) {
    // we could take an image from topVariant if it is presents
    return ReactionCore.Collections.Media.findOne({
      "metadata.variantId": item.variants.ancestors[1]
    });
  }
};
