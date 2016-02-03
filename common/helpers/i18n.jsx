import { _i18n } from "meteor/universe:i18n";

/**
 * formatPrice
 * @summary return shop /locale specific formatted price
 * also accepts a range formatted with " - "
 * @param {String} currentPrice - currentPrice or "xx.xx - xx.xx" formatted String
 * @return {String} returns locale formatted and exchange rate converted values
 */
export function formatPrice(currentPrice) {
  const { Locale } = ReactionCore;
  localeDep.depend();

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
  const prices = ~currentPrice.indexOf(' - ') ?
    currentPrice.split(" - ") :
    [currentPrice];

  // basic "for" is faster then "for ...of" for arrays. We need more speed here
  const len = prices.length;
  for (let i = 0; i < len; i++) {
    let originalPrice = prices[i];
    try {
      // we know the locale, but we don't know exchange rate. In that case we
      // should return to default shop currency
      if (typeof Locale.currency.rate !== 'number') {
        throw new Meteor.Error('exchangeRateUndefined');
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
  if (typeof currency !== 'object') {
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

export function getLang() {
  if (navigator.languages != undefined)  {
    return navigator.languages[0];
  }
  return navigator.language || navigator.browserLanguage;
}

Meteor.startup(function () {
  if (Meteor.isClient) {
    _i18n.setLocale(getLang());
    Session.set('language', getLang());
  } else {
    // todo for SSR
  }

  // todo i18n for admin & client-restriced areas?

});
