import { ReactionCore } from "meteor/reactioncommerce:core";

///**
// * hasPermission template helper
// * @summary check current user hasPermission
// * @param  {String|Array} permissions
// * @param  {Object} options
// * @return {Boolean} permitted?
// */
//export function hasPermission(permissions, options) {
//  check(permissions, Match.OneOf(String, Array));
//  check(options, Match.Optional(Object));
//  const userId = options && options.userId || Meteor.userId();
//  return ReactionCore.hasPermission(permissions, userId);
//}

/**
 * hasPermission template helper
 * @summary check current user hasPermission
 * @param  {String|Array} "permissions"
 * @param  {String} checkUserId - optional Meteor.userId, default to current
 * @return {Boolean} permitted?
 */
export function hasPermission(permissions, options) {
  const shopId = ReactionCore.getShopId();
  // we don't necessarily need to check here
  // as these same checks and defaults are
  // also performed in ReactionCore.hasPermission
  const userId = options && options.userId || Meteor.userId();
  return ReactionCore.hasPermission(permissions, userId, shopId);
}

/**
 * hasOwnerAccess template helper
 * @summary check if user has owner access
 * @return {Boolean} return true if owner
 */
export function hasOwnerAccess() {
  return ReactionCore.hasOwnerAccess();
}

/**
 * hasAdminAccess template helper
 * @summary check if user has admin access
 * @return {Boolean} return true if admin
 */
export function hasAdminAccess() {
  return ReactionCore.hasAdminAccess();
}

/**
 * hasDashboardAccess template helper
 * @summary check if user has dashboard access
 * @return {Boolean} return true if user has dashboard permission
 */
export function hasDashboardAccess() {
  return ReactionCore.hasDashboardAccess();
}

/**
 * allowGuestCheckout template helper
 * @summary check if guest users are allowed to checkout
 * @return {Boolean} return true if shop has guest checkout enabled
 */
export function allowGuestCheckout() {
  return ReactionCore.allowGuestCheckout();
}
