import { ReactionCore } from "meteor/reactioncommerce:core";
import LanguageDetector from "i18next-browser-languagedetector/lib";

const options = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'navigator'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',

  // cache user language on
  caches: ['localStorage', 'cookie'],

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain'
};

Meteor.call("shop/getLocale", function (error, result) {
  if (result) {
    ReactionCore.Locale = result;
    const lngDetector = new LanguageDetector(null, options);
    ReactionCore.Locale.language = lngDetector;
    //moment.locale(ReactionCore.Locale.language);
  }
});

Tracker.autorun(() => {
  //
  Meteor.subscribe("Translations", ReactionCore.Locale.language);
  //
});