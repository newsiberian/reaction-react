// Main init file, this is where Meteor app starts

if (Meteor.isClient) {
    // wait with router until app is ready
    FlowRouter.wait();
}

// start application
System.import('/init').then(() => {
    // our app is up and ready
    if (Meteor.isClient) {
        FlowRouter.initialize();
    }
});
