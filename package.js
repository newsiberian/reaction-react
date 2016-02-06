Package.describe({
  name: "newsiberian:reaction-react",
  version: "0.0.1"
});

Npm.depends({
  // moment: "2.10.6"
});

Package.onUse(function (api) {
  api.versionsFrom("1.3-modules-beta.5");
  api.use("meteor-base");
  api.use("mongo");
  api.use("ecmascript");
  api.use("es5-shim");
  api.use("tracker");
  api.use("modules");
  // temporary
  api.use("react");

  //api.use("check");
  //api.use("random");
  api.use("ddp-rate-limiter");
  api.use("underscore");
  api.use("service-configuration");
  api.use("amplify@1.0.0");
  api.use("universe:i18n@1.3.4");

  // api.mainModule("server.js", "server");
  api.mainModule("main.js", "client");
  // api.export("Foo");

  //api.addFiles("common/routes.jsx", "client");
  //api.addFiles("modules/layout/routes.jsx", "client");
});
