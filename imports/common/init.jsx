import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import React from "react";
import Root from "./containers/Root";
import configureStore from "./store";
import i18next from "../client/helpers/i18n";
import { I18nextProvider } from "react-i18next";
import { DynamicPrefixer, LookRoot, Presets } from "react-look";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import { loadLocale } from "../modules/layout/actions/locale";

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Meteor.startup(() => {
  const store = configureStore();
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.appendChild(root);

  const config = Presets["react-dom"];
  config.prefixer = new DynamicPrefixer({userAgent: navigator.userAgent});

  // initial load locale. This is the same as ReactionCore.Locale
  store.dispatch(loadLocale());

  render(
    <I18nextProvider i18n={i18next}>
      <LookRoot config={config}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Root store={store} />
        </MuiThemeProvider>
      </LookRoot>
    </I18nextProvider>,
    root
  );
});
