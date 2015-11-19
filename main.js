// Main init file, this is where Meteor app starts

// start application
System.import('/init').then(() => {
  // our app is up and ready
  if (Meteor.isClient) {
    //FlowRouter.initialize();
  }
});
