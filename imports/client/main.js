import { SimpleSchema } from "meteor/aldeed:simple-schema";

let globalShopId = null;

/**
 * hasPermission - client permissions checks
 * @param {String | Array} checkPermissions -String or Array of permissions if empty, defaults to "admin, owner"
 * @param {String} checkUserId - userId, defaults to Meteor.userId()
 * @param {String} group - default to shopId
 * @return {Boolean} Boolean - true if has permission
 */
export function hasPermission(checkPermissions, checkUserId, group) {
  //check(checkPermissions, Match.OneOf(String, Array));
  new SimpleSchema({
    checkPermissions: { type: String }
  }).validate({ checkPermissions });
  // use current user if userId if not provided
  let userId = checkUserId || this.userId || Meteor.userId();
  let shopId = group || getShopId();
  let permissions = [];

  // if we're checking permissions, we should have a userId!!
  // the assumption is that a null user doesn't have permissions
  // for something that with permissions
  if (!userId) {
    return false;
  }
  // permissions can be either a string or an array
  // we'll force it into an array so we can add
  // admin roles
  if (!_.isArray(checkPermissions)) {
    permissions = [checkPermissions];
  } else {
    permissions = checkPermissions;
  }
  // if the user has admin, owner permissions we'll always check if those roles are enough
  permissions.push("admin", "owner");
  // check if userIs the Roles
  if (Roles.userIsInRole(userId, permissions, shopId)) {
    return true;
  } else if (Roles.userIsInRole(userId,
      permissions,
      Roles.GLOBAL_GROUP
    )) {
    return true;
  }

  // global roles check
  let sellerShopPermissions = Roles.getGroupsForUser(userId, "admin");
  // we're looking for seller permissions.
  if (sellerShopPermissions) {
    // loop through shops roles and check permissions
    for (let key in sellerShopPermissions) {
      if (key) {
        let shop = sellerShopPermissions[key];
        if (Roles.userIsInRole(checkUserId, permissions, shop)) {
          return true;
        }
      }
    }
  }
  // no specific permissions found returning false
  return false;
}

export function hasOwnerAccess() {
  return hasPermission(["owner"]);
}

export function hasAdminAccess() {
  return hasPermission(["owner", "admin"]);
}

export function hasDashboardAccess() {
  return hasPermission(["owner", "admin", "dashboard"]);
}

export function getShopId() {
  return globalShopId;
}

export const getCurrentTag = () => {};
