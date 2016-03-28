import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import React from "react";
import Root from "./containers/Root";
import configureStore from "./store";
import i18next from "../client/helpers/i18n";
import { I18nextProvider } from "react-i18next/lib";
import { LookRoot, Presets } from "react-look";
import injectTapEventPlugin from "react-tap-event-plugin";
// import { ReactionCore } from "meteor/reactioncommerce:core";

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

  render(
    <I18nextProvider i18n={i18next}>
      <LookRoot config={Presets["react-dom"]}>
        <Root store={store} />
      </LookRoot>
    </I18nextProvider>,
    root
  );
});
