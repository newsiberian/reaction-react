/**
 * siteName
 * @summary get the products name
 * @return {String} returns site name
 */
export function siteName() {
  let shop = ReactionCore.Collections.Shops.findOne();
  if (shop) {
    if (shop.name) {
      return shop.name;
    }
  }
  return "";
}