import { ReactionCore } from "meteor/reactioncommerce:core";
import { Accounts } from "meteor/accounts-base";
import { ServiceConfiguration } from "meteor/service-configuration";

/**
 * @function siteName
 * @summary get the products name
 * @return {String} returns site name
 */
export function siteName() {
  const shopId = ReactionCore.getShopId();
  const shop = ReactionCore.Collections.Shops.findOne(shopId);
  return shop && typeof shop.name === "string" ? shop.name : "";
}

/**
 * @function checkObjectFitSupported
 * @description It checks whether the "objectFit" css-property is supported
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

// @link http://stackoverflow.com/a/22395463
// we comparing only by id
export const arrayCompare = (array1, array2) => (array1.length === array2.length) &&
array1.every(function (element, index) {
  return element._id === array2[index]._id;
});

/**
 * isCurrentUser
 * @return {[Boolean]} returns true/null if user has registered
 */
export const isCurrentUser = () => {
  if (typeof ReactionCore === "object") {
    const shopId = ReactionCore.getShopId();
    const user = Accounts.user();
    if (!shopId || typeof user !== "object") return null;
    // shoppers should always be guests
    const isGuest = Roles.userIsInRole(user, "guest", shopId);
    // but if a user has never logged in then they are anonymous
    const isAnonymous = Roles.userIsInRole(user, "anonymous", shopId);

    return isGuest && !isAnonymous ? user : null;
  }
};

/**
 * By default this props are hardcoded into packages template settings
 * @see https://github.com/alexpods/meteor-accounts-vk/blob/master/lib/vk_configure.js
 *
 * @type {{google: *[], ok: *[], vk: *[]}}
 */
const serviceFields = {
  google: [
    { label: "Client ID", property: "clientId", type: "text" },
    { label: "Client secret", property: "secret", type: "password" }
  ],
  ok: [
    { property: "appId",  label: "App Id", type: "text" },
    { property: "secret", label: "App Secret", type: "password" },
    { property: "public", label: "App Public", type: "text" }
  ],
  vk: [
    { property: "appId",  label: "App Id", type: "text" },
    { property: "secret", label: "App Secret", type: "password" },
    { property: "scope", label: "Scope", type: "text" }
  ]
};

export class ReactionServiceHelper {
  constructor() {

  }

  availableServices() {
    let services = Package["accounts-oauth"] ?
      Accounts.oauth.serviceNames() :
      [];
    services.sort();

    return services;
  }

  capitalizedServiceName(name) {
    if (name === "meteor-developer") {
      return "MeteorDeveloperAccount";
    }

    return capitalize(name);
  }

  configFieldsForService(name) {
    return serviceFields[name];
  }

  services(extendEach) {
    let availableServices = this.availableServices();
    let configurations = ServiceConfiguration.configurations.find().fetch();

    return _.map(availableServices, (name) => {
      let matchingConfigurations = _.where(configurations, {service: name});
      let service = {
        name: name,
        label: this.capitalizedServiceName(name),
        fields: this.configFieldsForService(name)
      };

      if (matchingConfigurations.length) {
        service = _.extend(service, matchingConfigurations[0]);
      }

      if (_.isFunction(extendEach)) {
        service = _.extend(service, extendEach(service) || {});
      }

      return service;
    });
  }
}
