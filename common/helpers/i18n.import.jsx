import i18n from '{universe:i18n}';

/**
 * formatPrice
 * @summary return shop /locale specific formatted price
 * also accepts a range formatted with " - "
 * @param {String} currentPrice - currentPrice or "xx.xx - xx.xx" formatted String
 * @return {String} returns locale formatted and exchange rate converted values
 */
export function formatPrice(currentPrice) {
  let actualPrice;
  let formattedPrice;
  let price;

  // todo разобраться с нижележащей строчкой
  // localeDep.depend();

  // TODO: Refactor
  try {
    let prices = currentPrice.split(" - ");
    for (actualPrice of prices) {
      let originalPrice = actualPrice;
      if (ReactionCore.Locale) {
        if (ReactionCore.Locale.currency) {
          if (ReactionCore.Locale.exchangeRate) {
            if (ReactionCore.Locale.exchangeRate.rate) {
              actualPrice = actualPrice * ReactionCore.Locale.exchangeRate.rate;
            }
          }
        }
        formattedPrice = accounting.formatMoney(actualPrice, ReactionCore.Locale
          .currency);
        price = currentPrice.replace(originalPrice, formattedPrice);
      }
    }
  } catch (error) {
    ReactionCore.Log.debug("currency error, fallback to shop currency");
    if (ReactionCore.Locale) {
      if (ReactionCore.Locale.currency) {
        if (ReactionCore.Locale.exchangeRate) {
          if (ReactionCore.Locale.exchangeRate.rate) {
            price = price * ReactionCore.Locale.exchangeRate.Rate;
            price = accounting.formatMoney(price, ReactionCore.Locale.currency);
          }
        } else {
          price = accounting.formatMoney(currentPrice, ReactionCore.Locale.currency);
        }
      }
    }
  }
  return price;
}

export function getLang() {
  if (navigator.languages != undefined)  {
    return navigator.languages[0];
  }
  return navigator.language || navigator.browserLanguage;
}

Meteor.startup(function () {
  if (Meteor.isClient) {
    i18n.setLocale(getLang());
    Session.set('language', getLang());
  } else {
    // todo for SSR
  }

  // todo i18n for admin & client-restriced areas?

});
