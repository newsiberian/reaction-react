import { render } from "react-dom";
import Root from "./containers/Root";
import configureStore from "./store";
import { I18nextProvider } from "react-i18next/lib";
import i18next from "../client/helpers/i18n";
import injectTapEventPlugin from "react-tap-event-plugin";

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Meteor.startup(() => {
  const store = configureStore();
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  root.style.height = "100%"; // for actionBar stretching
  document.body.appendChild(root);

  render(
    <I18nextProvider i18n={i18next}><Root store={store} /></I18nextProvider>,
    root
  );
});
