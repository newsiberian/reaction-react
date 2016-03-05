Package.describe({
  name: "newsiberian:reaction-react",
  version: "0.0.2"
});

Npm.depends({
  // moment: "2.10.6"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.3-beta.12");
  api.use("meteor-base");
  api.use("mongo");
  api.use("ecmascript");
  api.use("es5-shim");
  // I guess this is temporary here for sessionId holding
  api.use("session");
  api.use("tracker");
  api.use("modules");

  api.use("check");
  api.use("aldeed:simple-schema");
  api.use("mdg:validated-method");
  //api.use("random");
  api.use("ddp-rate-limiter");
  api.use("underscore");
  api.use("service-configuration");
  api.use("amplify@1.0.0");
  api.use("fortawesome:fontawesome@4.5.0");

  //api.imply("mdg:validated-method");


  api.mainModule("server/main.js", "server");
  api.mainModule("main.js", "client");
  // api.export("Foo");

  api.addAssets("private/data/i18n/en.json", "server");
  api.addAssets("private/data/i18n/ru.json", "server");
  //api.addFiles("common/routes.jsx", "client");
  //api.addFiles("modules/layout/routes.jsx", "client");
});
