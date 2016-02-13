import i18n from "i18next/lib";
import XHR from "i18next-xhr-backend/lib";
//import Backend from "i18next-node-fs-backend/lib";
import LanguageDetector from "i18next-browser-languagedetector/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import "./subscriptions";

//Meteor.startup(function () {
//  Meteor.call("shop/getLocale", function (error, result) {
//    if (result) {
//      ReactionCore.Locale = result;
//      ReactionCore.Locale.language = i18n.LanguageDetector();
//      //moment.locale(ReactionCore.Locale.language);
//      //localeDep.changed();
//    }
//  });
//  Tracker.autorun(() => {
//    Meteor.subscribe("Translations", ReactionCore.Locale.language);
//  });
//
//  //// fetch reaction translations
//  //let reactionTranslations = ReactionCore.Collections.Translations
//  //  .find({}, {
//  //    fields: {
//  //      _id: 0
//  //    },
//  //    reactive: false
//  //  }).fetch();
//  //// map reduce translations into i18next formatting
//  //let resources = reactionTranslations.reduce(function (x, y) {
//  //  x[y.i18n] = y.translation;
//  //  return x;
//  //}, {});
//});

const getResources = () => {
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
};

i18n
//.use(XHR)
//  .use(Backend)
  .use(LanguageDetector)
  .init({
    //lng: ReactionCore.Locale.language,
    fallbackLng: "en",

    // have a common namespace used around the full app
    ns: ["core"],
    defaultNS: "core",
    resources: getResources(),

    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    },
    //backend: {
    //  // path where resources get loaded from
    //  loadPath: "/common/locales/{{lng}}.js"
    //}
  });

export default i18n;
