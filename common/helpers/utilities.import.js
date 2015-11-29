/**
 * @function siteName
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
  return '';
}

/**
 * @function checkObjectFitSupported
 * @description It checks whether the 'objectFit' css-property is supported
 * by browser
 * @return {boolean}
 */
export function checkObjectFitSupported() {
  return 'objectFit' in document.documentElement.style;
}