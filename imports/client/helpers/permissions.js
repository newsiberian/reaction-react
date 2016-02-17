import { ReactionCore } from "meteor/reactioncommerce:core";

/**
 * hasAdminAccess template helper
 * @summary check if user has admin access
 * @return {Boolean} return true if admin
 */
export function hasAdminAccess() {
  return ReactionCore.hasAdminAccess();
}

/**
 * hasPermission template helper
 * @summary check current user hasPermission
 * @param  {String|Array} permissions
 * @param  {Object} options
 * @return {Boolean} permitted?
 */
export function hasPermission(permissions, options) {
  check(permissions, Match.OneOf(String, Array));
  check(options, Match.Optional(Object));
  const userId = options && options.userId || Meteor.userId();
  return ReactionCore.hasPermission(permissions, userId);
}
