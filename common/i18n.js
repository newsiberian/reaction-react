//import i18next from "i18next";
////import XHR from "i18next-xhr-backend/lib";
////import Backend from "i18next-node-fs-backend/lib";
//import LanguageDetector from "i18next-browser-languagedetector/lib";
//import { ReactionCore } from "meteor/reactioncommerce:core";
//import { getLang } from "../client/helpers/i18n";
//import "./subscriptions";
//
//const getResources = () => {
//  if (ReactionCore.Subscriptions.Translations.ready()) {
//    // fetch reaction translations
//    const reactionTranslations = ReactionCore.Collections.Translations
//      .find({}, {
//        fields: {
//          _id: 0
//        },
//        reactive: false
//      }).fetch();
//    // map reduce translations into i18next formatting
//    return reactionTranslations.reduce(function (x, y) {
//      x[y.i18n] = y.translation;
//      return x;
//    }, {});
//  }
//};
//Meteor.startup(function () {
//  // todo getLang should be called then DOM ready?
//  Session.set("language", getLang());
//
//  Meteor.call("shop/getLocale", function (error, result) {
//    if (result) {
//      ReactionCore.Locale = result;
//      ReactionCore.Locale.language = Session.get("language");
//      // moment.locale(ReactionCore.Locale.language);
//    }
//  });
//
//  Tracker.autorun(function () {
//    ReactionCore.Subscriptions.Translations = Meteor.subscribe("Translations",
//      Session.get("language"), () => {
//        i18next
//        // .use(XHR)
//        // .use(Backend)
//          .use(LanguageDetector)
//          .init({
//            // lng: ReactionCore.Locale.language,
//            fallbackLng: "en",
//
//            // have a common namespace used around the full app
//            ns: ["core"],
//            defaultNS: "core",
//            resources: getResources(),
//
//            debug: true,
//
//            interpolation: {
//              escapeValue: false // not needed for react!!
//            },
//            //backend: {
//            //  // path where resources get loaded from
//            //  loadPath: "/common/locales/{{lng}}.js"
//            //}
//          });
//      });
//  });
//});
//
//export default i18next;
