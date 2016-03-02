/* eslint "no-extend-native": [2, {"exceptions": ["String"]}] */

import i18next from "i18next";
//import LanguageDetector from "i18next-browser-languagedetector/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";

/**
 * String.prototype.toCamelCase
 * @summary special toCamelCase for converting a string to camelCase for use
 * with i18n keys
 * @return {String} camelCased string
 */
String.prototype.toCamelCase = function () {
  let s;
  s = this.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, "").trim().toLowerCase();
  s = s.replace(/([ -]+)([a-zA-Z0-9])/g, function (a, b, c) {
    return c.toUpperCase();
  });
  s = s.replace(/([0-9]+)([a-zA-Z])/g, function (a, b, c) {
    return b + c.toUpperCase();
  });
  return s;
};

/**
 * getLang
 * @summary detects device default language
 * @return {String} language code
 */
const getLang = () => {
  if (typeof navigator.languages !== "undefined")  {
    if (~navigator.languages[0].indexOf("-")) {
      return navigator.languages[0].split("-")[0];
    } else if (~navigator.languages[0].indexOf("_")) {
      return navigator.languages[0].split("_")[0];
    }
    return navigator.languages[0];
  }
  return navigator.language || navigator.browserLanguage;
};

/**
 * getResources
 * @summary fetch all translations from DB to minimongo
 * @return {Array} list of translations
 */
const getResources = () => {
  if (ReactionCore.Subscriptions.Translations.ready()) {
    // fetch reaction translations
    const reactionTranslations = ReactionCore.Collections.Translations
      .find({}, {
        fields: {
          _id: 0
        },
        reactive: false
      }).fetch();
    // map reduce translations into i18next formatting
    return reactionTranslations.reduce(function (x, y) {
      x[y.i18n] = y.translation;
      return x;
    }, {});
  }
};

/**
 * getLabelsFor
 * get Labels for simple.schema keys
 * @param  {Object} schema - schema
 * @param  {String} name - name
 * @return {Object} return schema label object
 */
export function getLabelsFor(schema, name) {
  let labels = {};
  // loop through all the rendered form fields and generate i18n keys
  for (let fieldName of schema._schemaKeys) {
    let i18nKey = name.charAt(0).toLowerCase() + name.slice(1) + "." +
      fieldName
        .split(".$").join("");
    // translate autoform label
    let translation = i18next.t(i18nKey);
    if (new RegExp("string").test(translation) !== true && translation !==
      i18nKey) {
      if (translation) labels[fieldName] = translation;
    }
  }
  return labels;
}

Meteor.startup(function () {
  // todo getLang should be called then DOM ready?
  Session.set("language", getLang());
  // shop subscription ready?
  const shopId = ReactionCore.getShopId();
  const shopLanguage = ReactionCore.Collections.Shops.findOne(shopId).language;

  // every package gets a namespace, fetch them
  const packageNamespaces = ReactionCore.Collections.Packages.find({}, {
    fields: {
      name: 1
    }
  }).map(pkg => pkg.name);

  Meteor.call("shop/getLocale", function (error, result) {
    if (result) {
      ReactionCore.Locale = result;
      // this is need to make language changing reactive.
      Tracker.autorun(() => {
        ReactionCore.Locale.language = Session.get("language");
      });
      // TODO for now moment are global. It cames from meteor package
      // I think we need to move it to npm in future
      moment.locale(ReactionCore.Locale.language);
    }
  });

  Tracker.autorun(() => {
    ReactionCore.Subscriptions.Translations = Meteor.subscribe("Translations",
      Session.get("language"), () => {
        i18next
        // .use(XHR)
        // .use(LanguageDetector) // we don't need this here, because
          // we want to manually change language sometimes by reactive
          // way
          .init({
            lng: Session.get("language"),
            fallbackLng: shopLanguage,
            // have a common namespace used around the full app
            ns: packageNamespaces,
            defaultNS: "core",
            resources: getResources(),

            debug: true,

            interpolation: {
              escapeValue: false // not needed for react!!
            }
            //backend: {
            //  // path where resources get loaded from
            //  loadPath: "/common/locales/{{lng}}.json"
            //}
          });
      });
  });
});

export default i18next;

/**
 * formatPrice
 * @summary return shop /locale specific formatted price
 * also accepts a range formatted with " - "
 * @param {String} currentPrice - currentPrice or "xx.xx - xx.xx" formatted String
 * @return {String} returns locale formatted and exchange rate converted values
 */
export function formatPrice(currentPrice) {
  const { Locale } = ReactionCore;
  // localeDep.depend();

  if (typeof Locale !== "object" || typeof Locale.currency !== "object") {
    // locale not yet loaded, so we don't need to return anything.
    return false;
  }

  if (typeof currentPrice !== "string" && typeof currentPrice !== "number") {
    return false;
  }

  // for the cases then we have only one price. It is a number.
  currentPrice = currentPrice.toString();
  let price = 0;
  const prices = ~currentPrice.indexOf(" - ") ?
    currentPrice.split(" - ") :
    [currentPrice];

  // basic "for" is faster then "for ...of" for arrays. We need more speed here
  const len = prices.length;
  for (let i = 0; i < len; i++) {
    let originalPrice = prices[i];
    try {
      // we know the locale, but we don't know exchange rate. In that case we
      // should return to default shop currency
      if (typeof Locale.currency.rate !== "number") {
        throw new Meteor.Error("exchangeRateUndefined");
      }
      prices[i] *= Locale.currency.rate;

      price = _formatPrice(price, originalPrice, prices[i],
        currentPrice, Locale.currency, i, len);
    } catch (error) {
      ReactionCore.Log.debug("currency error, fallback to shop currency");
      price = _formatPrice(price, originalPrice, prices[i],
        currentPrice, Locale.shopCurrency, i, len);
    }
  }

  return price;
}

/**
 * @private
 */
function _formatPrice(price, originalPrice, actualPrice, currentPrice, currency,
                      pos, len) {
  // this checking for Locale.shopCurrency mostly
  if (typeof currency !== "object") {
    return false;
  }
  let formattedPrice;
  // @param {string} currency.where: If it presents - in situation then two
  // prices in string, currency sign will be placed just outside the right price.
  // For now it should be manually added to fixtures shop data.
  if (typeof currency.where === "string" && currency.where === "right" &&
    len > 1 && pos === 0) {
    let modifiedCurrency = Object.assign({}, currency, { symbol: "" });
    formattedPrice = accounting.formatMoney(actualPrice, modifiedCurrency);
  } else {
    // accounting api: http://openexchangerates.github.io/accounting.js/
    formattedPrice = accounting.formatMoney(actualPrice, currency);
  }

  return ((price === 0) ?
    currentPrice.replace(originalPrice, formattedPrice) :
    price.replace(originalPrice, formattedPrice));
}

//Meteor.startup(function () {
//  if (Meteor.isClient) {
//    _i18n.setLocale(getLang());
//    Session.set("language", getLang());
//  } else {
//    // todo for SSR
//  }
//  // todo i18n for admin & client-restriced areas?
//});

/**
 * translateRegistry
 * @summary added i18n strings to registry
 * @param {Object} registry  registry object
 * @param {Object} [app] app object. It contains registries
 * @return {Object} with updated registry
 */
export const translateRegistry = (registry, app) => {
  let registryLabel = "";
  let i18nKey = "";
  // first we check the default place for a label
  if (registry.label) {
    registryLabel = registry.label.toCamelCase();
    i18nKey = `admin.${registry.provides}.${registryLabel}`;
    // and if we don't find it, we are trying to look at first
    // registry entry
  } else if (app && app.registry && app.registry.length &&
    app.registry[0].label) {
    registryLabel = app.registry[0].label.toCamelCase();
    i18nKey = `admin.${app.registry[0].provides}.${registryLabel}`;
  }
  registry.i18nKeyLabel = `${i18nKey}Label`;
  registry.i18nKeyDescription = `${i18nKey}Description`;
  registry.i18nKeyPlaceholder = `${i18nKey}Placeholder`;
  registry.i18nKeyTooltip = `${i18nKey}Tooltip`;

  return registry;
};
