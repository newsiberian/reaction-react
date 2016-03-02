import { ReactionCore } from "meteor/reactioncommerce:core";

ReactionCore.registerPackage({
  label: "React UI",
  name: "reaction-react",
  icon: "fa fa-html5",
  autoEnable: true,
  settings: {
    name: "React UI"
  },
  registry: [{
    name: "reaction-react",
    provides: "dashboard",
    container: "appearance",
    label: "React UI",
    description: "React Components",
    icon: "fa fa-html5",
    priority: 1
  }]
});
