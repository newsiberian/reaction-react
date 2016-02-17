// import i18next from "i18next";

/**
 * @function siteName
 * @summary get the products name
 * @return {String} returns site name
 */
export function siteName() {
  const shop = ReactionCore.Collections.Shops.findOne();
  return shop && typeof shop.name === "string" ? shop.name : "";
}

/**
 * @function checkObjectFitSupported
 * @description It checks whether the 'objectFit' css-property is supported
 * by browser
 * @return {boolean}
 */
export function checkObjectFitSupported() {
  return "objectFit" in document.documentElement.style;
}

/**
 * capitalize
 * @summary capitalize first character of string
 * @param {String} str - string
 * @return {String} returns string with first letter capitalized
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * timezoneOptions
 * @summary formats moment.js timezones into array for autoform selector
 * @return {Array} returns array of timezones [value:, label:]
 */
export function timezoneOptions() {
  const timezones = moment.tz.names();
  return timezones.map(timezone => {
    return {
      value: timezone,
      label: timezone
    };
  });
}
