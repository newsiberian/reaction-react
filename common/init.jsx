import { render } from "react-dom";
import Root from "./containers/Root";
import configureStore from "./store";
import LanguageDetector from "i18next-browser-languagedetector/lib";
import { I18nextProvider } from "react-i18next/lib";
import i18n from "./i18n";
import { ReactionCore } from "meteor/reactioncommerce:core";
//import i18n from "meteor/reactioncommerce:core/private/data/i18n";
import injectTapEventPlugin from "react-tap-event-plugin";

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Meteor.startup(() => {
  const store = configureStore();
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  root.style.height = "100%"; // for actionBar stretching
  document.body.appendChild(root);

  render(
    <I18nextProvider i18n={i18n}><Root store={store} /></I18nextProvider>,
    root
  );
});
