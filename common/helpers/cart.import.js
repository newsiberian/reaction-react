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
}

/**
 * showLowInventoryWarning
 * @return {Boolean} return true if low inventory on any item in cart
 */
function showLowInventoryWarning() {
  let item;
  // todo надо ли здесь подписываться на коллекцию Cart?
  let storedCart = ReactionCore.Collections.Cart.findOne();
  // we're not being picky here - first thing in cart
  // that is low will trigger a inventory warning
  if (storedCart !== null ? storedCart.items : void 0) {
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