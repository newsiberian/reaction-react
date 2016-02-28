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
    let capitalizedName = this.capitalizedServiceName(name);
    let template = Template[`configureLoginServiceDialogFor${capitalizedName}`];

    if (template) {
      let fields = template.fields();

      return _.map(fields, (field) => {
        if (!field.type) {
          field.type = field.property === "secret" ? "password" : "text";
        }

        return _.extend(field, {
          type: field.type
        });
      });
    }

    return [];
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
