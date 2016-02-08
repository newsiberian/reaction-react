import { render } from "react-dom";
import Root from "./containers/Root";
import configureStore from "./store";

Meteor.startup(() => {
  const store = configureStore();
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.appendChild(root);

  render(
    <Root store={store} />,
    root
  );
});
