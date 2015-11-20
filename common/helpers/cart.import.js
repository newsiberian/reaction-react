/**
 * This is a ported copy of Reaction cart helper
 */

/**
 * showCartIconWarning
 * @return {Boolean} return true if low inventory on any item in cart
 */
export function showCartIconWarning() {
  if (showLowInventoryWarning()) {
    return true;
  }
  return false;
  // todo refactor this to [return !!showLowInventoryWarning();]
}

/**
 * showLowInventoryWarning
 * @return {Boolean} return true if low inventory on any item in cart
 */
function showLowInventoryWarning() {
  let item;
  let storedCart = ReactionCore.Collections.Cart.findOne();
  // we're not being picky here - first thing in cart
  // that is low will trigger a inventory warning
  if (typeof storedCart === 'object' && storedCart.items) {
    for (item of storedCart.items) {
      if (item.variants !== null && item.variants.inventoryPolicy &&
        item.variants.lowInventoryWarningThreshold) {
        if (item.variants.inventoryQuantity <= item.variants.lowInventoryWarningThreshold) {
          return true;
        }
      }
    }
  }
}